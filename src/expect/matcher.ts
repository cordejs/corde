import { ColorResolvable, Message, MessageEmbed, Snowflake } from "discord.js";
import { testCollector } from "../common/testCollector";
import { CordeBot } from "../core";
import {
  EmojiLike,
  GenericFunction,
  MessageIdentifier,
  MessageEditedIdentifier,
  MessageEmbedLike,
  Primitive,
  RoleIdentifier,
  TestReport,
} from "../types/types";
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
  ToUnPinMessage,
  ToSetRolePermission,
} from "./matches";
import { ExpectTest } from "./matches/expectTest";
import { MessageMatches } from "./matches/messageMatches";
import { RoleMatches } from "./matches/roleMatches";
import { resolveName, stringIsNullOrEmpty, typeOf } from "../utils";
import { getStackTrace } from "../utils/getStackTrace";

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

  toEditMessage(
    newValue: Primitive | MessageEmbedLike,
    message: MessageEditedIdentifier | string,
  ): void {
    const trace = getStackTrace();
    testCollector.addTestFunction((cordeBot) => {
      return this.operationFactory(trace, ToEditMessage, cordeBot, newValue, message);
    });
  }

  toPin(messageIdentifier: string | MessageIdentifier): void {
    const trace = getStackTrace();

    testCollector.addTestFunction((cordeBot) => {
      return this.operationFactory(trace, ToPinMessage, cordeBot, messageIdentifier);
    });
  }

  toUnPin(messageIdentifier: string | MessageIdentifier): void {
    testCollector.addTestFunction((cordeBot) => {
      const trace = getStackTrace();
      return this.operationFactory(trace, ToUnPinMessage, cordeBot, messageIdentifier);
    });
  }

  toReturn(expect: Primitive | MessageEmbedLike): void {
    const trace = getStackTrace();
    testCollector.addTestFunction((cordeBot) =>
      this.operationFactory(trace, ToReturn, cordeBot, expect),
    );
  }

  toAddReaction(
    emojis: string[] | EmojiLike[] | (string | EmojiLike)[],
    messageIdentifier?: string | MessageIdentifier,
  ): void {
    const trace = getStackTrace();
    testCollector.addTestFunction((cordeBot) =>
      this.operationFactory(trace, ToAddReaction, cordeBot, emojis, messageIdentifier),
    );
  }

  toRemoveReaction(
    emojis: string[] | EmojiLike[] | (string | EmojiLike)[],
    messageIdentifier?: string | MessageIdentifier,
  ): void {
    const trace = getStackTrace();
    testCollector.addTestFunction((cordeBot) =>
      this.operationFactory(trace, ToRemoveReaction, cordeBot, emojis, messageIdentifier),
    );
  }

  toSetRoleColor(color: ColorResolvable | Colors, role: Snowflake | RoleIdentifier) {
    const data = this.getRoleData(role);
    const trace = getStackTrace();
    testCollector.addTestFunction((cordeBot) => {
      return this.operationFactory(trace, ToSetRoleColor, cordeBot, color, data);
    });
  }

  toDeleteRole(role: string | RoleIdentifier) {
    const data = this.getRoleData(role);
    const trace = getStackTrace();
    testCollector.addTestFunction((cordeBot) => {
      return this.operationFactory(trace, ToDeleteRole, cordeBot, data);
    });
  }

  toSetRoleMentionable(mentionable: boolean, roleIdentifier: string | RoleIdentifier) {
    const data = this.getRoleData(roleIdentifier);
    const trace = getStackTrace();
    testCollector.addTestFunction((cordeBot) => {
      return this.operationFactory(trace, ToSetRoleMentionable, cordeBot, mentionable, data);
    });
  }

  toSetRoleHoist(hoist: boolean, roleIdentifier: string | RoleIdentifier) {
    const data = this.getRoleData(roleIdentifier);
    const trace = getStackTrace();
    testCollector.addTestFunction((cordeBot) => {
      return this.operationFactory(trace, ToSetRoleHoist, cordeBot, hoist, data);
    });
  }

  toRenameRole(newName: string, roleIdentifier: string | RoleIdentifier) {
    const data = this.getRoleData(roleIdentifier);
    const trace = getStackTrace();
    testCollector.addTestFunction((cordeBot) => {
      return this.operationFactory(trace, ToRenameRole, cordeBot, newName, data);
    });
  }

  toSetRolePosition(newPosition: number, roleIdentifier: string | RoleIdentifier) {
    const data = this.getRoleData(roleIdentifier);
    const trace = getStackTrace();
    testCollector.addTestFunction((cordeBot) => {
      return this.operationFactory(trace, ToSetRolePosition, cordeBot, newPosition, data);
    });
  }

  toSetRolePermission(roleIdentifier: string | RoleIdentifier, ...permissions: RolePermission[]) {
    const data = this.getRoleData(roleIdentifier);
    const trace = getStackTrace();
    testCollector.addTestFunction((cordeBot) => {
      return this.operationFactory(trace, ToSetRolePermission, cordeBot, data, permissions);
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

  // Trace can not me added inside operationFactory because it do,
  // it will get irrelevant data.

  protected async operationFactory<T extends ExpectTest>(
    trace: string,
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
    return op.action(params).then((report) => {
      if (report.pass) {
        return report;
      }

      report.trace = trace;
      return report;
    });
  }
}

export class ExpectMatchesWithNot extends ExpectMatches implements MatchWithNot {
  not: ExpectMatches;

  constructor(commandName: unknown) {
    super(commandName, false);
    this.not = new ExpectMatches(commandName, true);
  }
}
