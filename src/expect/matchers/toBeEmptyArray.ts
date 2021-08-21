import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage, typeOf } from "../../utils";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeEmptyArray(this: ITestProps, expected: any) {
  let pass = matcherUtils.match(() => Array.isArray(expected) && expected.length === 0, {
    value: expected,
    validParameters: [Array],
  });
  let isNotText = "";

  if (this.isNot) {
    pass = !pass;
    isNotText = " not";
  }

  let gotText = chalk.red(typeOf(expected));

  if (Array.isArray(expected)) {
    gotText = chalk.red(`expected.length == ${expected.length}`);
  }

  return {
    pass,
    message: pass
      ? ""
      : buildReportMessage(
          this.createHint(),
          "\n\n",
          `${this.expectedColorFn("expected")} should${isNotText} be an ${chalk.green(
            "empty array",
          )}.\n`,
          `got: ${gotText}`,
        ),
  };
}
