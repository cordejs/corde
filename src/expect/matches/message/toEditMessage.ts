import { Message, MessageEmbed, PartialMessage } from "discord.js";
import {
  MessageEditedIdentifier,
  MessageEmbedLike,
  MinifiedEmbedMessage,
  Primitive,
  TestReport,
} from "../../../types";
import { diff, formatObject, isPrimitiveValue, typeOf } from "../../../utils";
import { ExpectTest } from "../expectTest";
import messageUtils from "../../messageUtils";

/**
 * @internal
 */
export class ToEditMessage extends ExpectTest {
  async action(
    newValue: Primitive | MessageEmbedLike,
    messageIdentifier?: MessageEditedIdentifier | string,
  ): Promise<TestReport> {
    let _expect: Primitive | MessageEmbed;

    if (!isPrimitiveValue(newValue) && typeOf(newValue) !== "object") {
      return this.createReport(
        `expected: expect value to be a primitive value (string, boolean, number) or an MessageEmbedLike object\n`,
        `received: ${typeOf(newValue)}`,
      );
    }

    await this.cordeBot.sendTextMessage(this.command);

    let _messageData: MessageEditedIdentifier;

    if (typeof messageIdentifier === "string") {
      _messageData = { id: messageIdentifier };
    } else {
      _messageData = messageIdentifier;
    }

    let returnedMessage: Message | PartialMessage;

    try {
      returnedMessage = await this.cordeBot.events.onceMessageContentOrEmbedChange(
        _messageData,
        this.timeOut,
      );
    } catch {
      if (this.isNot) {
        return { pass: true };
      }

      if (!_messageData) {
        return this.createReport(
          `expected: testing bot to edit the last message sent\n`,
          `received: message was not edited`,
        );
      }

      return this.createReport(
        `expected: testing bot to edit the ${messageUtils.humanizeMessageIdentifierObject(
          _messageData,
        )}\n`,
        `received: message was not edited`,
      );
    }

    if (typeOf(newValue) === "object") {
      _expect = messageUtils.embedMessageLikeToMessageEmbed(newValue as MessageEmbedLike);
    } else {
      _expect = newValue as Primitive;
    }

    this.hasPassed = messageUtils.messagesMatches(returnedMessage, _expect);
    this.invertHasPassedIfIsNot();

    if (this.hasPassed) {
      return { pass: true };
    }

    if (this.isNot) {
      return this.createReport(
        `expected: message from bot be different from expectation\n`,
        `received: both returned and expectation are equal`,
      );
    }

    let embedExpect: MinifiedEmbedMessage;
    if (typeOf(_expect) === "object") {
      embedExpect = messageUtils.getMessageByType(
        _expect as MessageEmbed,
        "embed",
      ) as MinifiedEmbedMessage;
    }

    let embedReturned: MinifiedEmbedMessage;
    if (returnedMessage.embeds[0]) {
      embedReturned = messageUtils.getMessageByType(
        returnedMessage,
        "embed",
      ) as MinifiedEmbedMessage;
    }

    if (embedExpect && embedReturned) {
      return this.createReport(diff(embedReturned, embedExpect));
    }

    if (embedExpect && !embedReturned) {
      return this.createReport(
        `expected: ${formatObject(embedExpect)}\n`,
        `received: '${returnedMessage.content}'`,
      );
    }

    if (!embedExpect && embedReturned) {
      return this.createReport(
        `expected: '${_expect}'\n`,
        `received: ${formatObject(embedReturned)}`,
      );
    }

    return this.createReport(`expected: '${_expect}'\n`, `received: '${returnedMessage.content}'`);
  }
}
