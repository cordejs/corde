import { MessageEmbed } from "discord.js";
import { testCollector } from "../common/testColletor";
import { MustAddReaction } from "./commandOptions";
import { MustReturn } from "./commandOptions/mustReturn";
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
      const command = new MustReturn(isNot, commandName);
      testCollector.addTestFunction((cordeBot) => command.run(cordeBot, expect));
    },

    mustAddReaction(...reactions: string[]) {
      const command = new MustAddReaction(isNot, commandName);
      testCollector.addTestFunction((cordebot) => command.run(cordebot, reactions));
    },
  };
}
