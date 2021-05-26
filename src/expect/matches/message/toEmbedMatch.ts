import { Message } from "discord.js";
import { IMessageEmbed, ITestReport } from "../../../types";
import { IExpectTestBaseParams } from "../../../types";
import { diff, isPartialOf } from "../../../utils";
import { MessageExpectTest } from "./messageExpectTest";

/**
 * @internal
 */
export class ToEmbedMatch extends MessageExpectTest {
  constructor(params: IExpectTestBaseParams) {
    super({ ...params, testName: "toEmbedMatch" });
  }

  async action(embed: IMessageEmbed): Promise<ITestReport> {
    if (!embed) {
      return this.createFailedTest("expected embed message can not be null or undefined");
    }

    try {
      await this.sendCommandMessage();
    } catch (error) {
      return this.createFailedTest(error.message);
    }

    let returnedMessage: Message;
    try {
      returnedMessage = await this.cordeBot.events.onceMessage(
        this.cordeBot.testBotId,
        this.channelId,
        this.timeOut,
      );
    } catch {
      if (this.isNot) {
        return this.createPassTest();
      }

      return this.createReport(
        "expected: testing bot to send a message\n",
        "received: no message was sent",
      );
    }

    if (!returnedMessage.embeds || !returnedMessage.embeds[0]) {
      return this.createFailedTest("returned message has no embed message");
    }
    const formatedReturnedEmbed = this.getMessageByType(returnedMessage, "embed");
    this.hasPassed = isPartialOf<any>(embed, formatedReturnedEmbed);
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

    return this.createFailedTest(diff<any>(embed, formatedReturnedEmbed));
  }
}
