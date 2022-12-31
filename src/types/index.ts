import {
  AnyChannel,
  Client,
  Collection,
  Guild,
  GuildBasedChannel,
  Message,
  MessageEmbed,
  MessageOptions,
  MessagePayload,
  Role,
  RoleManager,
  TextChannel,
} from "discord.js";
import { Group } from "../core/Group";
import { Events } from "../core/Events";
import { Queue } from "../data-structures";

export type FunctionOnly<T> = {
  [U in keyof T]: T[U] extends (...args: any[]) => any ? T[U] : never;
};

export type Constructor<T> = new (...args: any[]) => T;

/**
 * Provides a mechanism for releasing unmanaged resources.
 */
export interface IDisposable {
  /**
   * Performs application-defined tasks associated with freeing,
   * releasing, or resetting resources.
   */
  dispose(...args: any[]): Promise<void> | void;
}

/**
 * Marks the type as **null** or **undefined**
 *
 * @internal
 */
export type Optional<T> = T | null | undefined;

export interface ITestReport {
  pass: boolean;
  testName?: string;
  message?: string;
  trace?: string;
  isHandledError?: boolean;
}

export interface ITestProps {
  isNot: boolean;
  expectedColorFn(text: string): string;
  receivedColorFn(text: string): string;
  formatValue(value: any): string;
  createHint(...paramsName: string[]): string;
}

/**
 * Contract with necessary functions of Discord.js Client
 */
export interface ICordeBot {
  readonly id?: string;
  readonly client: Client;
  readonly events: Events;
  readonly guild: Guild;
  readonly textChannel: TextChannel;
  readonly roleManager: RoleManager;
  readonly channel: TextChannel;
  readonly testBotId: string;
  readonly voiceConnection?: corde.IVoiceChannelState;

  /**
   * Authenticate Corde bot to the installed bot in the Discord server.
   *
   * @param token Corde bot token
   *
   * @returns Promise resolve for success connection, or a promise
   * rejection with a formatted message if there was found an error in
   * connection attempt.
   */
  login(token: string): Promise<string>;
  /**
   * Destroy client connection.
   */
  logout(): void;
  /**
   * Sends a pure message without prefix it.
   * @param message Data to be sent to channel
   */
  sendMessage(
    message: Primitive | MessageOptions | MessagePayload | MessageEmbed,
  ): Promise<Message>;

  loadGuildAndChannel(): Promise<void>;

  /**
   * Send a message to a channel defined in configs.
   *
   * @see Runtime
   *
   * @param message Message without prefix that will be sent to defined server's channel
   * @description The message is concatenated with the stored **prefix** and is sent to the channel.
   *
   * @return Promise rejection if a testing bot does not send any message in the timeout value set,
   * or resolve for the promise with the message returned by the testing bot.
   */
  sendTextMessage(message: Primitive | boolean, channelId?: string): Promise<Message>;
  isLoggedIn(): boolean;
  findMessage(filter: (message: Message) => boolean): Promise<Message | undefined>;
  findMessage(data: corde.IMessageIdentifier): Promise<Message | undefined>;
  findMessage(
    data: corde.IMessageIdentifier | ((message: Message) => boolean),
  ): Promise<Message | undefined>;
  fetchRoles(): Promise<Role[]>;
  fetchRole(id: string): Promise<Role | null>;
  fetchChannel(id: string): Promise<AnyChannel | undefined>;
  fetchGuild(id: string): Promise<Guild | undefined>;
  hasRole(roleIdentifier: corde.IRoleIdentifier): Promise<boolean>;
  findRole(roleIdentifier: corde.IRoleIdentifier): Promise<Role | undefined>;
  getRoles(): Collection<string, Role>;
  findGuild(guildId: string): Guild;
  findChannel(channelId: string): Promise<GuildBasedChannel>;
  findChannel(guild: Guild, channelId: string): Promise<GuildBasedChannel>;
  joinVoiceChannel(channelId: string): Promise<corde.IVoiceChannelState>;
  isInVoiceChannel(): boolean;
  leaveVoiceChannel(): void;
  isStreamingInVoiceChannel(): void;
  stopStream(): void;
}

