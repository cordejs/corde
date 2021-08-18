import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage } from "../../utils";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeGreaterOrEqualThan(props: ITestProps, value: any, received: number | bigint) {
  const failedTest = matcherUtils.validateParameterAsNumber(value, received);
  if (failedTest) {
    return failedTest;
  }

  let pass = matcherUtils.match(() => value >= received, { value, received }, Number);
  let comparator = ">=";

  if (props.isNot) {
    pass = !pass;
    comparator = "<";
  }

  return {
    pass,
    message: pass
      ? ""
      : buildReportMessage(
          `expect(${chalk.green("value")}).toBeGraterOrEqualThan(${chalk.red("received")})\n`,
          `expect: ${value} ${comparator} ${received}.\n`,
        ),
  };
}
