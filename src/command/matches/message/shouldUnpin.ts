import { typeOf } from "../../../utils";
import { CommandState } from "../commandstate";
import { messageUtils } from "./messageUtils";

/**
 * @internal
 */
export async function shouldUnPin(
  this: CommandState,
  messageIdentifier: corde.IMessageIdentifier | string,
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

  let _msgIdentifier: corde.IMessageIdentifier;

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
    await this.cordeBot.events.onceMessageUnPinned({
      messageIdentifier: _msgIdentifier,
      timeout: this.timeout,
      channelId: this.channelId,
    });
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
