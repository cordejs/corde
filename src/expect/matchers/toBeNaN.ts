import { ITestProps } from "../../types";
import { buildReportMessage } from "../../utils";
import { matcherUtils } from "../matcherUtils";

/**
 * @internal
 */
export function toBeNaN(props: ITestProps, value: any) {
  let pass = matcherUtils.match(
    () => {
      try {
        return isNaN(value);
      } catch {
        return false;
      }
    },
    { value },
  );
  let isNotText = " not";

  if (props.isNot) {
    pass = !pass;
    isNotText = "";
  }

  return {
    pass,
    message: pass ? "" : buildReportMessage(`expect value to${isNotText} be NaN`),
  };
}
