import { ITestProps } from "../../types";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeLongerThan(this: ITestProps, expected: any, value: string) {
  let pass = matcherUtils.match(
    () => {
      if (typeof expected === "string" && typeof value === "string") {
        return expected.length > value.length;
      }
      return false;
    },
    {
      value: expected,
      validParameters: [String],
    },
    {
      value: value,
      validParameters: [String],
    },
  );
  let isNotText = "";

  if (this.isNot) {
    pass = !pass;
    isNotText = " not";
  }

  const message = matcherUtils.getFailMessageForStringsLengthTest({
    expectationText: "be longer than",
    expected,
    props: this,
    isNotText,
    value,
  });

  return {
    pass,
    message: pass ? "" : this.createHint("value") + "\n\n" + message,
  };
}
