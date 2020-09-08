import { MessageEmbed, ColorResolvable, Snowflake } from "discord.js";
import { testCollector } from "../common/testColletor";
import { toReturn, toAddReaction, toSetRoleColor, toDeleteRole } from "./expectMatches";
import { MessageMatches } from "./interfaces/messageMatches";
import { MessageData, RoleData } from "../types";
import { toRemoveReaction } from "./expectMatches/message/toRemoveReaction";
import { RoleMatches, TestReport } from "./interfaces";
import { Colors } from "../utils/colors";
import ToSetRoleMentionable from "./expectMatches/role/toSetRoleMentionable";
import { ExpectOperation } from "./expectMatches/operation";
import { CordeBot } from "../core";
import { ToSetHoist } from "./expectMatches/role/toSetHoist";

/**
 * Defines all functions that can be used
 * to check a bot reaction of a command.
 */
type Matches = MessageMatches & RoleMatches;

/**
 * Defines the initial value of expectations from
 * **command** function. It includes all matches and
 * the *not* statement. Witch will deny the executed match
 */
export interface MatchWithNot extends Matches {
  /**
   * Defines that a command should **not** do something.
   * Use this if you can not precise what response a command will throw,
   * But know what it **can not** throw.
   */
  not: Matches;
}

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

  public toRemoveReaction(...reactions: string[]): void;
  public toRemoveReaction(reactions: string[]): void;
  public toRemoveReaction(reactions: string, message: MessageData): void;
  public toRemoveReaction(reactions: string[], message: MessageData): void;
  public toRemoveReaction(reactions: string | string[], message?: any) {
    testCollector.addTestFunction((cordeBot) => {
      if (Array.isArray(reactions)) {
        return toRemoveReaction(this._commandName, this._isNot, cordeBot, reactions, message);
      }
      return toRemoveReaction(this._commandName, this._isNot, cordeBot, [reactions], message);
    });
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

  public toDeleteRole(id: string): void;
  public toDeleteRole(name: RoleData): void;
  public toDeleteRole(role: string | RoleData) {
    testCollector.addTestFunction((cordeBot) => {
      let data: RoleData;
      if (typeof role === "string") {
        data = { id: role };
      } else {
        data = role as RoleData;
      }
      return toDeleteRole(this._commandName, this._isNot, cordeBot, data);
    });
  }

  public toSetRoleMentionable(mentionable: boolean, id: string): void;
  public toSetRoleMentionable(mentionable: boolean, roleData: RoleData): void;
  public toSetRoleMentionable(mentionable: boolean, roleData: string | RoleData) {
    testCollector.addTestFunction((cordeBot) => {
      let data: RoleData;
      if (typeof roleData === "string") {
        data = { id: roleData };
      } else {
        data = roleData as RoleData;
      }
      return this.operationFactory(ToSetRoleMentionable, cordeBot, mentionable, data);
    });
  }

  public toSetHoist(hoist: boolean) {
    testCollector.addTestFunction((cordeBot) => {
      return this.operationFactory(ToSetHoist, cordeBot, hoist);
    });
  }

  protected operationFactory<T extends ExpectOperation<P1>, P1>(
    type: new (cordeBot: CordeBot, command: string, isNot: boolean) => T,
    cordeBot: CordeBot,
    p1: P1,
  ): Promise<TestReport>;
  protected operationFactory<T extends ExpectOperation<P1, P2>, P1, P2>(
    type: new (cordeBot: CordeBot, command: string, isNot: boolean) => T,
    cordeBot: CordeBot,
    p1: P1,
    p2: P2,
  ): Promise<TestReport>;
  protected operationFactory<T extends ExpectOperation<P1, P2, P3>, P1, P2, P3>(
    type: new (cordeBot: CordeBot, command: string, isNot: boolean) => T,
    cordeBot: CordeBot,
    p1?: P1,
    p2?: P2,
    p3?: P3,
  ): Promise<TestReport> {
    const op = new type(cordeBot, this._commandName, this._isNot);
    return op.action(p1, p2, p3);
  }
}

export class ExpectMatchesWithNot extends ExpectMatches implements MatchWithNot {
  public not: ExpectMatches;

  constructor(commandName: string) {
    super(commandName, false);
    this.not = new ExpectMatches(commandName, true);
  }
}
