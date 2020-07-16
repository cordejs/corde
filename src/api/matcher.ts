import { MessageEmbed } from "discord.js";
import { testCollector } from "../common/testColletor";
import { toReturn, toAddReaction } from "./expectMatches";
import { MessageMatches } from "./interfaces/messageMatches";

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

export class ExpectMatch implements Matches {
  constructor(protected _commandName: string, protected _isNot: boolean = false) {}

  public toReturn(expect: string | MessageEmbed) {
    testCollector.addTestFunction((cordeBot) =>
      toReturn(this._commandName, this._isNot, cordeBot, expect),
    );
  }

  public toAddReaction(...reactions: string[]) {
    testCollector.addTestFunction((cordebot) =>
      toAddReaction(this._commandName, this._isNot, cordebot, reactions),
    );
  }
}

export class ExpectMatchWithNot extends ExpectMatch implements MatchesWithNot {
  public get not() {
    return new ExpectMatch(super._commandName, true);
  }
}
