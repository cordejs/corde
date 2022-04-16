import { MessagePinned } from "../../../core/event";
import { isNullOrUndefined } from "../../../utils/isNullOrUndefined";
import { isObject } from "../../../utils/isObject";
import { isString } from "../../../utils/isString";
import { typeOf } from "../../../utils/typeOf";
import { CommandState } from "../CommandState";
import { messageUtils } from "./messageUtils";

/**
 * Function to be injected globally.
 * **Do not use it directly**.
 *
 * @internal
 */
export async function pinMessage(
  this: CommandState,
  messageIdentifier: corde.IMessageIdentifier | string,
) {
  if (
    isNullOrUndefined(messageIdentifier) ||
    (!isString(messageIdentifier) && !isObject(messageIdentifier))
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

  const pinMessage = this.getEvent(MessagePinned);

  if (!pinMessage.canListen()) {
    return this.createMissingIntentError(
      "Client has no intent to listen to pinned messages",
      pinMessage.getIntents(),
    );
  }

  try {
    await this.sendCommandMessage();
  } catch (error) {
    return this.createFailedTest(error.message);
  }

  const msgString = messageUtils.humanizeMessageIdentifierObject(_msgIdentifier);
  try {
    await pinMessage.once({
      message: _msgIdentifier,
      timeout: this.timeout,
      channel: { id: this.channelId },
    });
  } catch {
    if (this.isNot) {
      return this.createPassTest();
    }

    return this.createReport(
      `expected: pin ${msgString}\n`,
      "received: informed message was not pinned",
    );
  }

  // ITest has passed due to event validation
  this.hasPassed = true;

  this.invertHasPassedIfIsNot();

  if (this.hasPassed) {
    return this.createPassTest();
  }

  return this.createReport(
    `expected: to ${this.isNot ? "not " : ""}pin ${msgString}\n`,
    "received: message pin = false",
  );
}
