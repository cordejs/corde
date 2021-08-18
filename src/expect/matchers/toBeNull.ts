import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage, typeOf } from "../../utils";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeNull(props: ITestProps, value: any) {
  let pass = !matcherUtils.isAsymetric(value) && value === null;
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
          `expect value to${isNotText} be ${chalk.bold("null")}.\n`,
          `received: '${typeOf(value)}'`,
        ),
  };
}
