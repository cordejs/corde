import chalk from "chalk";
import { ITestProps } from "../../types";
import { buildReportMessage } from "../../utils/buildReportMessage";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeInstanceOf(this: ITestProps, expected: any, instanceType: any) {
  const testFn = () => {
    if (matcherUtils.isAsymmetric(expected) && matcherUtils.isAsymmetric(instanceType)) {
      return expected.matchType(...instanceType.getTypes());
    }

    if (matcherUtils.isAsymmetric(expected)) {
      return expected.matchType(instanceType);
    }

    if (matcherUtils.isAsymmetric(instanceType)) {
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

  const instanceTypeName = matcherUtils.isAsymmetric(instanceType)
    ? instanceType.toString()
    : instanceType.name;

  const expectedTypeName = matcherUtils.isAsymmetric(expected)
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
