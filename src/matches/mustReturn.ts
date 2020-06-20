import CordeBot from '../core/cordeBot';
import assert from 'assert';
import { MessageEmbed, Message } from 'discord.js';
import { TestReport } from '../models';

export async function mustReturn(
  expect: string | MessageEmbed,
  cordeBot: CordeBot,
  commandName: string,
  isNot: boolean,
) {
  let msg = '';
  let isEqual = false;
  let showExpectAndOutputValue = true;
  if (typeof expect === 'string') {
    const discordMsg = (await cordeBot.sendTextMessage(commandName, 'text')) as Message;
    msg = discordMsg.content;
    isEqual = msg === expect;
  } else {
    const json = await cordeBot.sendTextMessage(commandName, 'embed');
    msg = JSON.stringify(json);
    showExpectAndOutputValue = false;
    try {
      assert.deepEqual(expect.toJSON(), json);
      isEqual = true;
    } catch (error) {
      isEqual = false;
    }
  }

  return {
    commandName,
    expectation: expect,
    output: msg,
    testSucessfully: isEqual,
    isNot,
    showExpectAndOutputValue,
  } as TestReport;
}
