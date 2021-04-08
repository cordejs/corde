import { Message, MessageEmbed } from "discord.js";
import { MessageEmbedLike, Primitive, TestReport } from "../../../types";

import { typeOf } from "../../../utils";
import { ExpectTestBaseParams } from "../../types";
import { MessageExpectTest } from "./messageExpectTest";

/**
 * @internal
 */
export class ToReturnInChannel extends MessageExpectTest {
  constructor(params: ExpectTestBaseParams) {
    super({ ...params, testName: "toReturnInChannel" });
  }

  async action(expect: Primitive | MessageEmbedLike, channelId: string): Promise<TestReport> {
    this.expectation = expect;

    const errorReport = this.validateExpect(expect);

    if (errorReport) {
      return errorReport;
    }

    if (!channelId) {
      return this.createReport(
        "expected: channel to be a string with the channel id or an object with its id\n",
        `
        received: ${typeOf(channelId)}`,
      );
    }

    await this.sendCommandMessage();
    let returnedMessage: Message;
    try {
      returnedMessage = await this.cordeBot.events.onceMessage(
        this.cordeBot.testBotId,
        channelId,
        this.timeOut,
      );
    } catch {
      if (this.isNot) {
        return this.createPassTest();
      }

      return this.createReport(
        `expected: testing bot to send a message in channel ${channelId}\n`,
        "received: no message was sent in the specified channel",
      );
    }

    let _expect: Primitive | MessageEmbed;

    if (typeOf(expect) === "object") {
      _expect = this.embedMessageLikeToMessageEmbed(expect as MessageEmbedLike);
    } else {
      _expect = expect as Primitive;
    }

    this.hasPassed = this.messagesMatches(returnedMessage, _expect);
    this.invertHasPassedIfIsNot();

    if (this.hasPassed) {
      return this.createPassTest();
    }

    if (this.isNot) {
      return this.createReport(
        "expected: message from bot be different from expectation\n",
        "received: both returned and expectation are equal",
      );
    }

    return this.createReportForExpectAndResponse(_expect, returnedMessage);
  }
}
