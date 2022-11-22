import chalk from "chalk";
import { printHookErrors } from "./printHookError";
import {
  MESSAGE_TAB_SPACE,
  TAG_FAIL,
  TAG_PASS,
  TAG_PENDING,
  TEST_FAIL_ICON,
  TEST_PASSED_ICON,
  TEST_RUNNING_ICON,
  TEXT_EMPTY,
  TEXT_FAIL,
  TEXT_PASS,
} from "../const";
import { Queue } from "../data-structures";
import {
  IRunnerReport,
  ISemiRunnerReport,
  ITest,
  ITestReport,
  Nullable,
  VoidLikeFunction,
} from "../types";
import { Timer } from "../utils/Timer";
import { stringIsNullOrEmpty } from "../utils/stringIsNullOrEmpty";
import { LogUpdate } from "../utils/LogUpdate";
import { TestFile } from "./TestFile";
import { Group } from "./Group";
import { TestError } from "../errors";
import runtime from "./runtime";
import { logger } from "./Logger";
import { getStackTrace } from "../utils/getStackTrace";
import { buildReportMessage } from "../utils/buildReportMessage";

type ReportStatusType = "pass" | "fail" | "empty";

/**
 * @internal
 */
export class TestExecutor {
  private _logUpdate: LogUpdate;
  private _semiReport!: ISemiRunnerReport;

  constructor(logUpdate: LogUpdate) {
    this._logUpdate = logUpdate;
    this.initReport();
  }

  private initReport() {
    this._semiReport = {
      totalTests: 0,
      totalTestFiles: 0,
      totalTestsPassed: 0,
      totalTestsFailed: 0,
      totalTestFilesPassed: 0,
      totalTestFilesFailed: 0,
      totalEmptyTestFiles: 0,
      totalEmptyTests: 0,
    };
  }

  async runTestsAndPrint(testFiles: TestFile[]): Promise<IRunnerReport> {
    this.initReport();
    const testsTimer = new Timer();
    testsTimer.start();

    for (const testFile of testFiles) {
      await this.executeTestFile(testFile);
    }

    const testsDiff = testsTimer.stop();

    return {
      testTimer: testsDiff[0],
      ...this._semiReport,
    };
  }

  private async executeTestFile(testFile: TestFile) {
    if (testFile.isEmpty()) {
      this._logUpdate.appendLine(`${TAG_PENDING("EMPTY")}  ${testFile.path}`);
      // this._logUpdate.persist();
      this._semiReport.totalEmptyTestFiles++;
      this._semiReport.totalTestFiles++;
      return;
    }

    const testFileTimer = new Timer();
    this._semiReport.totalTestFiles++;

    testFileTimer.start();
    const runningTag = `${TAG_PENDING()}  ${testFile.path}`;
    const logIndex = this._logUpdate.appendLine(runningTag);

    const beforeAllErrors = await this.executeHookFunction(testFile.beforeAllHooks);

    const status = await this.executeClosures(testFile.closures, testFile);

    const afterAllErrors = await this.executeHookFunction(testFile.afterAllHooks);

    const _diff = testFileTimer.stop();

    let fileLabel = TAG_PASS();
    let fileNameLabel = testFile.path;

    if (status === "empty") {
      fileLabel = TAG_PENDING("EMPTY");
    }

    if (status === "fail") {
      fileLabel = TAG_FAIL();
      fileNameLabel = chalk.red(fileNameLabel);
    }

    this._logUpdate.updateLine(
      logIndex,
      `${fileLabel}  ${fileNameLabel}   ${chalk.cyan(_diff[0])}`,
    );

    // For some reason unknown even by god itself, we have to
    // log all information from _logUpdate using "logger"
    // I don't know why or how. Just figure out after a long fucking
    // time trying, that this is the only thing that worked.
    // do not print values using `this._logUpdate.persist()` (bad thing gonna happen)
    this.logAndPersistHookErrors(beforeAllErrors);
    this.logAndPersistHookErrors(afterAllErrors);

    this._logUpdate.clear();

    logger.log(...this._logUpdate["_logValue"]);

    logger.printStacks();

    if (status === "pass") {
      this._semiReport.totalTestFilesPassed++;
    } else if (status === "fail") {
      this._semiReport.totalTestFilesFailed++;
    } else {
      this._semiReport.totalEmptyTestFiles++;
    }
  }

