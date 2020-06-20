import { MessageEmbed, Message } from 'discord.js';
import { Matches, MatchesWithNot, TestReport } from '../models';
import { mustReturn } from '../matches/mustReturn';
import testCollector from '../core/testColletor';

export function matcherWithNot(commandName: string): MatchesWithNot {
  return {
    not: matcher(commandName, true),
    ...matcher(commandName, false),
  };
}

export default function matcher(commandName: string, isNot: boolean): Matches {
  return {
    mustReturn(expect: string | MessageEmbed) {
      testCollector.addTestFunction((cordeBot) => mustReturn(expect, cordeBot, commandName, isNot));
    },

    mustAddReaction(reactions: string | string[]) {
      testCollector.addTestFunction(async (cordeBot) => {
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
