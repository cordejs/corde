import chalk from "chalk";
import { ITestProps } from "../../types";
import { asymmetricTypeOf } from "../../utils/asymmetricTypeOf";
import { buildReportMessage } from "../../utils/buildReportMessage";

/**
 * @internal
 */
export function toBeRegExp(this: ITestProps, expected: any) {
  let pass = expected instanceof RegExp;
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
          `${this.expectedColorFn("expected")} should${isNotText} be ${chalk.green("RegExp")}.\n`,
          `got: ${chalk.red(asymmetricTypeOf(expected))}`,
        ),
  };
}
