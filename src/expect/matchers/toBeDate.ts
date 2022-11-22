import chalk from "chalk";
import { ITestProps } from "../../types";
import { asymmetricTypeOf } from "../../utils/asymmetricTypeOf";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeDate<T>(this: ITestProps, expected: T) {
  let pass = matcherUtils.match(() => expected instanceof Date, {
    value: expected,
    validParameters: [Date],
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
        `${this.expectedColorFn("expected")} should${isNotText} be a ${chalk.green("date")}.\n` +
        `got: ${chalk.red(asymmetricTypeOf(expected))}`,
  };
}
