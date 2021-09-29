import { Message } from "discord.js";
import { Primitive } from "../../../types";
import { CommandState } from "../commandstate";
import { messageUtils } from "./messageUtils";

/**
 * @internal
 */
export async function shouldReturn(this: CommandState, expected: Primitive | corde.IMessageEmbed) {
  const errorReport = messageUtils.validateExpect(this, expected);

  if (errorReport) {
    return errorReport;
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
