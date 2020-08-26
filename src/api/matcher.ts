import { MessageEmbed, ColorResolvable, Snowflake } from "discord.js";
import { testCollector } from "../common/testColletor";
import { toReturn, toAddReaction, toSetRoleColor } from "./expectMatches";
import { MessageMatches } from "./interfaces/messageMatches";
import { MessageData, RoleData } from "../types";
import { toRemoveReaction } from "./expectMatches/message/toRemoveReaction";
import { RoleMatches } from "./interfaces";
import { Colors } from "../utils/colors";

/**
 * Defines all functions that can be used
 * to check a bot reaction of a command.
 */
type Matches = MessageMatches & RoleMatches;

class ExpectMatches implements Matches {
  protected _commandName: string;
  protected _isNot: boolean;
  constructor(commandName: string, isNot: boolean) {
    this._commandName = commandName;
    this._isNot = isNot;
  }

  public toReturn(expect: string | MessageEmbed): void {
    testCollector.addTestFunction((cordeBot) =>
      toReturn(this._commandName, this._isNot, cordeBot, expect),
    );
  }
  public toAddReaction(...reaction: string[]): void {
    testCollector.addTestFunction((cordeBot) =>
      toAddReaction(this._commandName, this._isNot, cordeBot, reaction),
    );
  }
  public toRemoveReactions(reactions: string[], message?: MessageData): void {
    testCollector.addTestFunction((cordeBot) =>
      toRemoveReaction(this._commandName, this._isNot, cordeBot, reactions, message),
    );
  }
  public toSetRoleColor(color: Colors, id: Snowflake): void;
  public toSetRoleColor(color: Colors, name: RoleData): void;
  public toSetRoleColor(color: ColorResolvable, id: Snowflake): void;
  public toSetRoleColor(color: ColorResolvable, name: RoleData): void;
  public toSetRoleColor(color: ColorResolvable | Colors, role: Snowflake | RoleData) {
    testCollector.addTestFunction((cordeBot) => {
      let data: RoleData;
      if (typeof role === "string") {
        data = { id: role };
      } else {
        data = role as RoleData;
      }
      return toSetRoleColor(this._commandName, this._isNot, cordeBot, color, data);
    });
  }
}

/**
 * Defines the initial value of expectations from
 * **command** function. It includes all matches and
 * the *not* statement. Witch will deny the executed match
 */
export class MatchesWithNot extends ExpectMatches {
  /**
   * Defines that a command should **not** do something.
   * Use this if you are can not precise what response a command will throw,
   * But know and responde it **can not** throw.
   */
  public not: ExpectMatches;

  constructor(commandName: string) {
    super(commandName, false);
    this.not = new ExpectMatches(super._commandName, true);
  }
}
