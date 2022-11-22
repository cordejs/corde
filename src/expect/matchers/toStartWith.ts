import { ITestProps } from "../../types";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toStartWith(this: ITestProps, expected: any, value: string) {
  let pass = matcherUtils.match(
    () => typeof expected === "string" && expected.startsWith(value),
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
    expectationText: "start with",
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
