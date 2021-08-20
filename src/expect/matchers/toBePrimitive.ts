import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage, isPrimitiveValue, typeOf } from "../../utils";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBePrimitive<T>(this: ITestProps, expected: T) {
  let pass = matcherUtils.match(
    () => isPrimitiveValue(expected),
    { expected },
    Number,
    String,
    BigInt,
    Boolean,
  );
  let isNotText = "";

  if (this.isNot) {
    pass = !pass;
    isNotText = " not";
  }

  return {
    pass,
    message: pass
      ? ""
      : buildReportMessage(
          `${this.expectedColorFn(
            "expected",
          )} should${isNotText} be primitive expected (${chalk.green(
            "string | bigint | number | boolean",
          )}).\n`,
          `got: ${chalk.red(typeOf(expected))}`,
        ),
  };
}
