import { MessageEmbed } from 'discord.js';
import { Matches, MatchesWithNot } from '../models';
import testCollector from '../core/testColletor';
import { MustAddReaction } from './commandOptions/mustAddReaction';
import { mustReturn } from './commandOptions/mustReturn';

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
      const mustActionObj = new MustAddReaction(isNot, commandName);
      testCollector.addTestFunction((cordebot) => mustActionObj.action(cordebot, reactions));
    },
  };
}
