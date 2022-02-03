import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage, isAsymmetricMatcher } from "../../utils";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toStringContains(this: ITestProps, expected: any, received: any) {
  if (!isAsymmetricMatcher(expected) && typeof expected !== "string") {
    return {
      pass: false,
      message: `${this.expectedColorFn("expected")} must be a string`,
    };
  }

  if (!isAsymmetricMatcher(received) && typeof received !== "string") {
    return {
      pass: false,
      message: `${this.expectedColorFn("received")} must be a string`,
    };
  }

  let pass = matcherUtils.match(
    () => {
      if (typeof expected === "string" && typeof received === "string") {
        return expected.includes(received);
      }
      return false;
    },
    {
      value: received,
      validParameters: [String],
    },
    {
      value: expected,
      validParameters: [String],
    },
  );

  let isNotText = "";

  if (this.isNot) {
    pass = !pass;
    isNotText = " not";
  }

  let message = "";

  if (!pass) {
    message = buildReportMessage(
      this.createHint("received"),
      "\n\n",
      `expected: ${chalk.green(this.formatValue(expected))}.\n`,
      `to${isNotText} include: ${chalk.red(this.formatValue(received))}`,
    );
  }

  return {
    pass,
    message,
  };
}