  private async executeGroup(group: Group, testFile: TestFile): Promise<ReportStatusType> {
    let status: ReportStatusType = "pass";

    const beforeAllErrors = await this.executeHookFunction(group.beforeAllHooks);
    this.logAndPersistHookErrors(beforeAllErrors);

    status = await this.executeClosures(group.closures, testFile);

    const afterAllErrors = await this.executeHookFunction(group.afterAllHooks);
    this.logAndPersistHookErrors(afterAllErrors);

    return status;
  }

  private async executeClosures(closures: (ITest | Group)[], testFile: TestFile) {
    let status: ReportStatusType = "pass";
    for (const closure of closures) {
      if (closure instanceof Group) {
        status = await this.executeGroup(closure, testFile);
      } else {
        const report = await this.executeTest(closure, testFile);

        if (!report) {
          status = "empty";
        } else {
          status = report.pass ? "pass" : "fail";
        }
      }
    }
    return status;
  }

  private async executeTest(test: ITest, testFile: TestFile, group?: Group) {
    const testTimer = new Timer();
    testTimer.start();
    let logPosition = 0;

    const testName = await test.toResolveName();
    const testText = this.createTestText(testName);

    logPosition = this._logUpdate.appendLine(testText);

    const report = await this.runTest(test, testFile, group);

    this._semiReport.totalTests++;
    if (!report) {
      this._semiReport.totalEmptyTests++;
    }

    const testDiff = testTimer.stop();

    const testNameLabel = this.testReportLabelFunction(report);

    const formattedGroupName = !stringIsNullOrEmpty(group?.name) ? group?.name + " -> " : "";

    if (stringIsNullOrEmpty(testName)) {
      this._logUpdate.updateLine(
        logPosition,
        `${MESSAGE_TAB_SPACE}${testNameLabel(
          formattedGroupName + "<empty test name>",
        )}   ${chalk.cyan(testDiff[0])}`,
      );
    } else {
      this._logUpdate.updateLine(
        logPosition,
        `${MESSAGE_TAB_SPACE}${testNameLabel(formattedGroupName + testName)}   ${chalk.cyan(
          testDiff[0],
        )}`,
      );
    }

    this.printReportAndUpdateRunnerReport(report);

    return report;
  }

  private testReportLabelFunction(report?: ITestReport) {
    if (!report) {
      return (text: string) => TEXT_EMPTY(" " + TEST_RUNNING_ICON + " " + text + " (empty)");
    }

    if (!report.pass) {
      return (text: string) => TEXT_FAIL(TEST_FAIL_ICON + " " + text);
    }
    return (text: string) => TEXT_PASS(TEST_PASSED_ICON + " " + text);
  }

  private printReportAndUpdateRunnerReport(report?: ITestReport) {
    if (!report) {
      return;
    }

    if (report.pass) {
      this._semiReport.totalTestsPassed++;
    } else {
      this._semiReport.totalTestsFailed++;
    }

    this.printReportData(report);
  }

  private printReportData(report: ITestReport) {
    if (report.message) {
      const formattedMsg = this.getTextFormatPerReportType(report.message, report.isHandledError);
      this._logUpdate.appendLine("\n" + formattedMsg + "\n");
    }

    if (!report.pass && report.trace) {
      const formattedMsg = this.getTextFormatPerReportType(report.trace, report.isHandledError);
      this._logUpdate.appendLine(buildReportMessage(formattedMsg));
    }
  }

  private getTextFormatPerReportType(msg: string, isHandledError?: boolean) {
    if (isHandledError) {
      return msg;
    }
    return chalk.red(msg);
  }

