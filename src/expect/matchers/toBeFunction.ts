import chalk from "chalk";
import { ITestProps } from "../../types";
import { asymmetricTypeOf } from "../../utils/asymmetricTypeOf";
import { isFunction } from "../../utils/isFunction";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeFunction(this: ITestProps, expected: any) {
  let pass = matcherUtils.match(() => isFunction(expected), {
    value: expected,
    validParameters: [Function],
  });
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
          "function",
        )}.\n` +
        `got: ${chalk.red(asymmetricTypeOf(expected))}`,
  };
}
