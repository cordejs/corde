import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage, typeOf } from "../../utils";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeBoolean<T>(props: ITestProps, value: T) {
  let pass = matcherUtils.match(() => typeof value === "boolean", { value }, Boolean);
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
          `expect ${chalk.bold("value's")} type${isNotText} to be ${chalk.green("Boolean")}.\n`,
          `received: '${chalk.red(typeOf(value))}'`,
        ),
  };
}
