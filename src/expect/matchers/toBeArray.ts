import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage, typeOf } from "../../utils";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeArray(this: ITestProps, expected: any) {
  let pass = matcherUtils.match(() => Array.isArray(expected), {
    value: expected,
    validParameters: [Array],
  });
  let isNotText = "";

  if (this.isNot) {
    pass = !pass;
    isNotText = " not";
  }

  return {
    pass,
    message: pass
      ? ""
      : buildReportMessage(
          `${this.expectedColorFn("expected")} should${isNotText} be an ${chalk.green("array")}.\n`,
          `got: ${chalk.red(typeOf(expected))}`,
        ),
  };
}
