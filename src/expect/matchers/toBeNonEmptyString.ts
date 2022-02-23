import chalk from "chalk";
import { ITestProps } from "../../types";
import { asymmetricTypeOf } from "../../utils/asymmetricTypeOf";
import { buildReportMessage } from "../../utils/buildReportMessage";
import { isString } from "../../utils/isString";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeNonEmptyString(this: ITestProps, expected: any) {
  let pass = matcherUtils.match(() => isString(expected) && expected.length > 0, {
    value: expected,
    validParameters: [String],
  });
  let isNotText = "";

  if (this.isNot) {
    pass = !pass;
    isNotText = " not";
  }

  let gotText = chalk.red(asymmetricTypeOf(expected));

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
          `${this.expectedColorFn("expected")} should${isNotText} be a ${chalk.green(
            "filled string",
          )}.\n`,
          `got: ${gotText}`,
        ),
  };
}
