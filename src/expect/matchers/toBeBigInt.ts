import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage, asymetricTypeOf } from "../../utils";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeBigInt<T>(this: ITestProps, expected: T) {
  let pass = matcherUtils.match(() => typeof expected === "bigint", {
    value: expected,
    validParameters: [BigInt],
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
      : buildReportMessage(
          this.createHint(),
          "\n\n",
          `${this.expectedColorFn("expected")} should${isNotText} be an ${chalk.green(
            "bigInt",
          )}.\n`,
          `got: ${chalk.red(asymetricTypeOf(expected))}`,
        ),
  };
}
