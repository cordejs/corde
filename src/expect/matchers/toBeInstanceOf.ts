import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage } from "../../utils";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeInstanceOf(this: ITestProps, expected: any, instanceType: any) {
  const testFn = () => {
    if (matcherUtils.isAsymetric(expected) && matcherUtils.isAsymetric(instanceType)) {
      return expected.matchType(...instanceType.getTypes());
    }

    if (matcherUtils.isAsymetric(expected)) {
      return expected.matchType(instanceType);
    }

    if (matcherUtils.isAsymetric(instanceType)) {
      return instanceType.matchType(expected.constructor);
    }

    return expected instanceof instanceType;
  };

  let pass = testFn();

  let isNotText = "";

  if (this.isNot) {
    pass = !pass;
    isNotText = " not";
  }

  const instanceTypeName = matcherUtils.isAsymetric(instanceType)
    ? instanceType.toString()
    : instanceType.name;

  const expectedTypeName = matcherUtils.isAsymetric(expected)
    ? expected.toString()
    : expected.constructor.name;

  return {
    pass,
    message: pass
      ? ""
      : buildReportMessage(
          this.createHint("instanceType"),
          "\n\n",
          `${this.expectedColorFn("expected")} should${isNotText} be instance of ${chalk.green(
            instanceTypeName,
          )}.\n`,
          `got: ${chalk.red(expectedTypeName)}`,
        ),
  };
}
