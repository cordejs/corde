import chalk from "chalk";
import { ITestProps } from "../../types";
import { asymmetricTypeOf } from "../../utils/asymmetricTypeOf";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeString<T>(this: ITestProps, expected: T) {
  let pass = matcherUtils.match(() => typeof expected === "string", {
    value: expected,
    validParameters: [String],
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
        `${this.expectedColorFn("expected")} should${isNotText} be a ${chalk.green("string")}.\n` +
        `got: ${chalk.red(asymmetricTypeOf(expected))}`,
  };
}
