import { ColorResolvable, MessageEmbed, Snowflake } from "discord.js";
import { testCollector } from "../common/testCollector";
import { CordeBot } from "../core";
import { GenericFunction, MessageData, RoleIdentifier, TestReport } from "../types/types";
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
import { resolveName, stringIsNullOrEmpty, typeOf } from "../utils";
import { PropertyError } from "../errors";

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
  protected _commandName: unknown;
  protected _isNot: boolean;

  constructor(commandName: unknown, isNot: boolean) {
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
  public toSetRoleColor(color: Colors, name: RoleIdentifier): void;
  public toSetRoleColor(color: ColorResolvable, id: Snowflake): void;
  public toSetRoleColor(color: ColorResolvable, name: RoleIdentifier): void;
  public toSetRoleColor(color: ColorResolvable | Colors, role: Snowflake | RoleIdentifier) {
    const data = this.getRoleData(role);
    testCollector.addTestFunction((cordeBot) => {
      return this.operationFactory(ToSetRoleColor, cordeBot, color, data);
    });
  }

  public toDeleteRole(id: string): void;
  public toDeleteRole(name: RoleIdentifier): void;
  public toDeleteRole(role: string | RoleIdentifier) {
    const data = this.getRoleData(role);
    testCollector.addTestFunction((cordeBot) => {
      return this.operationFactory(ToDeleteRole, cordeBot, data);
    });
  }

  public toSetRoleMentionable(mentionable: boolean, id: string): void;
  public toSetRoleMentionable(mentionable: boolean, roleIdentifier: RoleIdentifier): void;
  public toSetRoleMentionable(mentionable: boolean, roleIdentifier: string | RoleIdentifier) {
    const data = this.getRoleData(roleIdentifier);
    testCollector.addTestFunction((cordeBot) => {
      return this.operationFactory(ToSetRoleMentionable, cordeBot, mentionable, data);
    });
  }

  public toSetRoleHoist(hoist: boolean, id: string): void;
  public toSetRoleHoist(hoist: boolean, roleIdentifier: RoleIdentifier): void;
  public toSetRoleHoist(hoist: boolean, roleIdentifier: string | RoleIdentifier) {
    const data = this.getRoleData(roleIdentifier);
    testCollector.addTestFunction((cordeBot) => {
      return this.operationFactory(ToSetRoleHoist, cordeBot, hoist, data);
    });
  }

  public toRenameRole(newName: string, id: string): void;
  public toRenameRole(newName: string, roleIdentifier: RoleIdentifier): void;
  public toRenameRole(newName: string, roleIdentifier: string | RoleIdentifier) {
    const data = this.getRoleData(roleIdentifier);
    testCollector.addTestFunction((cordeBot) => {
      return this.operationFactory(ToRenameRole, cordeBot, newName, data);
    });
  }

  public toSetRolePosition(newPosition: number, id: string): void;
  public toSetRolePosition(newPosition: number, roleIdentifier: RoleIdentifier): void;
  public toSetRolePosition(newPosition: number, roleIdentifier: string | RoleIdentifier) {
    const data = this.getRoleData(roleIdentifier);
    testCollector.addTestFunction((cordeBot) => {
      return this.operationFactory(ToSetRolePosition, cordeBot, newPosition, data);
    });
  }

  public toSetRolePermission(id: string, ...permissions: RolePermission[]): void;
  public toSetRolePermission(
    roleIdentifier: RoleIdentifier,
    ...permissions: RolePermission[]
  ): void;
  public toSetRolePermission(
    roleIdentifier: string | RoleIdentifier,
    ...permissions: RolePermission[]
  ) {
    const data = this.getRoleData(roleIdentifier);
    testCollector.addTestFunction((cordeBot) => {
      return this.operationFactory(ToSetRolePermission, cordeBot, permissions, data);
    });
  }

  protected getRoleData(roleIdentifier: string | RoleIdentifier) {
    let data: RoleIdentifier;
    if (typeof roleIdentifier === "string") {
      data = { id: roleIdentifier };
    } else {
      data = roleIdentifier as RoleIdentifier;
    }
    return data;
  }

  protected async operationFactory<T extends ExpectOperation>(
    type: new (
      cordeBot: CordeBot,
      command: string | number | bigint | boolean,
      isNot: boolean,
    ) => T,
    cordeBot: CordeBot,
    ...params: Parameters<T["action"]>
  ): Promise<TestReport> {
    const commandName = await resolveName(this._commandName);

    if (typeof commandName === "string" && stringIsNullOrEmpty(commandName)) {
      return { pass: false, message: "command can not be null or an empty string" };
    }
    const op = new type(cordeBot, commandName, this._isNot);
    return (op.action as GenericFunction)(...params);
  }
}

export class ExpectMatchesWithNot extends ExpectMatches implements MatchWithNot {
  public not: ExpectMatches;

  constructor(commandName: unknown) {
    super(commandName, false);
    this.not = new ExpectMatches(commandName, true);
  }
}
