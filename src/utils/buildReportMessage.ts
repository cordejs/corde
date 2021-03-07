import { MESSAGE_TAB_SPACE } from "../consts";

export function buildReportMessage(expect: string, received: string, isNot?: boolean) {
  let message = "\n";

  if (expect) {
    if (isNot) {
      message += MESSAGE_TAB_SPACE + "not " + expect + "\n";
    } else {
      message += MESSAGE_TAB_SPACE + expect + "\n";
    }
  }

  if (received) {
    message += MESSAGE_TAB_SPACE + received + "\n";
  }
  return message;
}
