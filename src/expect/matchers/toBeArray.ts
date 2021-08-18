import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage, typeOf } from "../../utils";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeArray<T>(props: ITestProps, value: T) {
  let pass = matcherUtils.match(() => Array.isArray(value), { value }, Array);
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
          `expect ${chalk.bold("value's")} type${isNotText} to be an ${chalk.green("Array")}.\n`,
          `received: '${chalk.red(typeOf(value))}'`,
        ),
  };
}
