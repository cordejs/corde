import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage, typeOf } from "../../utils";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeNothing(this: ITestProps, value: any) {
  let expected = !matcherUtils.isAsymetric(value) && (value === null || value === undefined);
  let isNotText = " not";

  if (this.isNot) {
    expected = !expected;
    isNotText = "";
  }

  return {
    expected,
    message: expected
      ? ""
      : buildReportMessage(
          `${this.expectedColorFn("expected")} should${isNotText} be ${chalk.green(
            "null",
          )} or ${chalk.green("undefined")}.\n`,
          `got: ${chalk.red(typeOf(expected))}`,
        ),
  };
}
