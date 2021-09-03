import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage } from "../../utils";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeSameLengthAs(this: ITestProps, expected: any, value: string) {
  let pass = matcherUtils.match(
    () => {
      if (typeof expected === "string" && typeof value === "string") {
        return expected.length === value.length;
      }
      return false;
    },
    {
      value: expected,
      validParameters: [String],
    },
    {
      value: value,
      validParameters: [String],
    },
  );
  let isNotText = "";

  if (this.isNot) {
    pass = !pass;
    isNotText = " not";
  }

  let message = "";

  if (typeof expected === "string" && typeof value === "string") {
    message = `expected '${this.expectedColorFn(
      expected,
    )}' to${isNotText} be have same length of ${chalk.red(value)}`;
  } else {
    message = message = matcherUtils.getMessageForParamatersExpectedToBeStrings(
      this,
      expected,
      value,
    );
  }

  return {
    pass,
    message: pass ? "" : buildReportMessage(this.createHint(), "\n\n", message),
  };
}
