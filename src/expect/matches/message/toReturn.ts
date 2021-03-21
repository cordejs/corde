import { Message, MessageEmbed } from "discord.js";
import { MessageEmbedLike, MinifiedEmbedMessage, Primitive, TestReport } from "../../../types";

/**
 * For some reason, importing "isPrimitiveValue" from
 * "../../../utils" results in error in jest tests.
 */
import { isPrimitiveValue } from "../../../utils/isPrimitiveValue";
import { ExpectTest } from "../expectTest";

import messageUtils from "../../messageUtils";
import { diff, formatObject, typeOf } from "../../../utils";

export class ToReturn extends ExpectTest {
  public async action(expect: Primitive | MessageEmbedLike): Promise<TestReport> {
    let _expect: Primitive | MessageEmbed;
    this.expectation = expect;
    if (!isPrimitiveValue(expect) && typeOf(expect) !== "object") {
      return this.createReport(
        `expected: expect value to be a primitive value (string, boolean, number) or an MessageEmbedLike\n`,
        `received: ${typeOf(expect)}`,
      );
    }

    await this.cordeBot.sendTextMessage(this.command);
    let returnedMessage: Message;
    try {
      returnedMessage = await this.cordeBot.awaitMessagesFromTestingBot(this.timeOut);
    } catch {
      if (this.isNot) {
        return { pass: true };
      }

      return this.createReport(
        `expected: testing bot to send a message\n`,
        `received: no message was sent`,
      );
    }

    if (typeOf(expect) === "object") {
      _expect = messageUtils.embedMessageLikeToMessageEmbed(expect as MessageEmbedLike);
    } else {
      _expect = expect as Primitive;
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
        `expected: '${expect}'\n`,
        `received: ${formatObject(embedReturned)}`,
      );
    }

    return this.createReport(`expected: '${expect}'\n`, `received: '${returnedMessage.content}'`);
  }
}
