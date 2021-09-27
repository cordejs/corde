import chalk from "chalk";
import { printHookErrors } from "../common/printHookError";
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
} from "../consts";
import { Queue } from "../data-structures";
import {
  IRunnerReport,
  ISemiRunnerReport,
  ITest,
  ITestReport,
  Nullable,
  VoidLikeFunction,
} from "../types";
import { stringIsNullOrEmpty, Timer } from "../utils";
import { LogUpdate } from "../utils";
import { TestFile } from "../common/TestFile";
import { Group } from "../common/Group";
import { runtime } from "../common/runtime";
import { TestError } from "../errors";

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
      this._logUpdate.append(`${TAG_PENDING("EMPTY")}  ${testFile.path}`);
      this._logUpdate.persist();
      this._semiReport.totalEmptyTestFiles++;
      this._semiReport.totalTestFiles++;
      return;
    }

    const testFileTimer = new Timer();
    this._semiReport.totalTestFiles++;

    testFileTimer.start();
    const logIndex = this._logUpdate.append(`${TAG_PENDING()}  ${testFile.path}`);

    await this.executeHookFunction(testFile.beforeAllHooks);

    const status = await this.executeClosures(testFile.closures, testFile);

    await this.executeHookFunction(testFile.afterAllHooks);

    const _diff = testFileTimer.stop();

    let fileLabel = TAG_PASS();
    let fileNameLabel = testFile.path;

    if (status === "fail") {
      fileLabel = TAG_FAIL();
      fileNameLabel = chalk.red(fileNameLabel);
    }

    this._logUpdate.updateLine(
      logIndex,
      `${fileLabel}  ${fileNameLabel}   ${chalk.cyan(_diff[0])}`,
    );

    this._logUpdate.persist();

    if (status === "pass") {
      this._semiReport.totalTestFilesPassed++;
    } else if (status === "fail") {
      this._semiReport.totalTestFilesFailed++;
    } else {
      this._semiReport.totalEmptyTestFiles++;
    }
  }

  private async executeGroup(group: Group, testFile: TestFile) {
    let status: ReportStatusType = "pass";
    await this.executeHookFunction(group.beforeAllHooks);
    status = await this.executeClosures(group.closures, testFile);
    await this.executeHookFunction(group.afterAllHooks);
    return status;
  }

  private async executeClosures(closures: (ITest | Group)[], testFile: TestFile) {
    let status: ReportStatusType = "pass";
    for (const closure of closures) {
      if (closure instanceof Group) {
        status = (await this.executeGroup(closure, testFile)) as ReportStatusType;
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

    const formatedGroupName = !stringIsNullOrEmpty(group?.name) ? group?.name + " -> " : "";

    if (stringIsNullOrEmpty(testName)) {
      this._logUpdate.updateLine(
        logPosition,
        `${MESSAGE_TAB_SPACE}${testNameLabel(
          formatedGroupName + "<empty test name>",
        )}   ${chalk.cyan(testDiff[0])}`,
      );
    } else {
      this._logUpdate.updateLine(
        logPosition,
        `${MESSAGE_TAB_SPACE}${testNameLabel(formatedGroupName + testName)}   ${chalk.cyan(
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
      this._logUpdate.appendLine(report.message);
    }

    if (!report.pass && report.trace) {
      this._logUpdate.appendLine(report.trace + "\n");
    }
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
      const testFileHookOk = await this.executeHookFunction(testFile.beforeEachHooks);
      const groupHookOk = await this.executeHookFunction(group?.beforeEachHooks);
      keepRunningBeforeEachFunctions = testFileHookOk && groupHookOk;
    }

    const onTestEnd = (_report: ITestReport) => {
      report = _report;
    };

    runtime.internalEvents.on("test_end", onTestEnd);

    try {
      await test.action();
    } catch (error) {
      if (error instanceof TestError) {
        report = {
          message: error.message,
          pass: error.pass,
          testName: error.testName,
          trace: error.trace,
        };
      }
    }

    runtime.internalEvents.removeListener("test_end", onTestEnd);

    if (keepRunningAfterEachFunctions) {
      const testFileHookOk = await this.executeHookFunction(testFile.afterEachHooks);
      const groupHookOk = await this.executeHookFunction(group?.afterEachHooks);
      keepRunningAfterEachFunctions = testFileHookOk && groupHookOk;
    }

    return report;
  }

  private async executeHookFunction(queues?: Queue<VoidLikeFunction>) {
    if (!queues) {
      return true;
    }

    const _functionErrors = await queues.executeWithCatchCollectAsync();
    if (_functionErrors && _functionErrors.length) {
      printHookErrors(_functionErrors);
      return false;
    }
    return true;
  }
}
