import { EXPECT_RECEIVED_TAB_SPACE } from "../consts";

/**
 * @internal
 */
export function buildReportMessage(...messages: (string | undefined | null)[]) {
  let message = "\n";
  for (let i = 0; i < messages.length; i++) {
    if (messages[i]) {
      message += messages[i];
    }
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
