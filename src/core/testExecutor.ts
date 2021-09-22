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
import { IRunnerReport, ISemiRunnerReport, ITest, ITestReport, VoidLikeFunction } from "../types";
import { stringIsNullOrEmpty, Timer } from "../utils";
import { LogUpdate } from "../utils";
import { TestFile } from "../common/TestFile";
import { Group } from "../common/Group";
import { runtime } from "../common/runtime";

export class TestExecutor {
  private _logUpdate: LogUpdate;

  constructor(logUpdate: LogUpdate) {
    this._logUpdate = logUpdate;
  }

  async runTestsAndPrint(testFiles: TestFile[]): Promise<IRunnerReport> {
    const testsTimer = new Timer();
    testsTimer.start();

    const semiReport: ISemiRunnerReport = {
      totalTests: 0,
      totalTestFiles: 0,
      totalTestsPassed: 0,
      totalTestsFailed: 0,
      totalTestFilesPassed: 0,
      totalTestFilesFailed: 0,
      totalEmptyTestFiles: 0,
      totalEmptyTests: 0,
    };

    runtime.internalEvents.on("test_end", (report) => {
      if (report.pass) {
        semiReport.totalTestsPassed++;
        return;
      }

      semiReport.totalTestsFailed++;
      this.printReportData(report);
    });

    for (const testFile of testFiles) {
      if (testFile.isEmpty()) {
        this._logUpdate.append(`${TAG_PENDING("EMPTY")}  ${testFile.path}`);
        this._logUpdate.persist();
        semiReport.totalEmptyTestFiles++;
        semiReport.totalTestFiles++;
      } else {
        if (await this.executeTestFile(testFile, semiReport)) {
          semiReport.totalTestFilesPassed++;
        } else {
          semiReport.totalTestFilesFailed++;
        }
      }
    }
    const testsDiff = testsTimer.stop();

    return {
      testTimer: testsDiff[0],
      ...semiReport,
    };
  }

  private async executeTestFile(testFile: TestFile, semiReport: ISemiRunnerReport) {
    const testFileTimer = new Timer();
    semiReport.totalTestFiles++;
    let fileHasPassed = true;

    testFileTimer.start();
    const logIndex = this._logUpdate.append(`${TAG_PENDING()}  ${testFile.path}`);

    await this.executeHookFunction(testFile.beforeStartHooks);

    for (const group of testFile.groups) {
      const allTestsPassed = await this.executeGroup(group, semiReport, testFile);
      if (!allTestsPassed) {
        fileHasPassed = false;
      }
    }

    await this.executeHookFunction(testFile.afterAllHooks);

    const _diff = testFileTimer.stop();

    let fileLabel = TAG_PASS();
    let fileNameLabel = testFile.path;

    if (!fileHasPassed) {
      fileLabel = TAG_FAIL();
      fileNameLabel = chalk.red(fileNameLabel);
    }

    this._logUpdate.updateLine(
      logIndex,
      `${fileLabel}  ${fileNameLabel}   ${chalk.cyan(_diff[0])}`,
    );

    this._logUpdate.persist();

    return fileHasPassed;
  }

  private async executeGroup(group: Group, semiReport: ISemiRunnerReport, testFile: TestFile) {
    let fileHasPassed = true;
    await this.executeHookFunction(group.beforeStartHooks);
    for (const test of group.tests) {
      const hasPassed = await this.executeTest(test, semiReport, testFile, group);
      if (!hasPassed) {
        fileHasPassed = false;
      }
    }
    await this.executeHookFunction(group.afterAllHooks);

    if (group.subGroups) {
      for (const subGroup of group.subGroups) {
        const hasPassed = await this.executeGroup(subGroup, semiReport, testFile);
        if (!hasPassed) {
          fileHasPassed = false;
        }
      }
    }

    return fileHasPassed;
  }

  private async executeTest(
    test: ITest,
    semiReport: ISemiRunnerReport,
    testFile: TestFile,
    group: Group,
  ) {
    const testTimer = new Timer();
    let fileHasPassed = true;
    testTimer.start();
    let logPosition = 0;

    const testName = await test.toResolveName();
    const testText = this.createTestText(testName);
    logPosition = this._logUpdate.appendLine(testText);

    const reports = await this.runTest(test, testFile, group);

    if (reports.length === 0) {
      semiReport.totalEmptyTests++;
      semiReport.totalTests++;
    }

    const testDiff = testTimer.stop();

    const testNameLabel = this.ITestReportLabelFunction(reports);

    const formatedGroupName = !stringIsNullOrEmpty(group.name) ? group.name + " -> " : "";

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

    if (!this.printTestsReportAndUpdateRunnerReport(reports, semiReport)) {
      fileHasPassed = false;
    }

    return fileHasPassed;
  }

  private printTestsReportAndUpdateRunnerReport(
    reports: ITestReport[],
    semiReport: ISemiRunnerReport,
  ) {
    let fileHasPassed = true;
    for (const report of reports) {
      semiReport.totalTests++;
      if (!this.printReportAndUpdateRunnerReport(report, semiReport)) {
        fileHasPassed = false;
      }
    }
    return fileHasPassed;
  }

  private ITestReportLabelFunction(reports: ITestReport[]) {
    if (reports.length === 0) {
      return (text: string) => TEXT_EMPTY(" " + TEST_RUNNING_ICON + " " + text + " (empty)");
    }

    if (reports.some((report) => !report.pass)) {
      return (text: string) => TEXT_FAIL(TEST_FAIL_ICON + " " + text);
    }
    return (text: string) => TEXT_PASS(TEST_PASSED_ICON + " " + text);
  }

  private printReportAndUpdateRunnerReport(report: ITestReport, semiReport: ISemiRunnerReport) {
    if (report.pass) {
      semiReport.totalTestsPassed++;
      return true;
    }

    semiReport.totalTestsFailed++;
    this.printReportData(report);

    return false;
  }

  private printReportData(report: ITestReport) {
    if (report.message) {
      this._logUpdate.appendLine(report.message);
    }

    if (!report.pass && report.trace) {
      this._logUpdate.appendLine(report.trace);
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

  async runTest(test: ITest, testFile: TestFile, group: Group) {
    const reports: ITestReport[] = [];
    // before e after hooks will run just one time
    // for test structure (if the hook fail)
    let keepRunningBeforeEachFunctions = true;
    let keepRunningAfterEachFunctions = true;

    if (keepRunningBeforeEachFunctions) {
      const testFileHookOk = await this.executeHookFunction(testFile.beforeEachHooks);
      const groupHookOk = await this.executeHookFunction(group.beforeEachHooks);
      keepRunningBeforeEachFunctions = testFileHookOk && groupHookOk;
    }

    const onTestEnd = (report: ITestReport) => {
      reports.push(report);
    };

    runtime.internalEvents.on("test_end", onTestEnd);

    await test.action();

    runtime.internalEvents.removeListener("test_end", onTestEnd);

    if (keepRunningAfterEachFunctions) {
      const testFileHookOk = await this.executeHookFunction(testFile.afterEachHooks);
      const groupHookOk = await this.executeHookFunction(group.afterEachHooks);
      keepRunningAfterEachFunctions = testFileHookOk && groupHookOk;
    }
    return reports;
  }

  private async executeHookFunction(queues: Queue<VoidLikeFunction>) {
    const _functionErrors = await queues.executeWithCatchCollectAsync();
    if (_functionErrors && _functionErrors.length) {
      printHookErrors(_functionErrors);
      return false;
    }
    return true;
  }
}
