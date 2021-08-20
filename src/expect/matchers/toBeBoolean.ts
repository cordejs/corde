import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage, typeOf } from "../../utils";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeBoolean<T>(this: ITestProps, expected: T) {
  let pass = matcherUtils.match(() => typeof expected === "boolean", { expected }, Boolean);
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
          `${this.expectedColorFn("expected")} should${isNotText} be an ${chalk.green(
            "boolean",
          )}.\n`,
          `got: ${chalk.red(typeOf(expected))}`,
        ),
  };
}
