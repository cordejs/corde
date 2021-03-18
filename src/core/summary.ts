import { TEXT_EMPTY, TEXT_FAIL, TEXT_PASS, TEXT_PENDING } from "../consts";
import { RunnerReport } from "../types";

interface SummaryLine {
  label: string;
  total: number;
  fail: number;
  success: number;
  totalEmpty: number;
}

class Summary {
  print(runnerReport: RunnerReport) {
    let message = "\n";
    message += this.buildTestFilesSummary(runnerReport) + "\n";
    message += this.buildTestsSummary(runnerReport) + "\n";
    if (runnerReport.testTimer) {
      message += "Time:       " + runnerReport.testTimer;
    }
    console.log(message);
    return message;
  }

  private buildTestFilesSummary(runnerReport: RunnerReport) {
    return this.buildSummaryLine({
      fail: runnerReport.totalTestFilesFailed,
      label: "Test Files: ",
      success: runnerReport.totalTestFilesPassed,
      totalEmpty: runnerReport.totalEmptyTestFiles,
      total: runnerReport.totalTestFiles,
    });
  }

  private buildTestsSummary(runnerReport: RunnerReport) {
    return this.buildSummaryLine({
      fail: runnerReport.totalTestsFailed,
      label: "Tests:      ",
      success: runnerReport.totalTestsPassed,
      totalEmpty: runnerReport.totalEmptyTests,
      total: runnerReport.totalTests,
    });
  }

  private buildSummaryLine(data: SummaryLine) {
    const { label, fail, success, total, totalEmpty } = data;

    const partialLine: string[] = [];
    if (success > 0) {
      partialLine.push(TEXT_PASS(`${success} passed`));
    }

    if (fail > 0) {
      partialLine.push(TEXT_FAIL(`${fail} failed`));
    }

    if (totalEmpty > 0) {
      partialLine.push(TEXT_EMPTY(`${totalEmpty} empty`));
    }

    return `${label}${this.buildSummaryLinePhrase(partialLine)}. ${total} total`;
  }

  /**
   * Builds the summary line phrase
   *
   * @example
   *
   * ["1 passed", "2 fail"] => '1 passed and 2 fail'
   * ["1 passed", "2 fail", "1 empty"] => '1 passed, 2 fail and 1 empty'
   */
  private buildSummaryLinePhrase(parts: string[]) {
    let builtLine = "";

    for (let i = 0; i < parts.length; i++) {
      if (parts.length > 2 && i < 2) {
        builtLine += parts[i] + ", ";
      } else {
        builtLine += parts[i] + " and ";
      }
    }

    // removes the last 'and '
    return builtLine.substring(0, builtLine.length - 5);
  }
}

const summary = new Summary();
export { summary };