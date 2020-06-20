import { Message } from 'discord.js';
import { CordeBot } from '../../common';
import { TestReport } from '../models/testReport';

export async function mustAddReactionFnImpl(
  isNot: boolean,
  commandName: string,
  cordeBot: CordeBot,
  args: string | string[],
): Promise<TestReport> {
  const discordMsg = (await cordeBot.sendTextMessage(this.commandName, 'text')) as Message;
  let isEqual = false;
  let expectation = '';

  if (typeof args === 'string' && discordMsg.reactions.cache.has(args)) {
    isEqual = true;
    expectation = args;
  } else {
    expectation = (args as string[]).join();
    (args as string[]).forEach((reaction) => {
      if (discordMsg.reactions.cache.has(reaction)) {
        isEqual = true;
      } else {
        isEqual = false;
      }
    });
  }

  const output = discordMsg.reactions.cache.map((v) => v).join();

  return {
    commandName,
    expectation,
    output,
    testSucessfully: true,
    isNot,
    showExpectAndOutputValue: true,
  } as TestReport;
}
