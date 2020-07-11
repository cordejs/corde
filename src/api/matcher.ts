import { MessageEmbed } from "discord.js";
import { testCollector } from "../common/testColletor";
import { mustAddReactionFnImpl } from "./commandOptions";
import { mustReturnFnImpl } from "./commandOptions/mustReturn";
import { Matches, MatchesWithNot } from "./interfaces";

export function matcherWithNotFn(commandName: string): MatchesWithNot {
  return {
    not: matcherFn(commandName, true),
    ...matcherFn(commandName, false),
  };
}

function matcherFn(commandName: string, isNot: boolean): Matches {
  return {
    mustReturn(expect: string | MessageEmbed) {
      testCollector.addTestFunction((cordeBot) =>
        mustReturnFnImpl(expect, cordeBot, commandName, isNot),
      );
    },

    mustAddReaction(...reactions: string[]) {
      testCollector.addTestFunction((cordebot) =>
        mustAddReactionFnImpl(isNot, commandName, cordebot, reactions),
      );
    },
  };
}
