import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage, isPrimitiveValue, typeOf } from "../../utils";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBePrimitive<T>(props: ITestProps, value: T) {
  let pass = matcherUtils.match(
    () => isPrimitiveValue(value),
    { value },
    Number,
    String,
    BigInt,
    Boolean,
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
          `expect ${chalk.bold(
            "value's",
          )} type${isNotText} to be primitive(Number | String | Boolean | BigInt).\n`,
          `received: '${chalk.red(typeOf(value))}'`,
        ),
  };
}
