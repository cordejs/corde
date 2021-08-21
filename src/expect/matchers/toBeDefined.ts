import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage, typeOf } from "../../utils";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeDefined<T>(this: ITestProps, expected: T) {
  let pass = matcherUtils.match(() => expected !== undefined && expected !== null, {
    value: expected,
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
          `${this.expectedColorFn("expected")} should${isNotText} have a defined value. (${
            this.isNot ? "equal to" : "different than"
          } ${chalk.bold("undefined")} or ${chalk.bold("null")}).\n`,
          `got: '${chalk.red(typeOf(expected))}'`,
        ),
  };
}
