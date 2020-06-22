import { Message } from 'discord.js';
import { CordeBot } from '../../common';
import { TestReport } from '../models/testReport';

export async function mustAddReactionFnImpl(
  isNot: boolean,
  commandName: string,
  cordeBot: CordeBot,
  reactions: string[],
): Promise<TestReport> {
  let isEqual = false;
  let expectation = '';
  let output = '';

  expectation = reactions.join();

  try {
    const message = await cordeBot.sendTextMessage(commandName);
    await cordeBot.waitForReactions(message, reactions);
    isEqual = isOutputEqualToExpect(message, reactions);
    output = message.reactions.cache.map((v) => v.emoji.name).join();
  } catch (error) {
    console.log(error.message);
  } finally {
    return {
      commandName,
      expectation,
      output,
      testSucessfully: isEqual,
      isNot,
      // Problems in display emojis in windows console
      showExpectAndOutputValue: process.platform === 'win32' ? false : true,
    } as TestReport;
  }
}

function isOutputEqualToExpect(message: Message, expectation: string | string[]) {
  if (typeof expectation === 'string' && message.reactions.cache.has(expectation)) {
    return true;
  } else {
    for (const i in expectation as string[]) {
      if (message.reactions.cache.has(expectation[i])) {
        return true;
      } else {
        return false;
      }
    }
  }
  return false;
}
