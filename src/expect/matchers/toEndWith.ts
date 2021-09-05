import { ITestProps } from "../../types";
import { buildReportMessage, isString } from "../../utils";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toEndWith(this: ITestProps, expected: any, value: string) {
  let pass = matcherUtils.match(
    () => isString(expected) && expected.endsWith(value),
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

  let message = matcherUtils.getFailMessageForStringsLengthTest({
    expectationText: "end with",
    expected,
    props: this,
    isNotText,
    value,
  });

  return {
    pass,
    message: pass ? "" : buildReportMessage(this.createHint("value"), "\n\n", message),
  };
}
