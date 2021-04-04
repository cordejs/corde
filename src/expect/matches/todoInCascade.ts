import chalk from "chalk";
import { EXPECT_RECEIVED_TAB_SPACE } from "../../consts";
import { TestReport } from "../../types";
import { executePromiseWithTimeout } from "../../utils";
import { ExpectTestBaseParams } from "../types";
import { ExpectTest } from "./expectTest";

/**
 * @internal
 */
export class TodoInCascade extends ExpectTest {
  constructor(params: ExpectTestBaseParams) {
    super({ ...params, testName: "todoInCascade" });
  }

  async action(assertions: (() => Promise<TestReport>)[]): Promise<TestReport> {
    if (!assertions || assertions.length === 0) {
      return this.createReport("no assertions were provided to test");
    }

    await this.sendCommandMessage();

    let tests: TestReport[] = [];
    try {
      tests = await this.waitTestsEnd(assertions);
    } catch (error) {
      if (this.isNot) {
        return this.createPassTest();
      }
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

  private formatFailedTestsMessage(tests: TestReport[]) {
    return tests
      .filter((test) => !test.pass)
      .map(
        (test) =>
          `${EXPECT_RECEIVED_TAB_SPACE} ${chalk.red(
            `● ${test.testName}\n` + chalk.red(`${EXPECT_RECEIVED_TAB_SPACE} ${test.message}`),
          )}`,
      );
  }

  private filterTestsNames(tests: TestReport[], filterFn: (test: TestReport) => boolean) {
    return tests
      .filter(filterFn)
      .map((test) => `${EXPECT_RECEIVED_TAB_SPACE} ${chalk.red(`● ${test.testName}\n`)}`);
  }

  private async waitTestsEnd(assertions: (() => Promise<TestReport>)[]) {
    return await executePromiseWithTimeout<TestReport[]>(async (resolve, reject) => {
      try {
        const values = await Promise.all(assertions.map((assertion) => assertion()));
        resolve(values);
      } catch (error) {
        reject(error);
      }
    }, this.timeOut);
  }
}
