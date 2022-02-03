import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage } from "../../utils/buildReportMessage";
import { isValidNumber } from "../../utils/isValidNumber";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeValidDate(this: ITestProps, expected: any) {
  let pass = matcherUtils.match(
    () => {
      if (expected instanceof Date) {
        return isValidNumber(expected.getDate());
      }

      if (typeof expected === "string" || typeof expected === "number") {
        return isValidNumber(new Date(expected).getDate());
      }

      return false;
    },
    { value: expected, validParameters: [Date, Number] },
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
          `${this.expectedColorFn("expected")} should${isNotText} be a valid ${chalk.green(
            "date",
          )}.\n`,
          `got: ${chalk.red(this.formatValue(expected))}`,
        ),
  };
}
