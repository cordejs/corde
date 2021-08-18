import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage, typeOf } from "../../utils";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeDefined<T>(props: ITestProps, value: T) {
  let pass = matcherUtils.match(() => value !== undefined && value !== null, { value });
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
          `expect ${chalk.bold("value")} to${isNotText} have a defined value. (${
            props.isNot ? "equal to" : "different than"
          } ${chalk.bold("undefined")} or ${chalk.bold("null")}).\n`,
          `received: '${chalk.red(typeOf(value))}'`,
        ),
  };
}
