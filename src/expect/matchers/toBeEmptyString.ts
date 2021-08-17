import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage, isString, typeOf } from "../../utils";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeEmptyString(props: ITestProps, expected: any) {
  let pass = matcherUtils.match(
    () => isString(expected) && expected.length === 0,
    { expected },
    String,
  );
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
          `expect value to${isNotText} be a empty string.\n`,
          `received: '${chalk.red(typeOf(expected))}'`,
        ),
  };
}
