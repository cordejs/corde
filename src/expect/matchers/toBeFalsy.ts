import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage, asymmetricTypeOf } from "../../utils";

/**
 * @internal
 */
export function toBeFalsy(this: ITestProps, expected: any) {
  let pass = !expected;
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
          `${this.expectedColorFn("expected")} should${isNotText} be a falsy value.\n`,
          `got: ${chalk.red(asymmetricTypeOf(expected))}`,
        ),
  };
}
