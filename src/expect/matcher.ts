import { ColorResolvable, MessageEmbed, Snowflake } from "discord.js";
import { testCollector } from "../common/testCollector";
import { CordeBot } from "../core";
import { GenericFunction, MessageData, RoleData, TestReport } from "../types/types";
import { Colors } from "../utils/colors";
import { RolePermission } from "../utils/permission";
import {
  ToAddReaction,
  ToDeleteRole,
  ToRenameRole,
  ToReturn,
  ToSetRoleColor,
  ToSetRoleHoist,
  ToSetRoleMentionable,
  ToSetRolePosition,
  ToEditMessage,
  ToPinMessage,
  ToRemoveReaction,
  ToUnpinMessage,
  ToSetRolePermission,
} from "./matches";
import { ExpectOperation } from "./matches/operation";
import { MessageMatches } from "./matches/messageMatches.interface";
import { RoleMatches } from "./matches/roleMatches";

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

  public toEditMessage(message: MessageData, newValue: string | MessageEmbed): void {
    testCollector.addTestFunction((cordeBot) => {
      return this.operationFactory(ToEditMessage, cordeBot, message, newValue);
    });
  }

  public toPin(messageId: string): void;
  public toPin(message: MessageData): void;
  public toPin(message: string | MessageData): void {
    let data: MessageData;
    if (typeof message === "string") {
      data = { id: message };
    } else {
      data = message;
    }

    testCollector.addTestFunction((cordeBot) => {
      return this.operationFactory(ToPinMessage, cordeBot, data);
    });
  }

  public toUnPin(messageId: string): void;
  public toUnPin(message: MessageData): void;
  public toUnPin(message: string | MessageData): void {
    let data: MessageData;
    if (typeof message === "string") {
      data = { id: message };
    } else {
      data = message;
    }

    testCollector.addTestFunction((cordeBot) => {
      return this.operationFactory(ToUnpinMessage, cordeBot, data);
    });
  }

  public toReturn(expect: string | number | boolean | MessageEmbed): void {
    testCollector.addTestFunction((cordeBot) => this.operationFactory(ToReturn, cordeBot, expect));
  }

  public toAddReaction(...reaction: string[]): void {
    testCollector.addTestFunction((cordeBot) =>
      this.operationFactory(ToAddReaction, cordeBot, reaction),
    );
  }

  public toRemoveReaction(...reactions: string[]): void;
  public toRemoveReaction(reactions: string[]): void;
  public toRemoveReaction(reactions: string, message: MessageData): void;
  public toRemoveReaction(reactions: string[], message: MessageData): void;
  public toRemoveReaction(reactions: string | string[], message?: any) {
    testCollector.addTestFunction((cordeBot) => {
      if (Array.isArray(reactions)) {
        return this.operationFactory(ToRemoveReaction, cordeBot, reactions, message);
      }
      return this.operationFactory(ToRemoveReaction, cordeBot, [reactions], message);
    });
  }

  public toSetRoleColor(color: Colors, id: Snowflake): void;
  public toSetRoleColor(color: Colors, name: RoleData): void;
  public toSetRoleColor(color: ColorResolvable, id: Snowflake): void;
  public toSetRoleColor(color: ColorResolvable, name: RoleData): void;
  public toSetRoleColor(color: ColorResolvable | Colors, role: Snowflake | RoleData) {
    const data = this.getRoleData(role);
    testCollector.addTestFunction((cordeBot) => {
      return this.operationFactory(ToSetRoleColor, cordeBot, color, data);
    });
  }

  public toDeleteRole(id: string): void;
  public toDeleteRole(name: RoleData): void;
  public toDeleteRole(role: string | RoleData) {
    const data = this.getRoleData(role);
    testCollector.addTestFunction((cordeBot) => {
      return this.operationFactory(ToDeleteRole, cordeBot, data);
    });
  }

  public toSetRoleMentionable(mentionable: boolean, id: string): void;
  public toSetRoleMentionable(mentionable: boolean, roleData: RoleData): void;
  public toSetRoleMentionable(mentionable: boolean, roleData: string | RoleData) {
    const data = this.getRoleData(roleData);
    testCollector.addTestFunction((cordeBot) => {
      return this.operationFactory(ToSetRoleMentionable, cordeBot, mentionable, data);
    });
  }

  public toSetRoleHoist(hoist: boolean, id: string): void;
  public toSetRoleHoist(hoist: boolean, roleData: RoleData): void;
  public toSetRoleHoist(hoist: boolean, roleData: string | RoleData) {
    const data = this.getRoleData(roleData);
    testCollector.addTestFunction((cordeBot) => {
      return this.operationFactory(ToSetRoleHoist, cordeBot, hoist, data);
    });
  }

  public toRenameRole(newName: string, id: string): void;
  public toRenameRole(newName: string, roleData: RoleData): void;
  public toRenameRole(newName: string, roleData: string | RoleData) {
    const data = this.getRoleData(roleData);
    testCollector.addTestFunction((cordeBot) => {
      return this.operationFactory(ToRenameRole, cordeBot, newName, data);
    });
  }

  public toSetRolePosition(newPosition: number, id: string): void;
  public toSetRolePosition(newPosition: number, roleData: RoleData): void;
  public toSetRolePosition(newPosition: number, roleData: string | RoleData) {
    const data = this.getRoleData(roleData);
    testCollector.addTestFunction((cordeBot) => {
      return this.operationFactory(ToSetRolePosition, cordeBot, newPosition, data);
    });
  }

  public toSetRolePermission(id: string, ...permissions: RolePermission[]): void;
  public toSetRolePermission(roleData: RoleData, ...permissions: RolePermission[]): void;
  public toSetRolePermission(roleData: string | RoleData, ...permissions: RolePermission[]) {
    const data = this.getRoleData(roleData);
    testCollector.addTestFunction((cordeBot) => {
      return this.operationFactory(ToSetRolePermission, cordeBot, permissions, data);
    });
  }

  protected getRoleData(roleData: string | RoleData) {
    let data: RoleData;
    if (typeof roleData === "string") {
      data = { id: roleData };
    } else {
      data = roleData as RoleData;
    }
    return data;
  }

  protected operationFactory<T extends ExpectOperation>(
    type: new (cordeBot: CordeBot, command: string, isNot: boolean) => T,
    cordeBot: CordeBot,
    ...params: Parameters<T["action"]>
  ): Promise<TestReport> {
    const op = new type(cordeBot, this._commandName, this._isNot);
    return (op.action as GenericFunction)(...params);
  }
}

export class ExpectMatchesWithNot extends ExpectMatches implements MatchWithNot {
  public not: ExpectMatches;

  constructor(commandName: string) {
    super(commandName, false);
    this.not = new ExpectMatches(commandName, true);
  }
}
