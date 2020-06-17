import assert from 'assert';
import { MessageEmbed, Message } from 'discord.js';
import { Matches, MatchesWithNot, TestReport } from '../models';
import Thread from './thread';

export function matcherWithNot(commandName: string): MatchesWithNot {
  return {
    not: matcher(commandName, true),
    ...matcher(commandName, false),
  };
}

export default function matcher(commandName: string, isNot: boolean): Matches {
  return {
    mustReturn(expect: string | MessageEmbed) {
      Thread.testsFunctions.push(async (cordeBot) => {
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
      });
    },

    mustAddReaction(reactions: string | string[]) {
      Thread.testsFunctions.push(async (cordeBot) => {
        const discordMsg = (await cordeBot.sendTextMessage(commandName, 'text')) as Message;
        let isEqual = false;
        let expectation = '';

        if (typeof reactions === 'string' && discordMsg.reactions.cache.has(reactions)) {
          isEqual = true;
          expectation = reactions;
        } else {
          expectation = (reactions as string[]).join();
          (reactions as string[]).forEach((reaction) => {
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
      });
    },
  };
}
