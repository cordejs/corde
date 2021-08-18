import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage, typeOf } from "../../utils";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeUndefined(props: ITestProps, value: any) {
  let pass = !matcherUtils.isAsymetric(value) && value === undefined;
  let isNotText = " not";

  if (props.isNot) {
    pass = !pass;
    isNotText = "";
  }

  return {
    pass,
    message: pass
      ? ""
      : buildReportMessage(
          `expect value to${isNotText} be ${chalk.bold("undefined")}.\n`,
          `received: '${typeOf(value)}'`,
        ),
  };
}
