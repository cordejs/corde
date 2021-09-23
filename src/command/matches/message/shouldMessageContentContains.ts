import { Message } from "discord.js";
import { CommandState } from "../commandstate";

/**
 * @internal
 */
export async function shouldMessageContentContains(this: CommandState, expect: string) {
  if (!expect || expect.trim() === "") {
    return this.createFailedTest("expected content can not be null or empty");
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

  this.hasPassed = returnedMessage.content.includes(expect);

  this.invertHasPassedIfIsNot();

  if (this.hasPassed) {
    return this.createPassTest();
  }

  if (this.isNot) {
    return this.createReport(
      `expected: message '${returnedMessage.content}' from bot to not inclues '${expect}'`,
    );
  }

  return this.createFailedTest(`expected '${returnedMessage.content}' to contains '${expect}'`);
}
