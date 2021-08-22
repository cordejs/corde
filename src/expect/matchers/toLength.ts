import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage, asymetricTypeOf } from "../../utils";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toLength(this: ITestProps, expected: any, length: number) {
  let invalidParam = null;

  if (
    !matcherUtils.isAsymetric(expected) &&
    !Array.isArray(expected) &&
    typeof expected !== "string"
  ) {
    invalidParam = {
      name: "expected",
      value: expected,
      shouldBeText: `${chalk.green("string")} or ${chalk.green("array")} to measure it's length.`,
    };
  }

  if (
    !matcherUtils.isAsymetric(length) &&
    typeof length !== "number" &&
    typeof length !== "bigint"
  ) {
    invalidParam = {
      name: "length",
      value: length,
      shouldBeText: `${chalk.green("number")}.`,
    };
  }

  if (invalidParam) {
    return {
      pass: false,
      message: buildReportMessage(
        `${this.expectedColorFn(invalidParam.name)} should be a ${invalidParam.shouldBeText}\n`,
        `got: ${chalk.red(asymetricTypeOf(invalidParam.value))}`,
      ),
    };
  }

  let pass = matcherUtils.match(
    () => (expected as string).length === length,
    { value: expected, validParameters: [String, Array] },
    { value: length, validParameters: [Number] },
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
          this.createHint("length"),
          "\n\n",
          `${this.expectedColorFn("expected")} should${isNotText} length: ${length}.\n`,
          `got: ${chalk.red((expected as string).length)}`,
        ),
  };
}
