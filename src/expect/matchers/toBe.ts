import chalk from "chalk";
import { diff } from "jest-diff";
import { ITestProps } from "../../types";
import { typeOf } from "../../utils/typeOf";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBe(this: ITestProps, expected: any, received: any) {
  let pass = matcherUtils.matchValues(() => expected === received, expected, received);

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
      : `Tip: toBe asserts identity of values. To compare only values use ${chalk.bold(
          "toEqual",
        )}\n` +
        this.createHint("received") +
        "\n" +
        `${_getReportMessage()}`,
  };
}
