import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage } from "../../utils";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeGreaterOrEqualThan(this: ITestProps, expected: any, received: number | bigint) {
  const failedTest = matcherUtils.validateParameterAsNumber(expected, received);
  if (failedTest) {
    return failedTest;
  }

  let pass = matcherUtils.match(() => expected >= received, { expected, received }, Number);
  let comparator = ">=";

  if (this.isNot) {
    pass = !pass;
    comparator = "<";
  }

  return {
    pass,
    message: pass
      ? ""
      : buildReportMessage(
          `expect(${chalk.green("expected")}).toBeGraterOrEqualThan(${chalk.red("received")})\n\n`,
          `expect: ${expected} ${comparator} ${received}.\n`,
        ),
  };
}
