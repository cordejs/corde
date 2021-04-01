import { MessageIdentifier, TestReport } from "../../../types";
import { typeOf } from "../../../utils";
import messageUtils from "../../messageUtils";
import { ExpectTest } from "../expectTest";

/**
 * @internal
 */
export class ToPinMessage extends ExpectTest {
  async action(messageIdentifier: MessageIdentifier | string): Promise<TestReport> {
    if (
      !messageIdentifier ||
      (typeOf(messageIdentifier) !== "string" && typeOf(messageIdentifier) !== "object")
    ) {
      return this.createReport(
        "expected: message identifier to be a string or a MessageIdentifier object\n",
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
    const msgString = messageUtils.humanizeMessageIdentifierObject(_msgIdentifier);
    try {
      await this.cordeBot.events.onceMessagePinned(_msgIdentifier);
    } catch {
      if (this.isNot) {
        return { pass: true };
      }

      return this.createReport(
        `expected: pin ${msgString}\n`,
        "received: informed message was not pinned",
      );
    }

    // Test has passed due to event validation
    this.hasPassed = true;

    this.invertHasPassedIfIsNot();

    if (this.hasPassed) {
      return { pass: true };
    }

    return this.createReport(
      `expected: to ${this.isNot ? "not " : ""}pin ${msgString}\n`,
      "received: message pin = false",
    );
  }
}
