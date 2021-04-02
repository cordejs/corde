import { MessageIdentifier, TestReport } from "../../../types";
import { typeOf } from "../../../utils";
import { MessageExpectTest } from "./messageExpectTest";

/**
 * @internal
 */
export class ToUnPinMessage extends MessageExpectTest {
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
    const msgString = this.humanizeMessageIdentifierObject(_msgIdentifier);
    try {
      await this.cordeBot.events.onceMessageUnPinned(_msgIdentifier);
    } catch {
      if (this.isNot) {
        return { pass: true };
      }

      return this.createReport(
        `expected: unpin ${msgString}\n`,
        "received: informed message was not unpinned",
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
      "received: message pin = true",
    );
  }
}
