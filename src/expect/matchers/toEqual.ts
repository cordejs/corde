import chalk from "chalk";
import { diff } from "jest-diff";
import { ITestProps } from "../../types";
import { deepEqual } from "../../utils/deepEqual";
import { typeOf } from "../../utils/typeOf";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toEqual(this: ITestProps, expected: any, received: any) {
  let pass = matcherUtils.matchValues(
    () => {
      if (typeof expected === "object" && typeof received === "object") {
        // Compare two objects using deep equal, if some prop in the object is asymmetric,
        // use a custom and recursive comparable function.
        return deepEqual(expected, received);
      }

      return expected === received;
    },
    expected,
    received,
  );

  let comparator = "===";

  if (this.isNot) {
    pass = !pass;
    comparator = "!==";
  }

  const _getReportMessage = () => {
    if (typeOf(expected) === "object" && typeOf(received) === "object") {
      return diff(expected, received);
    }

    const expectedFormatted = this.formatValue(expected);
    const receivedFormatted = this.formatValue(received);

    return `expect: ${chalk.green(expectedFormatted)} ${comparator} ${chalk.red(
      receivedFormatted,
    )}`;
  };

  return {
    pass,
    message: pass
      ? ""
      : `Tip: toEqual asserts the value of properties. To compare their identity use ${chalk.bold(
          "toBe",
        )}\n\n` +
        this.createHint("received") +
        "\n\n" +
        `${_getReportMessage()}`,
  };
}
