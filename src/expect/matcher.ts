import { ColorResolvable } from "discord.js";
import { testCollector } from "../common/testCollector";
import {
  EmojiLike,
  MessageIdentifier,
  MessageEditedIdentifier,
  MessageEmbedLike,
  Primitive,
  RoleIdentifier,
  TestReport,
  CordeBotLike,
  ChannelLocation,
} from "../types";
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
import { buildReportMessage, resolveName, stringIsNullOrEmpty } from "../utils";
import { getStackTrace } from "../utils/getStackTrace";
import { ToReturnInChannel } from "./matches/message/toReturnInChannel";

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

  toReturnInChannel(
    expect: string | number | bigint | boolean | MessageEmbedLike,
    channelId: string | ChannelLocation,
    guildId?: string,
  ) {
    const trace = getStackTrace(undefined, true, "toReturnInChannel");
    testCollector.addTestFunction((cordeBot) => {
      return this.operationFactory(trace, ToReturnInChannel, cordeBot, expect, channelId, guildId);
    });
  }

  toEditMessage(
    newValue: Primitive | MessageEmbedLike,
    messageIdentifier?: MessageEditedIdentifier | string,
  ): void {
    const trace = getStackTrace(undefined, true, "toEditMessage");
    testCollector.addTestFunction((cordeBot) => {
      return this.operationFactory(trace, ToEditMessage, cordeBot, newValue, messageIdentifier);
    });
  }

  toPin(messageIdentifier: string | MessageIdentifier): void {
    const trace = getStackTrace(undefined, true, "toPin");
    testCollector.addTestFunction((cordeBot) => {
      return this.operationFactory(trace, ToPinMessage, cordeBot, messageIdentifier);
    });
  }

  toUnPin(messageIdentifier: string | MessageIdentifier): void {
    const trace = getStackTrace(undefined, true, "toUnPin");
    testCollector.addTestFunction((cordeBot) => {
      return this.operationFactory(trace, ToUnPinMessage, cordeBot, messageIdentifier);
    });
  }

  toReturn(expect: Primitive | MessageEmbedLike): void {
    const trace = getStackTrace(undefined, true, "toReturn");
    testCollector.addTestFunction((cordeBot) =>
      this.operationFactory(trace, ToReturn, cordeBot, expect),
    );
  }

  toAddReaction(
    emojis: string[] | EmojiLike[] | (string | EmojiLike)[],
    messageIdentifier?: string | MessageIdentifier,
  ): void {
    const trace = getStackTrace(undefined, true, "toAddReaction");
    testCollector.addTestFunction((cordeBot) =>
      this.operationFactory(trace, ToAddReaction, cordeBot, emojis, messageIdentifier),
    );
  }

  toRemoveReaction(
    emojis: string[] | EmojiLike[] | (string | EmojiLike)[],
    messageIdentifier?: string | MessageIdentifier,
  ): void {
    const trace = getStackTrace(undefined, true, "toRemoveReaction");
    testCollector.addTestFunction((cordeBot) =>
      this.operationFactory(trace, ToRemoveReaction, cordeBot, emojis, messageIdentifier),
    );
  }

  toSetRoleColor(color: ColorResolvable | Colors, roleIdentifier: string | RoleIdentifier) {
    const trace = getStackTrace(undefined, true, "toSetRoleColor");
    testCollector.addTestFunction((cordeBot) => {
      return this.operationFactory(trace, ToSetRoleColor, cordeBot, color, roleIdentifier);
    });
  }

  toDeleteRole(roleIdentifier: string | RoleIdentifier) {
    const trace = getStackTrace(undefined, true, "toDeleteRole");
    testCollector.addTestFunction((cordeBot) => {
      return this.operationFactory(trace, ToDeleteRole, cordeBot, roleIdentifier);
    });
  }

  toSetRoleMentionable(mentionable: boolean, roleIdentifier: string | RoleIdentifier) {
    const trace = getStackTrace(undefined, true, "toSetRoleMentionable");
    testCollector.addTestFunction((cordeBot) => {
      return this.operationFactory(
        trace,
        ToSetRoleMentionable,
        cordeBot,
        mentionable,
        roleIdentifier,
      );
    });
  }

  toSetRoleHoist(hoist: boolean, roleIdentifier: string | RoleIdentifier) {
    const trace = getStackTrace(undefined, true, "toSetRoleHoist");
    testCollector.addTestFunction((cordeBot) => {
      return this.operationFactory(trace, ToSetRoleHoist, cordeBot, hoist, roleIdentifier);
    });
  }

  toRenameRole(newName: string, roleIdentifier: string | RoleIdentifier) {
    const trace = getStackTrace(undefined, true, "toRenameRole");
    testCollector.addTestFunction((cordeBot) => {
      return this.operationFactory(trace, ToRenameRole, cordeBot, newName, roleIdentifier);
    });
  }

  toSetRolePosition(newPosition: number, roleIdentifier: string | RoleIdentifier) {
    const trace = getStackTrace(undefined, true, "toSetRolePosition");
    testCollector.addTestFunction((cordeBot) => {
      return this.operationFactory(trace, ToSetRolePosition, cordeBot, newPosition, roleIdentifier);
    });
  }

  toSetRolePermission(roleIdentifier: string | RoleIdentifier, ...permissions: RolePermission[]) {
    const trace = getStackTrace(undefined, true, "toSetRolePermission");
    testCollector.addTestFunction((cordeBot) => {
      return this.operationFactory(
        trace,
        ToSetRolePermission,
        cordeBot,
        roleIdentifier,
        permissions,
      );
    });
  }

  // Trace can not me added inside operationFactory because it do,
  // it will get irrelevant data.

  protected async operationFactory<T extends ExpectTest>(
    trace: string,
    type: new (cordeBot: CordeBotLike, command: string | number | boolean, isNot: boolean) => T,
    cordeBot: CordeBotLike,
    ...params: Parameters<T["action"]>
  ): Promise<TestReport> {
    const commandName = await resolveName(this._commandName);

    if (
      commandName == undefined ||
      (typeof commandName === "string" && stringIsNullOrEmpty(commandName))
    ) {
      return { pass: false, message: "command can not be null or an empty string" };
    }

    const op = new type(cordeBot, commandName, this._isNot);

    const report = await op.action(...params);

    if (!report) {
      return {
        pass: false,
        message: buildReportMessage("no report was provided by the test"),
        trace,
      };
    }

    if (report.pass) {
      return report;
    }

    report.trace = trace;
    return report;
  }
}

export class ExpectMatchesWithNot extends ExpectMatches implements MatchWithNot {
  not: ExpectMatches;

  constructor(commandName: unknown) {
    super(commandName, false);
    this.not = new ExpectMatches(commandName, true);
  }
}
