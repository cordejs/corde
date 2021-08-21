import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage, typeOf } from "../../utils";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeSymbol<T>(this: ITestProps, expected: T) {
  let pass = matcherUtils.match(() => typeof expected === "symbol", {
    value: expected,
    validParameters: [Symbol],
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
          `${this.expectedColorFn("expected")} should${isNotText} be a ${chalk.green("symbol")}.\n`,
          `got: ${chalk.red(typeOf(expected))}`,
        ),
  };
}
