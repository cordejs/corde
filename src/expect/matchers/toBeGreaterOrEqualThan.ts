import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage, isNumber, typeOf } from "../../utils";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeGreaterOrEqualThan(
  props: ITestProps,
  expected: any,
  received: number | bigint,
) {
  if (!matcherUtils.isAsymetric(expected) && !isNumber(expected)) {
    return {
      pass: false,
      message: buildReportMessage(
        "expected value is not a number.\n",
        `received: '${chalk.red(typeOf(expected))}'`,
      ),
    };
  }

  if (!matcherUtils.isAsymetric(received) && !isNumber(received)) {
    return {
      pass: false,
      message: buildReportMessage(
        "received value is not a number.\n",
        `received: '${chalk.red(typeOf(received))}'`,
      ),
    };
  }

  let pass = matcherUtils.match(() => expected >= received, { expected, received }, Number);
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
          `expect(${chalk.green("expect")}).toBeGraterOrEqualThan(${chalk.red("received")})\n`,
          `expect: ${expected} ${comparator} ${received}.\n`,
        ),
  };
}
