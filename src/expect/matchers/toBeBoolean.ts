import chalk from "chalk";
import { ITestProps } from "../../types";
import { asymmetricTypeOf } from "../../utils/asymmetricTypeOf";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeBoolean<T>(this: ITestProps, expected: T) {
  let pass = matcherUtils.match(() => typeof expected === "boolean", {
    value: expected,
    validParameters: [Boolean],
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
          "boolean",
        )}.\n` +
        `got: ${chalk.red(asymmetricTypeOf(expected))}`,
  };
}
