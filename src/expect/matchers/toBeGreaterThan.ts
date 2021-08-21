import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage } from "../../utils";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeGreaterThan(this: ITestProps, expected: any, received: number | bigint) {
  const failedTest = matcherUtils.validateParameterAsNumber(expected, received);
  if (failedTest) {
    return failedTest;
  }

  let pass = matcherUtils.match(
    () => expected > received,
    { value: expected, validParameters: [Number] },
    { value: received, validParameters: [Number] },
  );
  let comparator = ">";

  if (this.isNot) {
    pass = !pass;
    comparator = "<=";
  }

  return {
    pass,
    message: pass
      ? ""
      : buildReportMessage(
          this.createHint("received"),
          "\n\n",
          `expect(${chalk.green("expected")}).toBeGreaterThan(${chalk.red("received")})\n`,
          `expect: ${expected} ${comparator} ${received}.\n`,
        ),
  };
}
