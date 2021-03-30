import chalk from "chalk";
import { runtime } from "../common/runtime";
import { testCollector } from "../common/testCollector";
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
  Group,
  RunnerReport,
  SemiRunnerReport,
  Test,
  TestFile,
  TestReport,
  VoidLikeFunction,
} from "../types";
import { formatObject, stringIsNullOrEmpty, Timer } from "../utils";
import { LogUpdate } from "../utils";

export class TestExecutor {
  private _logUpdate: LogUpdate;

  constructor(logUpdate: LogUpdate) {
    this._logUpdate = logUpdate;
  }

  async runTestsAndPrint(testFiles: TestFile[]): Promise<RunnerReport> {
    const testsTimer = new Timer();
    testsTimer.start();

    const semiReport: SemiRunnerReport = {
      totalTests: 0,
      totalTestFiles: 0,
      totalTestsPassed: 0,
      totalTestsFailed: 0,
      totalTestFilesPassed: 0,
      totalTestFilesFailed: 0,
      totalEmptyTestFiles: 0,
      totalEmptyTests: 0,
    };

    for (const testFile of testFiles) {
      if (testFile.isEmpty) {
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

  private async executeTestFile(testFile: TestFile, semiReport: SemiRunnerReport) {
    const testFileTimer = new Timer();
    semiReport.totalTestFiles++;
    let fileHasPassed = true;

    testFileTimer.start();
    const logIndex = this._logUpdate.append(`${TAG_PENDING()}  ${testFile.path}`);

    for (const group of testFile.groups) {
      if (!(await this.executeGroup(group, semiReport))) {
        fileHasPassed = false;
      }
    }

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

  private async executeGroup(group: Group, semiReport: SemiRunnerReport) {
    const tests = this.getAssertionPropsFromGroup(group);
    let fileHasPassed = true;
    for (const test of tests) {
      if (!(await this.executeTest(test, semiReport, group.name))) {
        fileHasPassed = false;
      }
    }
    return fileHasPassed;
  }

  private async executeTest(
    test: Test,
    semiReport: SemiRunnerReport,
    groupName?: string | number | boolean,
  ) {
    const testTimer = new Timer();
    let fileHasPassed = true;
    testTimer.start();
    let logPosition = 0;

    const testText = this.createTestText(test.name);
    logPosition = this._logUpdate.appendLine(testText);

    const reports = await this.runTest(test);

    if (reports.length === 0) {
      semiReport.totalEmptyTests++;
      semiReport.totalTests++;
    }

    const testDiff = testTimer.stop();

    const testNameLabel = this.testReportLabelFunction(reports);

    const formatedGroupName = !stringIsNullOrEmpty(groupName) ? groupName + " -> " : "";

    if (stringIsNullOrEmpty(test.name)) {
      this._logUpdate.updateLine(
        logPosition,
        `${MESSAGE_TAB_SPACE}${testNameLabel(
          formatedGroupName + "<empty test name>",
        )}   ${chalk.cyan(testDiff[0])}`,
      );
    } else {
      this._logUpdate.updateLine(
        logPosition,
        `${MESSAGE_TAB_SPACE}${testNameLabel(formatedGroupName + test.name)}   ${chalk.cyan(
          testDiff[0],
        )}`,
      );
    }

    if (!this.printTestsReportAndUpdateRunnerReport(reports, semiReport)) {
      fileHasPassed = false;
    }

    test.testsReports = reports;
    return fileHasPassed;
  }

  private printTestsReportAndUpdateRunnerReport(
    reports: TestReport[],
    semiReport: SemiRunnerReport,
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

  private testReportLabelFunction(reports: TestReport[]) {
    if (reports.length === 0) {
      return (text: string) => TEXT_EMPTY(" " + TEST_RUNNING_ICON + " " + text + " (empty)");
    }

    if (reports.some((report) => !report.pass)) {
      return (text: string) => TEXT_FAIL(TEST_FAIL_ICON + " " + text);
    }
    return (text: string) => TEXT_PASS(TEST_PASSED_ICON + " " + text);
  }

  private printReportAndUpdateRunnerReport(report: TestReport, semiReport: SemiRunnerReport) {
    if (report.pass) {
      semiReport.totalTestsPassed++;
      return true;
    }

    semiReport.totalTestsFailed++;
    this.printReportData(report);

    return false;
  }

  private printReportData(report: TestReport) {
    if (report.message) {
      this._logUpdate.appendLine(report.message);
    }

    if (!report.pass && report.trace) {
      this._logUpdate.appendLine(report.trace);
    }
  }

  private createTestText(testName: string | number | boolean) {
    if (stringIsNullOrEmpty(testName)) {
      return this.createTestTextByStatus("<empty test name>");
    }
    return this.createTestTextByStatus(testName);
  }

  private createTestTextByStatus(testName: string | number | boolean) {
    const icon = TEST_RUNNING_ICON;
    return `${MESSAGE_TAB_SPACE}${icon} ${testName}`;
  }

  async runTest(test: Test) {
    const reports: TestReport[] = [];

    // before e after hooks will run just one time
    // for test structure (if the hook fail)
    let keepRunningBeforeEachFunctions = true;
    let keepRunningAfterEachFunctions = true;

    for (const testfn of test.testsFunctions) {
      keepRunningBeforeEachFunctions = await this.executeHookFunctionIfPossible(
        keepRunningBeforeEachFunctions,
        testCollector.beforeEachFunctions,
      );

      let _report: TestReport;
      try {
        _report = await runtime.injectBot(testfn);
      } catch (error) {
        _report = {
          pass: false,
          message: this.getErrorMessage(error),
        };
      }

      keepRunningAfterEachFunctions = await this.executeHookFunctionIfPossible(
        keepRunningAfterEachFunctions,
        testCollector.afterEachFunctions,
      );

      reports.push(_report);
    }
    return reports;
  }

  private async executeHookFunctionIfPossible(
    keepRunning: boolean,
    queues: Queue<VoidLikeFunction>,
  ) {
    if (keepRunning) {
      const _functionErrors = await queues.executeWithCatchCollectAsync();
      if (_functionErrors && _functionErrors.length) {
        printHookErrors(_functionErrors);
        return false;
      }
      return true;
    }
    return false;
  }

  private getErrorMessage(error: any) {
    if (error instanceof Error) {
      return error.message;
    }

    return formatObject(error);
  }

  private getAssertionPropsFromGroup(group: Group) {
    const assertions: Test[] = [];
    if (group.tests) {
      group.tests.forEach((test) => {
        assertions.push(...this.getAssertionsPropsFromTest(test));
      });
    }

    if (group.subGroups) {
      group.subGroups.forEach((subGroup) => {
        const subGroupTests = this.getAssertionPropsFromGroup(subGroup);
        assertions.push(...subGroupTests);
      });
    }

    return assertions;
  }

  private getAssertionsPropsFromTest(test: Test) {
    const tests: Test[] = [test];

    if (test.subTests) {
      test.subTests.forEach((subtest) => {
        tests.push(...this.getAssertionsPropsFromTest(subtest));
      });
    }

    return tests;
  }
}
