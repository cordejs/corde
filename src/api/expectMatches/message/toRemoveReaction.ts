import { Message, MessageReaction } from "discord.js";
import { TestReport } from "../../interfaces/testReport";
import { CordeBot } from "../../../core";
import { MessageData } from "../../../types";

export async function toRemoveReaction(
  commandName: string,
  isNot: boolean,
  cordeBot: CordeBot,
  removedReactions: string[],
  messageData?: MessageData,
  cache?: boolean,
): Promise<TestReport> {
  let expectation = "";
  let output = "";
  let testSucessfully = false;

  expectation = removedReactions.join();

  try {
    await cordeBot.sendTextMessage(commandName);
    const message = await cordeBot.findMessage(messageData, cache);
    if (message) {
      const reactions = await cordeBot.waitForRemovedReactions(message, removedReactions.length);
      testSucessfully = reactionsExistsIn(reactions, removedReactions);
      output = reactions.map((v) => v.emoji.name).join();
    }

    if (isNot) {
      testSucessfully = !testSucessfully;
    }
  } catch (error) {
    testSucessfully = false;
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
    hasPassed: testSucessfully,
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
