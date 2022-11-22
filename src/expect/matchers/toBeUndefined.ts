import chalk from "chalk";
import { ITestProps } from "../../types";
import { asymmetricTypeOf } from "../../utils/asymmetricTypeOf";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeUndefined(this: ITestProps, expected: any) {
  let pass = !matcherUtils.isAsymmetric(expected) && expected === undefined;
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
        `${this.expectedColorFn("expected")} should${isNotText} be an ${chalk.green(
          "undefined",
        )}.\n` +
        `got: ${chalk.red(asymmetricTypeOf(expected))}`,
  };
}
