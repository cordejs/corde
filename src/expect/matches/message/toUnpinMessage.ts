import { Message, PartialMessage } from "discord.js";
import { MessageIdentifier, TestReport } from "../../../types";
import { typeOf } from "../../../utils";
import messageUtils from "../../messageUtils";
import { ExpectTest } from "../expectTest";

export class ToUnPinMessage extends ExpectTest {
  public async action(messageIdentifier: MessageIdentifier | string): Promise<TestReport> {
    if (
      !messageIdentifier ||
      (typeOf(messageIdentifier) !== "string" && typeOf(messageIdentifier) !== "object")
    ) {
      return this.createReport(
        `expected: message identifier to be a string or a MessageIdentifier object\n`,
        `received: ${typeOf(messageIdentifier)}`,
      );
    }

    let _msgIdentifier: MessageIdentifier;

    if (typeof messageIdentifier === "string") {
      _msgIdentifier = { id: messageIdentifier };
    } else {
      _msgIdentifier = messageIdentifier;
    }

    await this.cordeBot.sendTextMessage(this.command);
    let msgString = messageUtils.humanizeMessageIdentifierObject(_msgIdentifier);
    let message: Message | PartialMessage;
    try {
      message = await this.cordeBot.events.onceMessageUnPinned(_msgIdentifier);
    } catch {
      if (this.isNot) {
        return { pass: true };
      }

      return this.createReport(
        `expected: unpin ${msgString}\n`,
        `received: informed message was not unpinned`,
      );
    }

    // Test has passed due to event validation
    this.hasPassed = true;

    this.invertHasPassedIfIsNot();

    if (this.hasPassed) {
      return { pass: true };
    }

    return this.createReport(
      `expected: to ${this.isNot ? "not " : ""}unpin ${msgString}\n`,
      `received: message pin = true`,
    );
  }
}
