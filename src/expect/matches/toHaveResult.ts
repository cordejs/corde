import chalk from "chalk";
import { EXPECT_RECEIVED_TAB_SPACE } from "../../consts";
import { ITestReport } from "../../types";
import { IExpectTestBaseParams } from "../../types";
import { ExpectTest } from "./expectTest";

/**
 * @internal
 */
export class IToHaveResult extends ExpectTest {
  constructor(params: IExpectTestBaseParams) {
    super({ ...params, testName: "todoInCascade" });
  }

  async action(...assertions: (() => Promise<ITestReport>)[]): Promise<ITestReport> {
    if (!assertions || assertions.length === 0) {
      return this.createReport("no assertions were provided to test");
    }

    await this.sendCommandMessage(true);

    let tests: ITestReport[] = [];
    try {
      tests = await Promise.all(assertions.map((assertion) => assertion()));
    } catch (error) {
      if (this.isNot) {
        return this.createPassTest();
      }

      if (error instanceof Error) {
        return this.createFailedTest(error.message);
      }
      return this.createFailedTest(error);
    }

    if (this.isNot && !tests.some((test) => test.pass)) {
      return this.createPassTest();
    }

    if (!this.isNot && !tests.some((test) => !test.pass)) {
      return this.createPassTest();
    }

    if (this.isNot && tests.some((test) => test.pass)) {
      return this.createReport(
        "expected: all tests to fail\n",
        "received: some tests has passed\n",
        ...this.filterTestsNames(tests, (test) => test.pass),
      );
    }

    return this.createReport(
      "expected: all tests to pass\n",
      "received: some tests has failed\n",
      ...this.formatFailedTestsMessage(tests),
    );
  }

  private formatFailedTestsMessage(tests: ITestReport[]) {
    return tests
      .filter((test) => !test.pass)
      .map((test, index) => {
        let partial = "";

        if (index > 0) {
          partial += "\n";
        }
        partial += `${EXPECT_RECEIVED_TAB_SPACE}${chalk.red(
          `● ${test.testName}. Response: \n` + chalk.red(this.formatReportMessage(test.message)),
        )}`;
        return partial;
      });
  }

  private formatReportMessage(message?: string) {
    if (!message) {
      return "";
    }
    const lineBreakRegex = new RegExp(/\n/g);
    return message.replace("\n", "").replace(lineBreakRegex, "\n    ");
  }

  private filterTestsNames(tests: ITestReport[], filterFn: (test: ITestReport) => boolean) {
    return tests
      .filter(filterFn)
      .map((test) => `${EXPECT_RECEIVED_TAB_SPACE} ${chalk.red(`● ${test.testName}\n`)}`);
  }
}
