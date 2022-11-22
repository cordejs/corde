import { ITestProps } from "../../types";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeLessOrEqualThan(this: ITestProps, expected: any, received: number | bigint) {
  const failedTest = matcherUtils.validateParameterAsNumber(expected, received);
  if (failedTest) {
    return failedTest;
  }

  let pass = matcherUtils.match(
    () => expected <= received,
    { value: expected, validParameters: [Number] },
    { value: received, validParameters: [Number] },
  );
  let comparator = "<=";

  if (this.isNot) {
    pass = !pass;
    comparator = ">";
  }

  return {
    pass,
    message: pass
      ? ""
      : this.createHint("received") + "\n\n" + `expect: ${expected} ${comparator} ${received}.\n`,
  };
}
