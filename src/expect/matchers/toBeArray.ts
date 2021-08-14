import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage, typeOf } from "../../utils";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeArray<T>(props: ITestProps, expected: T) {
  let pass = matcherUtils.match(() => Array.isArray(expected), expected, Array);
  let isNotText = "";

  if (props.isNot) {
    pass = !pass;
    isNotText = " not";
  }

  return {
    pass,
    message: pass
      ? ""
      : buildReportMessage(
          `expected type${isNotText} to be an ${chalk.green("Array")}.\n`,
          `received: '${chalk.red(typeOf(expected))}'`,
        ),
  };
}