export type VoidLikeFunction = (() => void) | (() => PromiseLike<void>) | (() => Promise<void>);
export type TestFunctionType = (cordeBot: ICordeBot) => Promise<ITestReport>;
export type MessageType = "text" | "embed";
export type MessageOutputType = Message | corde.IMinifiedEmbedMessage;
export type MessageExpectationType = string | MessageEmbed;
export type GenericFunction = (...args: any[]) => any;
export type Primitive = number | string | boolean | bigint;
export type ResolveFunction<TResult> = (value: TResult) => void;
export type RejectFunction = (reason?: any) => void;
export type EmojisType = string[] | corde.IEmoji[] | (string | corde.IEmoji)[];
export type Nullable<T> = T | undefined | null;

export type ObjectLike = Record<string, any>;

export type FullPrimitives = (Primitive & undefined) | null;
export type DeepReadonly<T> = T extends FullPrimitives ? T : DeepReadonlyObject<T>;

export interface IEntityHook {
  readonly beforeEachHooks: Queue<VoidLikeFunction>;
  readonly beforeAllHooks: Queue<VoidLikeFunction>;
  readonly afterAllHooks: Queue<VoidLikeFunction>;
  readonly afterEachHooks: Queue<VoidLikeFunction>;
}

type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

/**
 * Define a strict **object**.
 *
 * @see https://github.com/typescript-eslint/typescript-eslint/issues/842
 *
 * @description
 *
 * Definition used to make usage of object types more effectively.
 *
 * Don't use `{}` as a type. `{}` actually means "any non-nullish value".
 * - If you want a type meaning "any object", you probably want `Record<string, unknown>` instead.
 * - If you want a type meaning "any value", you probably want `unknown` instead.
 * - If you want a type meaning "empty object", you probably want `Record<string, never>` instead.
 *
 */
export type StrictObject = Record<string, any>;

/**
 * Get all function `T` parameters as they may be
 * optional.
 */
export type ParametersAsOptional<T extends GenericFunction> = Parameters<T> | void[];

/**
 * Available types of config files
 */
export type ConfigFileType = "js" | "json" | "ts";

/**
 * Represents **command** structure
 */
export interface IAssertionProps {
  commandName: string;
  expectation: MessageExpectationType;
  usingTrueStatement: boolean;
  output?: MessageOutputType;
  MessageType: MessageType;
}

export type ArgResponse<T extends (...args: any) => any> = ReturnType<T> extends Promise<infer V>
  ? V
  : T;

/**
 * Represents **test** structure
 */
export interface ITest {
  toResolveName: () => Promise<string | number | boolean>;
  action: VoidLikeFunction;
  markedAsFailed?: boolean;
}

export type TestFileActionType = Group | ITest;

/**
 * Represents **group** structure
 */
export interface IGroup {
  name?: string | number | boolean;
  subGroups?: IGroup[];
  tests: ITest[];
  beforeEachHooks: Queue<VoidLikeFunction>;
  afterEachHooks: Queue<VoidLikeFunction>;
  afterAllHooks: Queue<VoidLikeFunction>;
  beforeAllHooks: Queue<VoidLikeFunction>;
}

export interface IJSONFile {
  $schema: string;
}

export interface ISemiRunnerReport {
  totalTests: number;
  totalEmptyTests: number;
  totalEmptyTestFiles: number;
  totalTestFiles: number;
  totalTestsPassed: number;
  totalTestsFailed: number;
  totalTestFilesPassed: number;
  totalTestFilesFailed: number;
}

export interface IRunnerReport extends ISemiRunnerReport {
  testTimer: string;
}

export interface IExpectTestBaseParams {
  cordeBot: ICordeBot;
  command?: string | number | boolean;
  isNot: boolean;
  timeout?: number;
  isCascade: boolean;
  guildId?: string;
  channelId: string;
  channelIdToSendCommand?: string;
}
export interface IExpectTestParams extends IExpectTestBaseParams {
  testName: string;
  mustSendCommand: boolean;
}

export interface IMacherContructorArgs {
  commandName: unknown;
  isNot?: boolean;
  channelIdToSendCommand?: string;
  channelId?: string;
  guildId?: string;
  isCascade?: boolean;
}

export interface ITestFilePattern {
  filesPattern: string[];
  ignorePattern?: string[];
}

export type MapObj<T> = {
  [U in keyof T]: T[U];
};
