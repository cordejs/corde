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
  TestFunctionType,
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
import { ExpectTest, ExpectTestParams } from "./matches/expectTest";
import { buildReportMessage, resolveName, stringIsNullOrEmpty } from "../utils";
import { getStackTrace } from "../utils/getStackTrace";
import { ToReturnInChannel } from "./matches/message/toReturnInChannel";
import { runtime } from "../common/runtime";
import { Matches, AllMatches, MacherContructorArgs, MayReturnMatch } from "./types";

export class ExpectMatches<TResponseType extends MayReturnMatch> implements Matches<TResponseType> {
  protected _commandName: unknown;
  protected _isNot: boolean;
  protected _isCascade: boolean;

  constructor({ commandName, isNot, isCascade }: MacherContructorArgs) {
    this._commandName = commandName;
    this._isNot = isNot;
    this._isCascade = isCascade ?? false;
  }

  todoInCascade(...tests: TestFunctionType[]): void {
    console.log(tests);
  }

  toReturn(expect: Primitive | MessageEmbedLike): TResponseType {
    const trace = getStackTrace(undefined, true, "toReturn");
    return this.returnOrAddToCollector((cordeBot) =>
      this.operationFactory(trace, ToReturn, cordeBot, expect),
    );
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
    type: new (params: ExpectTestParams) => T,
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

    const op = new type({
      cordeBot,
      command: commandName,
      isNot: this._isNot,
      timeout: runtime.timeOut,
    });

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

  protected initExpectCascadeWithIsNot() {
    return new AllExpectMatches<void>({
      commandName: this._commandName,
      isNot: this._isNot,
      isCascade: true,
    });
  }

  protected returnOrAddToCollector(testFunction: TestFunctionType): any {
    if (this._isCascade) {
      return testFunction;
    }

    testCollector.addTestFunction(testFunction);
    return;
  }
}

export class AllExpectMatches<TReturn extends MayReturnMatch>
  extends ExpectMatches<TReturn>
  implements AllMatches<TReturn> {
  not: Matches<TReturn>;

  constructor(commandName?: unknown, isCascade?: boolean) {
    super({ commandName, isNot: false, isCascade });
    this.not = new ExpectMatches({ commandName, isNot: true, isCascade });
  }
}
