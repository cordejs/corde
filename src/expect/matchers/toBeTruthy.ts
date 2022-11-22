import chalk from "chalk";
import { ITestProps } from "../../types";
import { asymmetricTypeOf } from "../../utils/asymmetricTypeOf";

/**
 * @internal
 */
export function toBeTruthy(this: ITestProps, expected: any) {
  let pass = !!expected;
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
        `${this.expectedColorFn("expected")} should${isNotText} be a truthy value.\n` +
        `got: ${chalk.red(asymmetricTypeOf(expected))}`,
  };
}
