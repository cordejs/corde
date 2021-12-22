import {
  Channel,
  Client,
  Collection,
  Guild,
  GuildChannel,
  Message,
  MessageEmbed,
  Role,
  RoleManager,
  TextChannel,
  VoiceChannel,
  VoiceConnection,
} from "discord.js";
import { Group } from "../core/Group";
import { Events } from "../core/Events";
import { Queue } from "../data-structures";

export type FunctionOnly<T> = {
  [U in keyof T]: T[U] extends (...args: any[]) => any ? T[U] : never;
};

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
  readonly roleManager: RoleManager;
  readonly channel: TextChannel;
  readonly testBotId: string;
  readonly voiceConnection?: IVoiceChannelState;

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
  sendMessage(message: Primitive | MessageEmbed): Promise<Message>;
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
  fetchRoles(): Promise<RoleManager | null>;
  fetchRole(id: string): Promise<Role | null>;
  fetchChannel(id: string): Promise<Channel | undefined>;
  fetchGuild(id: string): Promise<Guild | undefined>;
  hasRole(roleIdentifier: corde.IRoleIdentifier): Promise<boolean>;
  findRole(roleIdentifier: corde.IRoleIdentifier): Promise<Role | undefined>;
  getRoles(): Collection<string, Role>;
  findGuild(guildId: string): Guild;
  findChannel(channelId: string): GuildChannel | undefined;
  findChannel(guild: Guild, channelId: string): GuildChannel | undefined;
  joinVoiceChannel(channelId: string): Promise<IVoiceChannelState>;
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

/**
 * Contains a set of properties needed for execution of corde
 */
export interface IConfigOptions {
  /**
   * Fake bot used to test the real one
   */
  cordeBotToken: string;
  /**
   * User's bot that will be tested
   */
  botTestId: string;
  /**
   * User's bot token that will run.
   */
  botToken: string;
  /**
   * Channel where tests will run
   */
  channelId: string;
  /**
   * Guild where tests will run
   */
  guildId: string;
  /**
   * Defines max amount of time that a command can run
   * @default 5000
   */
  timeout?: number;
  /**
   * Defines how to identify bot calls
   */
  botPrefix: string;
  /**
   * Path for case tests. Use this from the base directory of the application
   */
  testMatches: string[];
  /**
   * Definition of all paterns to ignore in tests search
   *
   * @default ["(?:^|/)node_modules/"]
   */
  modulePathIgnorePatterns?: string[];
  /**
   * Definition of tsconfig path.
   *
   * @default <rootDir>/tsconfig.json
   */
  project?: string;
  /**
   * Define if corde should stop if any problem
   * occour when importing a test file.
   *
   * @default true
   */
  exitOnFileReadingError?: boolean;
  /**
   * Define file extensions to be loaded
   *
   * @default [".js",".ts"]
   */
  extensions?: string[];
  /**
   * Defines root dir of the project.
   *
   * @default process.cwd()
   */
  rootDir?: string;
  /**
   * If true, uses configs such as `channelId` and `guildId` in
   * events parameters if they are no provided.
   *
   * @default false
   */
  useConfigValuesInEventsDefaultParameters?: boolean;
  /**
   * If true, uses config timeout value in events parameters,
   * or, it's default value if it's not provided in configs.
   *
   * This option only forces the usage of `timeout` value,
   * ignoring the others.
   *
   * If you want to use **all** values, mark `useConfigValuesInEventsDefaultParameters: true`
   *
   * @default true
   */
  useTimoutValueInEventsDefaultParameters?: boolean;
  /**
   * If true, corde will connect it's bot when start tests.
   *
   * @default true
   */
  loginCordeBotOnStart?: boolean;
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
  timeout: number;
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

export interface IVoiceChannelState {
  channel: VoiceChannel;
  connection?: VoiceConnection;
}

export type MapObj<T> = {
  [U in keyof T]: T[U];
};
