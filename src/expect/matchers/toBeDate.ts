import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage, typeOf } from "../../utils";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeDate<T>(props: ITestProps, value: T) {
  let pass = matcherUtils.match(() => value instanceof Date, { value }, Date);
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
          `expect ${chalk.bold("value's")} type${isNotText} to be ${chalk.green("Date")}.\n`,
          `received: '${chalk.red(typeOf(value))}'`,
        ),
  };
}
