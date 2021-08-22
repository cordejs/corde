import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage, isString, asymetricTypeOf } from "../../utils";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeEmptyString(this: ITestProps, expected: any) {
  let pass = matcherUtils.match(() => isString(expected) && expected.length === 0, {
    value: expected,
    validParameters: [String],
  });
  let isNotText = "";

  if (this.isNot) {
    pass = !pass;
    isNotText = " not";
  }

  let gotText = chalk.red(asymetricTypeOf(expected));

  if (typeof expected === "string") {
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
            "empty string",
          )}.\n`,
          `got: ${gotText}`,
        ),
  };
}
