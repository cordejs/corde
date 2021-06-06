import { Message } from "discord.js";
import { IMessageEmbed, ITestReport } from "../../../types";
import { IExpectTestBaseParams } from "../../../types";
import { diff, isPartialOf, keysOf, pick, typeOf } from "../../../utils";
import { MessageExpectTest } from "./messageExpectTest";

/**
 * @internal
 */
export class ToEmbedMatch extends MessageExpectTest {
  constructor(params: IExpectTestBaseParams) {
    super({ ...params, testName: "toEmbedMatch" });
  }

  async action(embed: IMessageEmbed): Promise<ITestReport> {
    if (typeOf(embed) !== "object") {
      return this.createFailedTest(
        "expected: parameter to be an object of type IMesageEmbed \n",
        `received: ${typeOf(embed)}`,
      );
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

    const formatedReturnedEmbed = this.messageEmbedToMessageEmbedInterface(
      returnedMessage.embeds[0],
    );

    this.hasPassed = isPartialOf<any>(embed, formatedReturnedEmbed);

    this.invertHasPassedIfIsNot();

    if (this.hasPassed) {
      return this.createPassTest();
    }

    if (this.isNot) {
      return this.createReport(
        "expected: embed message from bot do not match with expectation\n",
        "received: both returned and expectation embed messages matches",
      );
    }

    const partialReturned = pick(formatedReturnedEmbed, ...keysOf<IMessageEmbed>(embed));
    return this.createFailedTest(diff<any>(embed, partialReturned));
  }
}
