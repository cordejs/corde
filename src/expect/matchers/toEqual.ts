import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage, deepEqual, diff, typeOf } from "../../utils";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toEqual(this: ITestProps, expected: any, received: any) {
  let pass = matcherUtils.matchValues(
    () => {
      if (typeof expected === "object" && typeof received === "object") {
        // Compare two objects using deep equal, if some prop in the object is asymetric,
        // use a custom and recursive comparable function.
        return deepEqual(expected, received, (prop1, prop2) => {
          return matcherUtils.matchValues(() => deepEqual(prop1, prop2), prop1, prop2);
        });
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
      : buildReportMessage(
          `Tip: toEqual asserts the value of properties. To compare their identity use ${chalk.bold(
            "toBe",
          )}\n\n`,
          this.createHint("received"),
          "\n\n",
          `${_getReportMessage()}`,
        ),
  };
}
