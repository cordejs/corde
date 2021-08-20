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
    { expected },
  );
  let isNotText = " not";

  if (this.isNot) {
    pass = !pass;
    isNotText = "";
  }

  return {
    pass,
    message: pass
      ? ""
      : buildReportMessage(
          `${this.expectedColorFn("expected")} should${isNotText} be ${chalk.green("NaN")}.\n`,
          `got: ${chalk.red(typeOf(expected))}`,
        ),
  };
}
