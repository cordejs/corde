import { Message, MessageReaction } from "discord.js";
import { TestReport } from "../../interfaces/testReport";
import { CordeBot } from "../../../core";
import { MessageData } from "../../../types";
import Utils from "../../../utils/utils";

export async function toRemoveReaction(
  commandName: string,
  isNot: boolean,
  cordeBot: CordeBot,
  removedReactions: string[],
  messageData?: MessageData,
): Promise<TestReport> {
  let expectation = "";
  let output = "";
  let testSuccessfully = false;

  expectation = removedReactions.join();

  try {
    await cordeBot.sendTextMessage(commandName);
    await Utils.wait(Utils.delayValue);
    const message = await cordeBot.findMessage(messageData);
    if (message) {
      const reactions = await cordeBot.waitForRemovedReactions(message, removedReactions.length);
      testSuccessfully = reactionsExistsIn(reactions, removedReactions);
      output = reactions.map((v) => v.emoji.name).join();
    }

    if (isNot) {
      testSuccessfully = !testSuccessfully;
    }
  } catch (error) {
    testSuccessfully = false;
    if (error instanceof Error) {
      output = error.message;
    } else {
      output = error;
    }
  }

  return new TestReport({
    commandName,
    expectation,
    output,
    hasPassed: testSuccessfully,
    isNot,
    showExpectAndOutputValue: false,
  });
}

function reactionsExistsIn(reactions: MessageReaction[], expectation: string[]) {
  for (const expect of expectation) {
    if (!reactions.find((r) => r.emoji.name === expect)) {
      return false;
    }
  }
  return true;
}
