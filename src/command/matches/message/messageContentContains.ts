import { Message } from "discord.js";
import { CommandState } from "../CommandState";

/**
 * Function to be injected globally.
 * **Do not use it directly**.
 *
 * @internal
 */
export async function messageContentContains(this: CommandState, expect: string) {
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
    returnedMessage = await this.cordeBot.events.onceMessageCreate({
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
