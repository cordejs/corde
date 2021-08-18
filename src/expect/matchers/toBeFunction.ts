import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage, isFunction, typeOf } from "../../utils";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeFunction(props: ITestProps, value: any) {
  let pass = matcherUtils.match(() => isFunction(value), { value }, Function);
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
          `expect value to${isNotText} be a function.\n`,
          `received: '${chalk.red(typeOf(value))}'`,
        ),
  };
}
