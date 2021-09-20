import { IMessageIdentifier } from "../../../types";
import { typeOf } from "../../../utils";
import { ICommandMatcherProps } from "../../types";
import { messageUtils } from "./messageUtils";

/**
 * @internal
 */
export async function shouldUnPin(
  this: ICommandMatcherProps,
  messageIdentifier: IMessageIdentifier | string,
) {
  if (
    !messageIdentifier ||
    (typeOf(messageIdentifier) !== "string" && typeOf(messageIdentifier) !== "object")
  ) {
    return this.createReport(
      "expected: message identifier to be a string or a IMessageIdentifier object\n",
      `received: ${typeOf(messageIdentifier)}`,
    );
  }

  let _msgIdentifier: IMessageIdentifier;

  if (typeof messageIdentifier === "string") {
    _msgIdentifier = { id: messageIdentifier };
  } else {
    _msgIdentifier = messageIdentifier;
  }

  try {
    await this.sendCommandMessage();
  } catch (error) {
    return this.createFailedTest(error.message);
  }

  const msgString = messageUtils.humanizeMessageIdentifierObject(_msgIdentifier);
  try {
    await this.cordeBot.events.onceMessageUnPinned(_msgIdentifier, this.timeout, this.channelId);
  } catch {
    if (this.isNot) {
      return this.createPassTest();
    }

    return this.createReport(
      `expected: unpin ${msgString}\n`,
      "received: informed message was not unpinned",
    );
  }

  // ITest has passed due to event validation
  this.hasPassed = true;

  this.invertHasPassedIfIsNot();

  if (this.hasPassed) {
    return this.createPassTest();
  }

  return this.createReport(
    `expected: to ${this.isNot ? "not " : ""}unpin ${msgString}\n`,
    "received: message pin = true",
  );
}
