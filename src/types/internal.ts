import {
  Channel,
  Client,
  Collection,
  ColorResolvable,
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
import {
  IMessageIdentifier,
  IRoleIdentifier,
  IMinifiedEmbedMessage,
  IEmoji,
  IMessageEmbed,
  IMessageEditedIdentifier,
  Colors,
  RolePermission,
} from ".";
import { Group } from "../common/Group";
import { Events } from "../core/events";
import { Queue } from "../data-structures";

export interface ITestReport {
  pass: boolean;
  testName?: string;
  message?: string;
  trace?: string;
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
  findMessage(data: IMessageIdentifier): Promise<Message | undefined>;
  findMessage(
    data: IMessageIdentifier | ((message: Message) => boolean),
  ): Promise<Message | undefined>;
  fetchRoles(): Promise<RoleManager | null>;
  fetchRole(id: string): Promise<Role | null>;
  fetchChannel(id: string): Promise<Channel | undefined>;
  fetchGuild(id: string): Promise<Guild | undefined>;
  hasRole(roleIdentifier: IRoleIdentifier): Promise<boolean>;
  findRole(roleIdentifier: IRoleIdentifier): Promise<Role | undefined>;
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
export type MessageOutputType = Message | IMinifiedEmbedMessage;
export type MessageExpectationType = string | MessageEmbed;
export type GenericFunction = (...args: any[]) => any;
export type Primitive = number | string | boolean | bigint;
export type ResolveFunction<TResult> = (value: TResult) => void;
export type RejectFunction = (reason?: any) => void;
export type EmojisType = string[] | IEmoji[] | (string | IEmoji)[];
export type Nullable<T> = T | undefined | null;

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
}

export type MayReturnMatch = IMatches<any> | void;

/**
 * Defines all functions that can be used
 * to check a bot reaction of a command.
 *
 */
export interface IMessageMatches<TReturn extends MayReturnMatch> {
  /**
   * Defines the message expected to be returned by a
   * command.
   *
   * @param expect A message returned by a bot after invoking a command
   *
   * @since 1.0
   */
  toReturn(expect: boolean | number | string | IMessageEmbed): TReturn;
  /**
   * Defines [reactions](https://discordjs.guide/popular-topics/reactions.html#reacting-to-messages)
   * that must be added to the command message.
   *
   * @param emojis Single or list of reactions that must be added to a message.
   * It can be **emojis** or [custom emojis](https://support.discord.com/hc/en-us/articles/360036479811-Custom-Emojis).
   * @param messageIdentifier Id or object with the id or content of the message.
   *
   * @since 1.0
   */
  toAddReaction(
    emojis: string[] | IEmoji[] | (string | IEmoji)[],
    messageIdentifier?: string | IMessageIdentifier,
  ): TReturn;

  /**
   * Check if a command removes a list of reactions from the last message sent
   * by someone who is not the testing bot or corde's bot.
   *
   * @param emojis Reactions to check if were removed. And/or reactions like (reactions that are customized).
   * @param messageIdentifier Id or object with the id or content of the message.
   *
   * @since 2.0
   */
  toRemoveReaction(
    emojis: string[] | IEmoji[] | (string | IEmoji)[],
    messageIdentifier?: string | IMessageIdentifier,
  ): TReturn;

  /**
   * Verify if a command pinned a message.
   *
   * @param messageId Id of the message
   *
   * @since 2.0
   */
  toPin(messageId: string): TReturn;
  /**
   * Verify if a command pinned a message.
   *
   * @param messageIdentifier Object with **id** or **content** of the message.
   *
   * @since 2.0
   */
  toPin(messageIdentifier: IMessageIdentifier): TReturn;

  /**
   * Verify if a command unpinned a message.
   *
   * @param messageId Id of the message
   * @param channelId Alternative channel that corde must check where the message will be pinned
   *
   * @since 2.0
   */
  toUnPin(messageId: string): TReturn;
  /**
   * Verify if a command unpinned a message.
   *
   * @param message Object with **id** or **content** of the message.
   *
   * @since 2.0
   */
  toUnPin(messageIdentifier: IMessageIdentifier): TReturn;

  /**
   * Verify if a command edited a message.
   *
   * @param newValue New value for the message.
   * @param messageIdentifier Data object with the **id** or **oldContent** of the message.
   *
   * @since 1.0
   */
  toEditMessage(
    newValue: string | number | boolean | IMessageEmbed,
    messageIdentifier?: string | IMessageEditedIdentifier,
  ): TReturn;

  /**
   * Verify if an embed message matches with the embed message sent by the bot
   * giving a command.
   *
   * @example
   *
   * // giving the returned embed of the command "embed"
   *
   *  {
   *    color: "#0099ff",
   *    title: "some one",
   *    description: "Some description here"
   *  }
   *
   *  // The follow test will pass because we are only cheching if the returning embed
   *  // has the color property equals.
   *
   *  expect("embed").toEmbedMatch({ color: "#0099ff" }); // Test pass
   *
   * @param embed Embed message to check with returned embed of an command.
   * @since 4.0
   */
  toEmbedMatch(embed: IMessageEmbed): TReturn;

  /**
   * Verify if a sent message **contains** the value informed in `expectedContent`.
   *
   * @example
   *
   * // Given the command "ping" that return "pong"
   *
   * expect("ping").toMessageContentContains("pon"); // Pass
   *
   *
   * @param expectedContent expected content to match the content of the returned message.
   * @since 4.0
   */
  toMessageContentContains(expectedContent: string): TReturn;
}

/**
 * Tests for a **Role** structure.
 */
export interface IRoleMatches<TReturn extends MayReturnMatch> {
  /**
   * Check if a command changed a role color.
   *
   * @param color The new color for the role.
   * @param roleId Id of the role.
   *
   * @since 2.0
   */
  toSetRoleColor(color: ColorResolvable, roleId: string): TReturn;
  /**
   * Check if a command changed a role color.
   *
   * @param color The new color for the role.
   * @param roleIdentifier Object with the **id** or the **name** of the role.
   *
   * @since 2.0
   */
  toSetRoleColor(color: ColorResolvable, roleIdentifier: IRoleIdentifier): TReturn;
  /**
   * Check if a command changed a role color.
   *
   * @param color Color enum in hexadecimal format.
   * @param roleId Object with the **id** or the **name** of the role.
   *
   * @since 2.0
   */
  toSetRoleColor(color: Colors, roleId: string): TReturn;
  /**
   * Check if a command changed a role color.
   *
   * @param color Color enum in hexadecimal format.
   * @param roleIdentifier Object with the **id** or the **name** of the role.
   *
   * @since 2.0
   */
  toSetRoleColor(color: Colors, roleIdentifier: IRoleIdentifier): TReturn;

  /**
   * Check if a command deletes a role.
   * @param roleId Id of the role.
   * @since 2.0
   */
  toDeleteRole(roleId: string): TReturn;

  /**
   * Check if a command deletes a role.
   * @param roleIdentifier Object with **id** or **name** of the role
   * @since 2.0
   */
  toDeleteRole(roleIdentifier: IRoleIdentifier): TReturn;

  /**
   * Check if a command defines a role as mentionable.
   *
   * @param mentionable If the role can or can not be mentionable.
   * @param roleId Id of the role.
   *
   * @since 2.0
   */
  toSetRoleMentionable(mentionable: boolean, roleId: string): TReturn;
  /**
   * Check if a command defines a role as mentionable.
   *
   * @param mentionable If the role can or can not be mentionable.
   * @param roleIdentifier Object with **id** or **name** of the role.
   *
   * @since 2.0
   */
  toSetRoleMentionable(mentionable: boolean, roleIdentifier: IRoleIdentifier): TReturn;

  /**
   * Check if a commend defines a role as a hoist.
   *
   * @param hoist if this role is pinned in the user listing.
   * @param roleId Id of the role.
   *
   * @description Discord provides two methods of displaying roles; hoisted and standard.
   * The role hierarchy is visibly clear to server members; roles are sorted and displayed
   * based on which role is higher in the role management menu.
   *
   * However, in a standard configuration, users are sorted alphabetically, meaning someone
   * with the highest role will be sorted wherever their name exists in the alphabet.
   *
   * Source from [discord support](https://support.discord.com/hc/en-us/community/posts/360060076751-Un-hoisted-Role-Hierarchy).
   * @see https://discord.com/developers/docs/topics/permissions
   * @since 2.0
   */
  toSetRoleHoist(hoist: boolean, roleId: string): TReturn;
  /**
   * Check if a commend defines a role as a hoist.
   *
   * @param hoist if this role is pinned in the user listing.
   * @param roleIdentifier Object with **id** or **name** of the role.
   *
   * @description Discord provides two methods of displaying roles; hoisted and standard.
   * The role hierarchy is visibly clear to server members; roles are sorted and displayed
   * based on which role is higher in the role management menu.
   *
   * However, in a standard configuration, users are sorted alphabetically, meaning someone
   * with the highest role will be sorted wherever their name exists in the alphabet.
   *
   * Source from [discord support](https://support.discord.com/hc/en-us/community/posts/360060076751-Un-hoisted-Role-Hierarchy).
   * @see https://discord.com/developers/docs/topics/permissions
   * @since 2.0
   */
  toSetRoleHoist(hoist: boolean, roleIdentifier: IRoleIdentifier): TReturn;

  /**
   * Check if a command renames a role.
   *
   * @param newName new name of the role
   * @param roleId Id of the role.
   *
   * @since 2.0
   */
  toRenameRole(newName: string, roleId: string): TReturn;
  /**
   * Check if a command renames a role.
   *
   * @param newName new name of the role
   * @param roleIdentifier Object with **id** or **name** of the role
   *
   * @since 2.0
   */
  toRenameRole(newName: string, roleIdentifier: IRoleIdentifier): TReturn;

  /**
   * Check if a command changes a role's position.
   *
   * @param newPosition The new position of the role.
   * @param roleId Id of the role.
   *
   * @description Role's maximum value depends on the number of roles the guild Have.
   * So, if there are only 3 roles (including the default *everyone*), the maximum
   * position that a role can have is 2 (The count begins with 0, So: 0, 1, 2).
   *
   * @see https://discord.com/developers/docs/topics/permissions
   * @since 2.0
   */
  toSetRolePosition(newPosition: number, roleId: string): TReturn;
  /**
   * Check if a command changes a role's position.
   *
   * @param newPosition The new position of the role.
   * @param roleIdentifier Object with **id** or **name** of the role.
   *
   *
   * @description Role's maximum value depends on the number of roles the guild has.
   * So, if there are only 3 roles (including the default *everyone*), the maximum
   * position that a role can have is 2 (The count begins with 0, So: 0, 1, 2).
   *
   * @see https://discord.com/developers/docs/topics/permissions
   * @since 2.0
   */
  toSetRolePosition(newPosition: number, roleIdentifier: IRoleIdentifier): TReturn;

  /**
   * Check if a command change the
   * [permissions](https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags)
   * of a role.
   *
   * @param roleId Id of the role.
   * @param permissions List of permissions allowed by Discord.
   *
   * @see https://discord.com/developers/docs/topics/permissions#permissions
   * @since 2.0
   */
  toSetRolePermission(roleId: string, ...permissions: RolePermission[]): TReturn;
  /**
   * Check if a command change the
   * [permissions](https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags)
   * of a role.
   *
   * @param roleIdentifier Object with **id** or **name** of the role.
   * @param permissions List of permissions allowed by Discord.
   *
   * @see https://discord.com/developers/docs/topics/permissions#permissions
   * @since 2.0
   */
  toSetRolePermission(roleIdentifier: IRoleIdentifier, ...permissions: RolePermission[]): TReturn;
}

export interface IMacherContructorArgs {
  commandName: unknown;
  isNot?: boolean;
  channelIdToSendCommand?: string;
  channelId?: string;
  guildId?: string;
  isCascade?: boolean;
}

/**
 * Defines all functions that can be used
 * to check a bot reaction of a command.
 */
export type IMatches<TReturn extends MayReturnMatch> = IMessageMatches<TReturn> &
  IRoleMatches<TReturn>;

/**
 * Defines the initial value of expectations from
 * **command** function. It includes all matches and
 * the *not* statement. Which will deny the executed match
 */
export interface IIsNot<TMatchesResponse extends any, TResponse2 = void> {
  /**
   * Defines that command should **not** do something.
   * Use this if you can not precise what response a command will throw,
   * But know what it **can not** throw.
   */
  not: TMatchesResponse & TResponse2;
}

// We intentionally hide the real type of parameters are passed to todoInCasdade,
// to hide the implementation from the user.
export interface IToHaveResult {
  /**
   * Execute multiple assertions based on a single command.
   *
   * @example
   *
   * expect("command").toHaveResult(
   *  expect.toReturn("hello1"),
   *  expect.toReturn("hello2", "123124124")
   * );
   *
   * @param tests
   */
  toHaveResult(...tests: any[]): void;
}

export type InChannelMatches<TReturn extends MayReturnMatch> = IIsNot<IMessageMatches<TReturn>> &
  IMessageMatches<TReturn>;

export type InGuildMatches<TReturn extends MayReturnMatch> = IIsNot<IRoleMatches<TReturn>> &
  IRoleMatches<TReturn>;

export interface ISetGuildMatchers<TReturn extends MayReturnMatch> {
  /**
   * Specify a guild where tests will be **validated** in.
   *
   * @example
   *
   * // Suposing that the config is:
   * const cordeConfig = {
   *  guildId: "123",
   *  botPrefix: "!"
   * };
   *
   * expect("ping").inGuild("321").toRenameRole("new name", "1231241");
   *
   * @description This will send the message "!ping" in the channel defined in configs("123"),
   * and check if a message with content "pong" will be sent to the text channel of if "321".
   *
   * @param id Id of the channel
   */
  inGuild(id: string): InGuildMatches<TReturn>;
}

export interface ISetChannelMatchers<TReturn extends MayReturnMatch> {
  /**
   * Specify a channel where tests will be **validated** in.
   *
   * @example
   *
   * // Suposing that the config is:
   * const cordeConfig = {
   *  channelId: "123",
   *  botPrefix: "!"
   * };
   *
   * expect("ping").inChannel("321").toReturn("pong");
   *
   * @description This will send the message "!ping" in the channel defined in configs("123"),
   * and check if a message with content "pong" will be sent to the text channel of if "321".
   *
   * @param id Id of the channel
   */
  inChannel(id: string): InChannelMatches<TReturn>;
}

type IsNotWithHaveResults = IIsNot<IMatches<void>, IToHaveResult>;

export type AllMatches<TReturn extends MayReturnMatch> = IIsNot<IMatches<any>> &
  IMatches<TReturn> &
  ISetChannelMatchers<TReturn> &
  ISetGuildMatchers<TReturn>;

export type AllCommandMatches = IMatches<void> &
  IToHaveResult &
  IsNotWithHaveResults &
  ISetChannelMatchers<void> &
  ISetGuildMatchers<void>;

export interface ICommand extends AllMatches<any> {
  /**
   * Receives which command will be tested.
   *
   * Do not inform the command prefix if
   * it's already informed in **configs**
   *
   * @param commandNameResolvable Command name. (Empty strings will resolve failed test)
   * @param channelId Defines the channel where the command should be sent to.
   *
   * @returns An object with all possible tests to be done
   * in the bot.
   *
   * @since 1.0
   */
  <T extends (() => number | string) | number | string>(
    commandNameResolvable: T,
    channelId?: string,
  ): AllCommandMatches;
}

export interface ITestFilePattern {
  filesPattern: string[];
  ignorePattern?: string[];
}

export interface IVoiceChannelState {
  channel: VoiceChannel;
  connection?: VoiceConnection;
}
