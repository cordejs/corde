import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage, typeOf } from "../../utils";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeNaN(this: ITestProps, expected: any) {
  let pass = matcherUtils.match(
    () => {
      try {
        return isNaN(expected);
      } catch {
        return false;
      }
    },
    { value: expected },
  );
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
          `${this.expectedColorFn("expected")} should${isNotText} be ${chalk.green("NaN")}.\n`,
          `got: ${chalk.red(typeOf(expected))}`,
        ),
  };
}
