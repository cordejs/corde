import { Message } from "discord.js";
import { MessageCreate } from "../../../core/event";
import { diff } from "../../../utils/diff";
import { isPartialOf } from "../../../utils/isPartialOf";
import { keysOf } from "../../../utils/keysOf";
import { pick } from "../../../utils/pick";
import { typeOf } from "../../../utils/typeOf";
import { CommandState } from "../CommandState";
import { messageUtils } from "./messageUtils";

/**
 * Function to be injected globally.
 * **Do not use it directly**.
 *
 * @internal
 */
export async function matchEmbed(this: CommandState, embed: corde.IMessageEmbed) {
  if (typeOf(embed) !== "object") {
    return this.createFailedTest(
      "expected: parameter to be an object of type IMessageEmbed \n",
      `received: ${typeOf(embed)}`,
    );
  }

  const messageCreate = this.getEvent(MessageCreate);

  if (!messageCreate.canListen()) {
    return this.createMissingIntentError(
      "Client has no intent to listen to created messages",
      messageCreate.getIntents(),
    );
  }

  try {
    await this.sendCommandMessage();
  } catch (error) {
    return this.createFailedTest(error.message);
  }

  let returnedMessage: Message;
  try {
    returnedMessage = await messageCreate.once({
      author: { id: this.cordeBot.testBotId },
      channel: { id: this.channelId },
      timeout: this.timeout,
    });
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

  const formattedReturnedEmbed = messageUtils.messageEmbedToMessageEmbedInterface(
    returnedMessage.embeds[0],
  );

  this.hasPassed = isPartialOf<any>(embed, formattedReturnedEmbed);

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

  const partialReturned = pick(formattedReturnedEmbed, ...keysOf<corde.IMessageEmbed>(embed));
  return this.createFailedTest(diff<any>(embed, partialReturned));
}
