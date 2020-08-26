import { MessageEmbed } from "discord.js";
import { testCollector } from "../common/testColletor";
import { toReturn, toAddReaction } from "./expectMatches";
import { MessageMatches } from "./interfaces/messageMatches";
import { MessageData } from "../types";
import { toRemoveReaction } from "./expectMatches/message/toRemoveReaction";

/**
 * Defines all functions that can be used
 * to check a bot reaction of a command.
 */
type Matches = MessageMatches;

/**
 * Defines the initial value of expectations from
 * **command** function. It includes all matches and
 * the *not* statement. Witch will deny the executed match
 *
 */
export type MatchesWithNot = Matches & {
  /**
   * Defines that a command should **not** do something.
   * Use this if you are can not precise what response a command will throw,
   * But know and responde it **can not** throw.
   */
  not: Matches;
};

export function expectMatchWithNot(commandName: string): MatchesWithNot {
  return {
    not: expectMatches(commandName, true),
    ...expectMatches(commandName, false),
  };
}

function expectMatches(commandName: string, isNot: boolean): Matches {
  return {
    toReturn(expect: string | MessageEmbed) {
      testCollector.addTestFunction((cordeBot) => toReturn(commandName, isNot, cordeBot, expect));
    },

    toAddReaction(...reactions: string[]) {
      testCollector.addTestFunction((cordeBot) =>
        toAddReaction(commandName, isNot, cordeBot, reactions),
      );
    },
    toRemoveReactions(reactions?: string[], message?: MessageData) {
      testCollector.addTestFunction((cordeBot) =>
        toRemoveReaction(commandName, isNot, cordeBot, reactions, message),
      );
    },
  };
}
