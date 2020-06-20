import { MessageEmbed } from 'discord.js';
import { Matches, MatchesWithNot } from '../models';
import testCollector from '../common/testColletor';
import { mustReturnFnImpl } from './commandOptions/mustReturn';
import { mustAddReactionFnImpl } from './commandOptions';

export function matcherWithNot(commandName: string): MatchesWithNot {
  return {
    not: matcher(commandName, true),
    ...matcher(commandName, false),
  };
}

export default function matcher(commandName: string, isNot: boolean): Matches {
  return {
    mustReturn(expect: string | MessageEmbed) {
      testCollector.addTestFunction((cordeBot) =>
        mustReturnFnImpl(expect, cordeBot, commandName, isNot),
      );
    },

    mustAddReaction(reactions: string | string[]) {
      testCollector.addTestFunction((cordebot) =>
        mustAddReactionFnImpl(isNot, commandName, cordebot, reactions),
      );
    },
  };
}
