import chalk from "chalk";
import { ITestProps } from "../../types";
import { asymmetricTypeOf } from "../../utils/asymmetricTypeOf";

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

  const expectedType = asymmetricTypeOf(expected);

  const message = expectedType === "boolean" ? expected : expectedType;

  return {
    pass,
    message: pass
      ? ""
      : this.createHint() +
        "\n\n" +
        `${this.expectedColorFn("expected")} should${isNotText} be ${chalk.bold("true")}.\n` +
        `got: ${chalk.red(message)}`,
  };
}
