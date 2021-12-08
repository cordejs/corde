import chalk from "chalk";
import { ITestProps } from "../../types";
import { asymetricTypeOf, buildReportMessage, every, isString } from "../../utils";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeArrayOfStrings(this: ITestProps, expected: any) {
  let pass = matcherUtils.match(
    () => {
      if (!Array.isArray(expected)) {
        return false;
      }

      return every(expected, isString);
    },
    {
      value: expected,
      validParameters: [Array],
    },
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
          `${this.expectedColorFn("expected")} should${isNotText} be an ${chalk.green(
            "array of objects",
          )}.\n`,
          `got: ${chalk.red(asymetricTypeOf(expected))}`,
        ),
  };
}
