import { EXPECT_RECEIVED_TAB_SPACE } from "../consts";

export function buildReportMessage(expect: string, received?: string) {
  let message = "\n";

  if (expect) {
    message += expect;
  }

  if (received) {
    message += received;
  }
  return addSpace(message);
}

function addSpace(value: string) {
  let newValue = "";

  const split = value.split("\n");

  for (const lineValue of split) {
    newValue += EXPECT_RECEIVED_TAB_SPACE + lineValue + "\n";
  }
  return newValue;
}
