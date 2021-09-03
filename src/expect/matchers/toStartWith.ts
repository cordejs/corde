import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage, asymetricTypeOf } from "../../utils";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toStartWith(this: ITestProps, expected: any, value: string) {
  let pass = typeof expected === "string" && expected.startsWith(value);
  let isNotText = "";

  if (this.isNot) {
    pass = !pass;
    isNotText = " not";
  }

  let message = "";
  if (typeof expected === "string" && typeof value === "string") {
    message = `string '${this.expectedColorFn(
      expected,
    )}' should${isNotText} start with '${chalk.red(value)}''.\n`;
  } else {
    message = matcherUtils.getMessageForParamatersExpectedToBeStrings(this, expected, value);
  }

  return {
    pass,
    message: pass ? "" : buildReportMessage(this.createHint(), "\n\n", message),
  };
}
