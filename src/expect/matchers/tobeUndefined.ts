import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage, typeOf } from "../../utils";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeUndefined(this: ITestProps, expected: any) {
  let pass = !matcherUtils.isAsymetric(expected) && expected === undefined;
  let isNotText = " not";

  if (this.isNot) {
    pass = !pass;
    isNotText = "";
  }

  return {
    pass,
    message: pass
      ? ""
      : buildReportMessage(
          `${this.expectedColorFn("expected")} should${isNotText} be an ${chalk.green(
            "undefined",
          )}.\n`,
          `got: ${chalk.red(typeOf(expected))}`,
        ),
  };
}
