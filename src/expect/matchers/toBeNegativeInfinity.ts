import chalk from "chalk";
import { ITestProps } from "../../types";
import { asymmetricTypeOf } from "../../utils/asymmetricTypeOf";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeNegativeInfinity(this: ITestProps, expected: any) {
  let pass = matcherUtils.match(() => expected === Number.NEGATIVE_INFINITY, {
    value: expected,
    validParameters: [Number, BigInt],
  });
  let isNotText = "";

  if (this.isNot) {
    pass = !pass;
    isNotText = " not";
  }

  let expectedOutput = expected;

  if (
    matcherUtils.isAsymmetric(expected) &&
    typeof expected !== "number" &&
    typeof expected !== "bigint"
  ) {
    expectedOutput = asymmetricTypeOf(expected);
  }

  return {
    pass,
    message: pass
      ? ""
      : this.createHint() +
        "\n\n" +
        `${this.expectedColorFn("expected")} should${isNotText} be ${chalk.green("-Infinity")}.\n` +
        `got: ${chalk.red(expectedOutput)}`,
  };
}
