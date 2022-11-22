import chalk from "chalk";
import { ITestProps } from "../../types";
import { asymmetricTypeOf } from "../../utils/asymmetricTypeOf";
import { isString } from "../../utils/isString";

/**
 * @internal
 */
export function toBeWhiteSpace(this: ITestProps, expected: any) {
  let pass = isString(expected) && expected.match(/^\s+$/) !== null;
  let isNotText = "";

  if (this.isNot) {
    pass = !pass;
    isNotText = " not";
  }

  return {
    pass,
    message: pass
      ? ""
      : this.createHint() +
        "\n\n" +
        `${this.expectedColorFn("expected")} should${isNotText} be ${chalk.green(
          "string with white spaces",
        )}.\n` +
        `got: ${chalk.red(typeof expected === "string" ? expected : asymmetricTypeOf(expected))}`,
  };
}
