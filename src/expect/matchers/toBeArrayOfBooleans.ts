import chalk from "chalk";
import { ITestProps } from "../../types";
import { asymmetricTypeOf } from "../../utils/asymmetricTypeOf";
import { every } from "../../utils/every";
import { isBoolean } from "../../utils/isBoolean";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeArrayOfBooleans(this: ITestProps, expected: any) {
  let pass = matcherUtils.match(
    () => {
      if (!Array.isArray(expected)) {
        return false;
      }

      return every(expected, isBoolean);
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
          "array of booleans",
        )}.\n` +
        `got: ${chalk.red(asymmetricTypeOf(expected))}`,
  };
}
