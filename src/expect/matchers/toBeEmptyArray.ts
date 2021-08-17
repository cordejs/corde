import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage, typeOf } from "../../utils";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeEmptyArray(props: ITestProps, expected: any) {
  let pass = matcherUtils.match(
    () => Array.isArray(expected) && expected.length === 0,
    { expected },
    Array,
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
          `expect value to${isNotText} be a empty array.\n`,
          `received: '${chalk.red(typeOf(expected))}'`,
        ),
  };
}
