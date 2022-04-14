import { Message } from "discord.js";
import { MessageCreate } from "../../../core/event";
import { Primitive } from "../../../types";
import { CommandState } from "../CommandState";
import { messageUtils } from "./messageUtils";

/**
 * Function to be injected globally.
 * **Do not use it directly**.
 *
 * @internal
 */
export async function respond(this: CommandState, expected: Primitive | corde.IMessageEmbed) {
  const errorReport = messageUtils.validateExpect(this, expected);

  if (errorReport) {
    return errorReport;
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

    return this.createFailedTest(
      "expected: testing bot to send a message\n",
      "received: no message was sent",
    );
  }

  this.hasPassed = messageUtils.isMessagesEquals(returnedMessage, expected);
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

  return messageUtils.createReportForExpectAndResponse(this, expected, returnedMessage);
}
