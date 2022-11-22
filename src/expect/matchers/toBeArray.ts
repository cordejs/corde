import chalk from "chalk";
import { ITestProps } from "../../types";
import { asymmetricTypeOf } from "../../utils/asymmetricTypeOf";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeArray(this: ITestProps, expected: any) {
  let pass = matcherUtils.match(() => Array.isArray(expected), {
    value: expected,
    validParameters: [Array],
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
        "\n" +
        `${this.expectedColorFn("expected")} should${isNotText} be an ${chalk.green("array")}.\n` +
        `got: ${chalk.red(asymmetricTypeOf(expected))}`,
  };
}
