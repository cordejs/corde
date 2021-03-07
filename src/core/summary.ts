import { TEXT_FAIL, TEXT_PASS, TEXT_PENDING } from "../consts";
import { RunnerReport } from "../types";

interface SummaryLine {
  label: string;
  total: number;
  fail: number;
  success: number;
  emptyLabel: string;
}

class Summary {
  print(runnerReport: RunnerReport) {
    this.printTestFiles(runnerReport);
    this.printTests(runnerReport);
    console.log("Time:        " + runnerReport.testTimer);
  }

  private printTestFiles(runnerReport: RunnerReport) {
    this.printSummaryLine({
      emptyLabel: "No tests in files, ",
      fail: runnerReport.totalTestFilesFailed,
      label: "Test Files: ",
      success: runnerReport.totalTestFilesPassed,
      total: runnerReport.totalTestFiles,
    });
  }

  private printTests(runnerReport: RunnerReport) {
    this.printSummaryLine({
      emptyLabel: "No tests found, ",
      fail: runnerReport.totalTestsFailed,
      label: "Tests:      ",
      success: runnerReport.totalTestsPassed,
      total: runnerReport.totalTests,
    });
  }

  private printSummaryLine(data: SummaryLine) {
    const { label, fail, success, total, emptyLabel } = data;

    if (fail === 0 && success > 0) {
      console.log(`${success}${TEXT_PASS(`${success} passed`)}, ${total} total`);
    }

    if (fail > 0 && success === 0) {
      console.log(`${success}${TEXT_FAIL(`${fail} failed`)}, ${total} total`);
    }

    if (fail > 0 && success > 0) {
      console.log(
        `${label}${TEXT_PASS(`${success} passed`)} and ${TEXT_FAIL(
          `${fail} failed`,
        )}, ${total} total`,
      );
    }

    if (fail === 0 && success === 0) {
      console.log(`${label}${TEXT_PENDING(emptyLabel)}${total} total`);
    }
  }
}

const summary = new Summary();
export { summary };
