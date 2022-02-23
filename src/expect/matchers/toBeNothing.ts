import chalk from "chalk";
import { ITestProps } from "../../types";
import { asymmetricTypeOf } from "../../utils/asymmetricTypeOf";
import { buildReportMessage } from "../../utils/buildReportMessage";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeNothing(this: ITestProps, expected: any) {
  let pass = !matcherUtils.isAsymmetric(expected) && (expected === null || expected === undefined);
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
          `${this.expectedColorFn("expected")} should${isNotText} be ${chalk.green(
            "null",
          )} or ${chalk.green("undefined")}.\n`,
          `got: ${chalk.red(asymmetricTypeOf(expected))}`,
        ),
  };
}
