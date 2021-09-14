import { Message } from "discord.js";
import { IMessageEmbed } from "../../../types";
import { diff, isPartialOf, keysOf, pick, typeOf } from "../../../utils";
import { ICommandMatcherProps } from "../../types";
import { messageCommandUtils } from "./messageCommandUtils";

/**
 * @internal
 */
export async function shouldEmbedMatch(this: ICommandMatcherProps, embed: IMessageEmbed) {
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
      this.timeout,
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

  const formatedReturnedEmbed = messageCommandUtils.messageEmbedToMessageEmbedInterface(
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
