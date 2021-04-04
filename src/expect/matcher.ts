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
import { ExpectTest } from "./matches/expectTest";
import { buildReportMessage, resolveName, stringIsNullOrEmpty } from "../utils";
import { getStackTrace } from "../utils/getStackTrace";
import { ToReturnInChannel } from "./matches/message/toReturnInChannel";
import { runtime } from "../common/runtime";
import {
  Matches,
  AllMatches,
  MacherContructorArgs,
  MayReturnMatch,
  ExpectTestBaseParams,
} from "./types";
import { TodoInCascade } from "./matches/todoInCascade";

export class ExpectMatches<TReturn extends MayReturnMatch> implements Matches<TReturn> {
  protected _commandName: unknown;
  protected _isNot: boolean;
  protected _isCascade: boolean;

  constructor({ commandName, isNot, isCascade }: MacherContructorArgs) {
    this._commandName = commandName;
    this._isNot = isNot;
    this._isCascade = isCascade ?? false;
  }

  todoInCascade(...tests: TestFunctionType[]): void {
    const trace = getStackTrace(undefined, true, "todoInCascade");
    this.returnOrAddToCollector((cordeBot) => {
      // Encapsulate the functions inside another so it do not be executed.
      const testEnhanced = tests.map((test) => () => test(cordeBot));
      return this.operationFactory(trace, TodoInCascade, cordeBot, testEnhanced);
    });
  }

  toReturn(expect: Primitive | MessageEmbedLike) {
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
    return this.returnOrAddToCollector((cordeBot) => {
      return this.operationFactory(trace, ToReturnInChannel, cordeBot, expect, channelId, guildId);
    });
  }

  toEditMessage(
    newValue: Primitive | MessageEmbedLike,
    messageIdentifier?: MessageEditedIdentifier | string,
  ) {
    const trace = getStackTrace(undefined, true, "toEditMessage");
    return this.returnOrAddToCollector((cordeBot) => {
      return this.operationFactory(trace, ToEditMessage, cordeBot, newValue, messageIdentifier);
    });
  }

  toPin(messageIdentifier: string | MessageIdentifier) {
    const trace = getStackTrace(undefined, true, "toPin");
    return this.returnOrAddToCollector((cordeBot) => {
      return this.operationFactory(trace, ToPinMessage, cordeBot, messageIdentifier);
    });
  }

  toUnPin(messageIdentifier: string | MessageIdentifier) {
    const trace = getStackTrace(undefined, true, "toUnPin");
    return this.returnOrAddToCollector((cordeBot) => {
      return this.operationFactory(trace, ToUnPinMessage, cordeBot, messageIdentifier);
    });
  }

  toAddReaction(
    emojis: string[] | EmojiLike[] | (string | EmojiLike)[],
    messageIdentifier?: string | MessageIdentifier,
  ) {
    const trace = getStackTrace(undefined, true, "toAddReaction");
    return this.returnOrAddToCollector((cordeBot) =>
      this.operationFactory(trace, ToAddReaction, cordeBot, emojis, messageIdentifier),
    );
  }

  toRemoveReaction(
    emojis: string[] | EmojiLike[] | (string | EmojiLike)[],
    messageIdentifier?: string | MessageIdentifier,
  ) {
    const trace = getStackTrace(undefined, true, "toRemoveReaction");
    return this.returnOrAddToCollector((cordeBot) =>
      this.operationFactory(trace, ToRemoveReaction, cordeBot, emojis, messageIdentifier),
    );
  }

  toSetRoleColor(color: ColorResolvable | Colors, roleIdentifier: string | RoleIdentifier) {
    const trace = getStackTrace(undefined, true, "toSetRoleColor");
    return this.returnOrAddToCollector((cordeBot) => {
      return this.operationFactory(trace, ToSetRoleColor, cordeBot, color, roleIdentifier);
    });
  }

  toDeleteRole(roleIdentifier: string | RoleIdentifier) {
    const trace = getStackTrace(undefined, true, "toDeleteRole");
    return this.returnOrAddToCollector((cordeBot) => {
      return this.operationFactory(trace, ToDeleteRole, cordeBot, roleIdentifier);
    });
  }

  toSetRoleMentionable(mentionable: boolean, roleIdentifier: string | RoleIdentifier) {
    const trace = getStackTrace(undefined, true, "toSetRoleMentionable");
    return this.returnOrAddToCollector((cordeBot) => {
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
    return this.returnOrAddToCollector((cordeBot) => {
      return this.operationFactory(trace, ToSetRoleHoist, cordeBot, hoist, roleIdentifier);
    });
  }

  toRenameRole(newName: string, roleIdentifier: string | RoleIdentifier) {
    const trace = getStackTrace(undefined, true, "toRenameRole");
    return this.returnOrAddToCollector((cordeBot) => {
      return this.operationFactory(trace, ToRenameRole, cordeBot, newName, roleIdentifier);
    });
  }

  toSetRolePosition(newPosition: number, roleIdentifier: string | RoleIdentifier) {
    const trace = getStackTrace(undefined, true, "toSetRolePosition");
    return this.returnOrAddToCollector((cordeBot) => {
      return this.operationFactory(trace, ToSetRolePosition, cordeBot, newPosition, roleIdentifier);
    });
  }

  toSetRolePermission(roleIdentifier: string | RoleIdentifier, ...permissions: RolePermission[]) {
    const trace = getStackTrace(undefined, true, "toSetRolePermission");
    return this.returnOrAddToCollector((cordeBot) => {
      return this.operationFactory(
        trace,
        ToSetRolePermission,
        cordeBot,
        roleIdentifier,
        permissions,
      );
    });
  }

  toString() {
    return "ExpectMatches";
  }

  // Trace can not me added inside operationFactory because it do,
  // it will get irrelevant data.

  protected async operationFactory<T extends ExpectTest>(
    trace: string,
    type: new (params: ExpectTestBaseParams) => T,
    cordeBot: CordeBotLike,
    ...params: Parameters<T["action"]>
  ): Promise<TestReport> {
    const commandName = await resolveName(this._commandName);

    const op = new type({
      cordeBot,
      command: commandName,
      isNot: this._isNot,
      timeout: runtime.timeOut,
      isCascade: this._isCascade,
    });

    if (
      commandName == undefined ||
      (typeof commandName === "string" && stringIsNullOrEmpty(commandName))
    ) {
      return {
        pass: false,
        message: buildReportMessage("command can not be null or an empty string"),
        testName: op.toString(),
      };
    }

    const report = await op.action(...params);

    if (!report) {
      return {
        pass: false,
        message: buildReportMessage("no report was provided by the test"),
        testName: op.toString(),
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

    return testCollector.addTestFunction(testFunction);
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

  toString() {
    return "AllExpectMatches";
  }
}
