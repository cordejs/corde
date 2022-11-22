import chalk from "chalk";
import { ITestProps } from "../../types";
import { asymmetricTypeOf } from "../../utils/asymmetricTypeOf";
import { isPrimitiveValue } from "../../utils/isPrimitiveValue";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBePrimitive<T>(this: ITestProps, expected: T) {
  let pass = matcherUtils.match(() => isPrimitiveValue(expected), {
    value: expected,
    validParameters: [Number, String, BigInt, Boolean],
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
        `${this.expectedColorFn(
          "expected",
        )} should${isNotText} be primitive expected (${chalk.green(
          "string | bigint | number | boolean",
        )}).\n` +
        `got: ${chalk.red(asymmetricTypeOf(expected))}`,
  };
}
