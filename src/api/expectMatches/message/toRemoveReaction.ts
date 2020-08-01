import { Message } from "discord.js";
import { TestReport } from "../../interfaces/testReport";
import { CordeBot } from "../../../core";
import { MessageData } from "../../../interfaces";

export async function toRemoveReaction(
  commandName: string,
  isNot: boolean,
  cordeBot: CordeBot,
  removedReactions: string[],
  messageData?: MessageData,
  cache?: boolean,
): Promise<TestReport> {
  let contains = false;
  let expectation = "";
  let output = "";

  expectation = removedReactions.join();

  try {
    cordeBot.sendTextMessage(commandName);
    const message = await cordeBot.findMessage(messageData, cache);
    if (message) {
      const reactions = await cordeBot.waitForRemovedReactions(message, removedReactions.length);
      contains = messageHasReactions(message, removedReactions);
      output = reactions.map((v) => v.emoji.name).join();
    }
  } catch (error) {
    throw error;
  }

  let testSucessfully = false;

  if ((!contains && !isNot) || (contains && isNot)) {
    testSucessfully = true;
  }

  return {
    commandName,
    expectation,
    output,
    testSucessfully,
    isNot,
    // Problems in display emojis in windows console
    showExpectAndOutputValue: process.platform === "win32" ? false : true,
    customReturnMessage: `command ${commandName} removed `,
  } as TestReport;
}

function messageHasReactions(message: Message, expectation: string[]) {
  for (const i in expectation as string[]) {
    if (message.reactions.cache.has(expectation[i])) {
      return true;
    }
  }
  return false;
}
