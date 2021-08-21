import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage, typeOf } from "../../utils";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeNothing(this: ITestProps, expected: any) {
  let pass = !matcherUtils.isAsymetric(expected) && (expected === null || expected === undefined);
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
          this.createHint(),
          "\n\n",
          `${this.expectedColorFn("expected")} should${isNotText} be ${chalk.green(
            "null",
          )} or ${chalk.green("undefined")}.\n`,
          `got: ${chalk.red(typeOf(expected))}`,
        ),
  };
}