  private createTestText(testName?: string | number | boolean) {
    if (stringIsNullOrEmpty(testName)) {
      return this.createTestTextByStatus("<empty test name>");
    }
    return this.createTestTextByStatus(testName);
  }

  private createTestTextByStatus(testName?: string | number | boolean) {
    const icon = TEST_RUNNING_ICON;
    return `${MESSAGE_TAB_SPACE}${icon} ${testName}`;
  }

  async runTest(test: ITest, testFile: TestFile, group?: Group) {
    let report: Nullable<ITestReport> = undefined;

    // before e after hooks will run just one time
    // for test structure (if the hook fail)
    let keepRunningBeforeEachFunctions = true;
    let keepRunningAfterEachFunctions = true;

    if (keepRunningBeforeEachFunctions) {
      keepRunningBeforeEachFunctions = await this.runBeforeEachHooks(testFile, group);
    }

    const { testCollector } = runtime;

    const onSuiteEnd = (_report: ITestReport) => {
      if (!testCollector.currentSuite?.markedAsFailed) {
        report = _report;
      }
    };

    const onSuiteForceFail = (_report: ITestReport) => {
      report = _report;
      if (testCollector.currentSuite) {
        testCollector.currentSuite.markedAsFailed = true;
      }
    };

    runtime.internalEvents.on("test_end", onSuiteEnd);
    runtime.internalEvents.on("suite_forced_fail", onSuiteForceFail);

    try {
      testCollector.currentSuite = test;
      await test.action();
    } catch (error) {
      report = this.getErrorReport(error);
    }

    runtime.internalEvents.removeListener("test_end", onSuiteEnd);
    runtime.internalEvents.removeListener("suite_forced_fail", onSuiteForceFail);

    if (keepRunningAfterEachFunctions) {
      keepRunningAfterEachFunctions = await this.runAfterEachHooks(testFile, group);
    }

    return report;
  }

  private async runAfterEachHooks(testFile: TestFile, group?: Group) {
    const testFileHookErrors = await this.executeHookFunction(testFile.afterEachHooks);
    const groupHookErrors = await this.executeHookFunction(group?.afterEachHooks);

    this.logAndPersistHookErrors(testFileHookErrors);
    this.logAndPersistHookErrors(groupHookErrors);

    return this.isAllEmpty(testFileHookErrors, groupHookErrors);
  }

  private async runBeforeEachHooks(testFile: TestFile, group?: Group) {
    const testFileHookErrors = await this.executeHookFunction(testFile.beforeEachHooks);
    const groupHookErrors = await this.executeHookFunction(group?.beforeEachHooks);

    this.logAndPersistHookErrors(testFileHookErrors);
    this.logAndPersistHookErrors(groupHookErrors);

    return this.isAllEmpty(testFileHookErrors, groupHookErrors);
  }

  private getErrorReport(error: any): ITestReport {
    const ERROR_COUNT_LIMIT = 4;

    if (error instanceof TestError) {
      return {
        message: error.message,
        pass: error.pass,
        testName: error.testName,
        trace: error.trace,
        isHandledError: true,
      };
    }

    if (error instanceof Error) {
      return {
        message: error.message,
        pass: false,
        trace: this.getStackWithLimit(ERROR_COUNT_LIMIT, error.stack),
        isHandledError: false,
      };
    }

    return {
      pass: false,
      message: error.toString(),
      trace: getStackTrace(ERROR_COUNT_LIMIT),
      isHandledError: false,
    };
  }

  private getStackWithLimit(countLimit: number, stack?: string) {
    return stack?.split("\n").slice(0, countLimit).join("\n");
  }

  private executeHookFunction(queue?: Queue<VoidLikeFunction>) {
    if (!queue) {
      return Promise.resolve([]);
    }
    return queue.executeWithCatchCollectAsync();
  }

  private logAndPersistHookErrors(errors: any[]) {
    if (errors.length) {
      printHookErrors(errors, this._logUpdate);
    }
  }

  private isAllEmpty(...arr: any[][]) {
    return arr.every((e) => !e.length);
  }
}
