import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage, asymetricTypeOf } from "../../utils";

/**
 * @internal
 */
export function toBeTrue(this: ITestProps, expected: any) {
  let pass = expected === true;
  let isNotText = "";

  if (this.isNot) {
    pass = !pass;
    isNotText = " not";
  }

  const expectedType = asymetricTypeOf(expected);

  let message = expectedType === "boolean" ? expected : expectedType;

  return {
    pass,
    message: pass
      ? ""
      : buildReportMessage(
          this.createHint(),
          "\n\n",
          `${this.expectedColorFn("expected")} should${isNotText} be ${chalk.bold("true")}.\n`,
          `got: ${chalk.red(message)}`,
        ),
  };
}
