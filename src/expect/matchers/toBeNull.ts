import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage, typeOf } from "../../utils";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeNull(this: ITestProps, expected: any) {
  let pass = !matcherUtils.isAsymetric(expected) && expected === null;
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
          `${this.expectedColorFn("expected")} should${isNotText} be ${chalk.green("null")}.\n`,
          `got: ${chalk.red(typeOf(expected))}`,
        ),
  };
}
