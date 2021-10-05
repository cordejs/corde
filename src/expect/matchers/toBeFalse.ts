import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage, asymetricTypeOf } from "../../utils";

/**
 * @internal
 */
export function toBeFalse(this: ITestProps, expected: any) {
  let pass = expected === false;
  let isNotText = "";

  if (this.isNot) {
    pass = !pass;
    isNotText = " not";
  }

  const expectedType = asymetricTypeOf(expected);

  const message = expectedType === "boolean" ? expected : expectedType;

  return {
    pass,
    message: pass
      ? ""
      : buildReportMessage(
          this.createHint(),
          "\n\n",
          `${this.expectedColorFn("expected")} should${isNotText} be ${chalk.bold("false")}.\n`,
          `got: ${chalk.red(message)}`,
        ),
  };
}
