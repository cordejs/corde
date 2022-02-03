import { ITestProps } from "../../types";
import { buildReportMessage } from "../../utils/buildReportMessage";
import { isString } from "../../utils/isString";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeSameLengthAs(this: ITestProps, expected: any, value: string) {
  let pass = matcherUtils.match(
    () => {
      if (isString(expected) && isString(value)) {
        return expected.length === value.length;
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
    expectationText: "have same length of",
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
