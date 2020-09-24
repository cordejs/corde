import chalk from "chalk";
import { Group, Test } from "../types";
import { TestReport } from "../api/interfaces";

const FAIL = "FAIL";
const SPACE = "    ";
const DEFAULT_SPACE_VALUE = 4;

class Reporter {
  private readonly _bgSuccess = chalk.bgRgb(21, 194, 19);
  private readonly _bgError = chalk.bgRed;
  private readonly _bold = chalk.bold;
  private readonly _red = chalk.red;
  private readonly _bgSuccessBold = this._bgSuccess.bold;
  private _successCount = 0;
  private _failureCount = 0;

  /**
   * Prints the output of each assertion.
   * @param groups All groups of tests
   * @returns Returns true if all tests has passed
   */
  public outPutResult(groups: Group[]) {
    if (!groups) {
      return false;
    }

    const tabSpace = SPACE;
    this.breakLine();
    groups.forEach((group) => this.printGroup(group, tabSpace));
    this.showSummary();

    return this._failureCount === 0;
  }

  private breakLine() {
    console.log("");
  }

  private printGroup(group: Group, tab: string) {
    if (group.name) {
      console.log(`${tab}${group.name}`);
    }

    if (group.subGroups) {
      tab += SPACE;
      group.subGroups.forEach((subGroup) => this.printGroup(subGroup, ""));
    }

    if (group.tests) {
      tab += SPACE;
      group.tests.forEach((test) => this.printTest(test, tab));
    }
  }

  private printTest(test: Test, tab: string) {
    if (test.name) {
      console.log(`${tab}${test.name}`);
    }

    if (test.subTests) {
      tab += SPACE;
      test.subTests.forEach((subTest) => this.printTest(subTest, tab));
    }

    if (test.testsReports) {
      tab += SPACE;
      test.testsReports.forEach((report) => this.printAssertion(report, tab));
    }
  }

  private printAssertion(report: TestReport, tab: string) {
    if (report.hasPassed) {
      this.printSuccess(tab, report);
      this._successCount++;
    } else {
      this._failureCount++;
      this.printFailure(tab, report);
    }
  }

  private showSummary() {
    this.breakLine();
    if (this.doesAllTestsPassed()) {
      this.printFullSuccess();
    } else if (this.doesSomeTestsPassed()) {
      this.printPartialSuccess();
    } else {
      this.printFullFailure();
    }
  }

  private doesAllTestsPassed() {
    return this._failureCount === 0 && this._successCount > 0;
  }

  private doesSomeTestsPassed() {
    return this._failureCount > 0 && this._successCount > 0;
  }

  private printFullSuccess() {
    console.log("All tests passed!");
    console.log(`${this._bgSuccess(" TOTAL: ")} ${chalk.bold(this._successCount)}`);
  }

  private printPartialSuccess() {
    console.log("Tests passed with errors.");
    console.log(`${this._bgError(" FAILURES: ")} ${chalk.bold(this._failureCount)}`);
    console.log(`${this._bgSuccess(" SUCCESS: ")} ${chalk.bold(this._successCount)}`);
  }

  private printFullFailure() {
    console.log("All tests fail.");
    console.log(`${chalk.bgRed(" FAILURES: ")} ${chalk.bold(this._failureCount)}`);
  }

  private printFailure(tabSpace: string, report: TestReport) {
    if (report.customReturnMessage) {
      console.log(
        `${tabSpace}  ${this._bgSuccess.bold(" PASS ")} command ${chalk.bold(report.commandName)} ${
          report.customReturnMessage
        }`,
      );
    } else {
      if (report.showExpectAndOutputValue) {
        this.printFailureWithValues(tabSpace, report);
      } else {
        this.printFailureOnlyWithCommandName(tabSpace, report.commandName);
      }
    }
  }

  private printSuccess(tabSpace: string, report: TestReport) {
    if (report.showExpectAndOutputValue) {
      this.printSuccessWithValues(tabSpace, report);
    } else {
      this.printSuccessOnlyWithCommandName(tabSpace, report.commandName);
    }
  }

  private printFailureWithValues(tabSpace: string, report: TestReport) {
    const notWord = this.getNotWordIfTrue(report.isNot);

    console.log(
      `${tabSpace} ${chalk.bgRed(` ${FAIL} `)} expected ${chalk.bold(
        report.commandName,
      )} to${notWord}return '${this._bold(
        this.getPrintingValueByType(report.expectation),
      )}'. Returned: '${this._red(this.getPrintingValueByType(report.output))}'`,
    );
  }

  private printFailureOnlyWithCommandName(tabSpace: string, commandName: string) {
    console.log(
      `${tabSpace}  ${this._bgSuccess.bgRed(" FAIL ")} command ${this._bold(
        commandName,
      )} not returned what was expected`,
    );
  }

  private printSuccessWithValues(tabSpace: string, report: TestReport) {
    const notWord = this.getNotWordIfTrue(report.isNot);
    console.log(
      `${tabSpace} ${this._bgSuccessBold(" PASS ")} expected ${chalk.bold(
        report.commandName,
      )} to${notWord}return '${chalk.bold(
        this.getPrintingValueByType(report.expectation),
      )}'. Returned: '${chalk.green(this.getPrintingValueByType(report.output))}'`,
    );
  }

  private printSuccessOnlyWithCommandName(tabSpace: string, commandName: string) {
    console.log(
      `${tabSpace}  ${this._bgSuccess.bold(" PASS ")} command ${chalk.bold(
        commandName,
      )} returned what was expected`,
    );
  }

  private getNotWordIfTrue(isNot: boolean) {
    if (isNot) {
      return " not ";
    }
    return " ";
  }

  private getPrintingValueByType(value: string | object) {
    if (typeof value === "string") {
      return value;
    }
    return `\n ${JSON.stringify(value, null, DEFAULT_SPACE_VALUE)}`;
  }
}

const reporter = new Reporter();
export { reporter };
