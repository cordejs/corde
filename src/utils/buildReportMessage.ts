import { MESSAGE_TAB_SPACE } from "../consts";

export function buildReportMessage(...messageLines: string[]) {
  let message = "\n";
  for (const messageLine of messageLines || []) {
    message += MESSAGE_TAB_SPACE + messageLine + "\n";
  }
  return message;
}
