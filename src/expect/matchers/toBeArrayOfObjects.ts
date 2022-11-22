import chalk from "chalk";
import { ITestProps } from "../../types";
import { asymmetricTypeOf } from "../../utils/asymmetricTypeOf";
import { every } from "../../utils/every";
import { isObject } from "../../utils/isObject";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeArrayOfObjects(this: ITestProps, expected: any) {
  let pass = matcherUtils.match(
    () => {
      if (!Array.isArray(expected)) {
        return false;
      }

      return every(expected, isObject);
    },
    {
      value: expected,
      validParameters: [Array],
    },
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
      : this.createHint() +
        "\n" +
        `${this.expectedColorFn("expected")} should${isNotText} be an ${chalk.green(
          "array of objects",
        )}.\n` +
        `got: ${chalk.red(asymmetricTypeOf(expected))}`,
  };
}
