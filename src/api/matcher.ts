import { ColorResolvable, MessageEmbed, Snowflake } from "discord.js";
import { testCollector } from "../common/testCollector";
import { CordeBot } from "../core";
import { MessageData, RoleData } from "../types";
import { Colors } from "../utils/colors";
import { RolePermission } from "../utils/permission";
import {
  toAddReaction,
  toDeleteRole,
  ToRenameRole,
  toReturn,
  toSetRoleColor,
  ToSetRoleHoist,
  ToSetRoleMentionable,
  ToSetRolePosition,
} from "./expectMatches";
import { ToEditMessage } from "./expectMatches/message/toEditMessage";
import { ToPinMessage } from "./expectMatches/message/toPinMessage";
import { toRemoveReaction } from "./expectMatches/message/toRemoveReaction";
import { ToUnpinMessage } from "./expectMatches/message/toUnpinMessage";
import { ExpectOperation } from "./expectMatches/operation";
import { ToSetRolePermission } from "./expectMatches/role/toSetRolePermission";
import { RoleMatches, TestReport } from "./interfaces";
import { MessageMatches } from "./interfaces/messageMatches";

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
    const data = this.getRoleData(role);
    testCollector.addTestFunction((cordeBot) => {
      return toSetRoleColor(this._commandName, this._isNot, cordeBot, color, data);
    });
  }

  public toDeleteRole(id: string): void;
  public toDeleteRole(name: RoleData): void;
  public toDeleteRole(role: string | RoleData) {
    const data = this.getRoleData(role);
    testCollector.addTestFunction((cordeBot) => {
      return toDeleteRole(this._commandName, this._isNot, cordeBot, data);
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

  protected operationFactory<T extends ExpectOperation<P1>, P1>(
    type: new (cordeBot: CordeBot, command: string, isNot: boolean) => T,
    cordeBot: CordeBot,
    parameter1: P1,
  ): Promise<TestReport>;
  protected operationFactory<T extends ExpectOperation<P1, P2>, P1, P2>(
    type: new (cordeBot: CordeBot, command: string, isNot: boolean) => T,
    cordeBot: CordeBot,
    parameter1: P1,
    parameter2: P2,
  ): Promise<TestReport>;
  protected operationFactory<T extends ExpectOperation<P1, P2, P3>, P1, P2, P3>(
    type: new (cordeBot: CordeBot, command: string, isNot: boolean) => T,
    cordeBot: CordeBot,
    parameter1?: P1,
    parameter2?: P2,
    parameter3?: P3,
  ): Promise<TestReport> {
    const op = new type(cordeBot, this._commandName, this._isNot);
    return op.action(parameter1, parameter2, parameter3);
  }
}

export class ExpectMatchesWithNot extends ExpectMatches implements MatchWithNot {
  public not: ExpectMatches;

  constructor(commandName: string) {
    super(commandName, false);
    this.not = new ExpectMatches(commandName, true);
  }
}
