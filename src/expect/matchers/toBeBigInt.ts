import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage, typeOf } from "../../utils";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeBigint<T>(props: ITestProps, expected: T) {
  let pass = matcherUtils.match(() => typeof expected === "bigint", { expected }, BigInt);
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
          `expect ${chalk.bold("value's")} type${isNotText} to be ${chalk.green("Bigint")}.\n`,
          `received: '${chalk.red(typeOf(expected))}'`,
        ),
  };
}
