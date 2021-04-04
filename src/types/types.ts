import {
  Collection,
  ColorResolvable,
  Guild,
  GuildChannel,
  Message,
  MessageEmbed,
  Role,
  RoleManager,
  TextChannel,
} from "discord.js";
import { Colors, RolePermission } from "../utils";
import { EmbedFieldData } from "discord.js";
import { Stream } from "stream";
import { Events } from "../core/events";

export interface TestReport {
  pass: boolean;
  testName: string;
  message?: string;
  trace?: string;
}

export interface Author {
  icon_url: string;
  name: string;
  url: string;
}

export interface Field {
  name: string;
  inline: boolean;
  value: string;
}

export interface Image {
  url: string;
}

export interface Thumbnail {
  url: string;
}

export interface EmojiLike {
  id?: string;
  name?: string;
}

export interface MinifiedEmbedMessage {
  author: Author;
  color: number;
  description: string;
  fields: Field[];
  footer?: any;
  image: Image;
  thumbnail: Thumbnail;
  timestamp?: any;
  title: string;
  type: string;
  url: string;
}

export interface MessageIdentifier {
  /**
   * Text of a message, use it to find a message if you don't know
   * it's **id**.
   *
   * If there is more than one message with the same content,
   * Corde will handle the latest message sent.
   *
   * ps: To avoid possible inconsistences, recommend to use **id** for message search.
   */
  content?: string;
  /**
   * Identifier of the message
   */
  id?: string;
}

export interface Identifier {
  id?: string;
}

export interface RoleIdentifier extends Identifier {
  name?: string;
}

/**
 * Contract with necessary functions of Discord.js Client
 */
export interface CordeBotLike {
  readonly events: Events;
  readonly guild: Guild;
  readonly roleManager: RoleManager;
  readonly channel: TextChannel;
  readonly testBotId: string;
  /**
   * Authenticate Corde bot to the installed bot in Discord server.
   *
   * @param token Corde bot token
   *
   * @returns Promise resolve for success connection, or a promise
   * rejection with a formatted message if there was found a error in
   * connection attempt.
   */
  login(token: string): Promise<string>;
  /**
   * Destroy client connection.
   */
  logout(): void;
  /**
   * Sends a pure message without prefix it.
   * @param message Data to be send to channel
   */
  sendMessage(message: string | number | MessageEmbed): Promise<Message>;
  /**
   * Send a message to a channel defined in configs.
   *
   * @see Runtime
   *
   * @param message Message without prefix that will be sent to defined server's channel
   * @description The message is concatenated with the stored **prefix** and is sent to the channel.
   *
   * @return Promise rejection if a testing bot does not send any message in the timeout value setted,
   * or a resolve for the promise with the message returned by the testing bot.
   */
  sendTextMessage(message: string | number | boolean): Promise<Message>;
  /**
   * Observes for a message send by the testing bot after corde bot
   * send it's message.
   */
  awaitMessagesFromTestingBot(timeout: number, location?: ChannelLocation): Promise<Message>;
  /**
   * Checks if corde bot is connected
   */
  isLoggedIn(): boolean;
  findMessage(filter: (message: Message) => boolean): Promise<Message | undefined>;
  findMessage(data: MessageIdentifier): Promise<Message | undefined>;
  findMessage(
    data: MessageIdentifier | ((message: Message) => boolean),
  ): Promise<Message | undefined>;
  fetchRoles(): Promise<RoleManager | null>;
  fetchRole(id: string): Promise<Role | null>;
  hasRole(roleIdentifier: RoleIdentifier): Promise<boolean>;
  findRole(roleIdentifier: RoleIdentifier): Promise<Role | undefined>;
  getRoles(): Collection<string, Role>;
  findGuild(guildId: string): Guild;
  findChannel(guild: Guild, channelId: string): GuildChannel;
}

export type VoidLikeFunction = (() => void) | (() => PromiseLike<void>) | (() => Promise<void>);
export type TestFunctionType = (cordeBot: CordeBotLike) => Promise<TestReport>;
export type messageType = "text" | "embed";
export type messageOutputType = Message | MinifiedEmbedMessage;
export type messageExpectationType = string | MessageEmbed;
export type GenericFunction = (...args: any[]) => any;
export type Primitive = number | bigint | string | boolean;
export type ResolveFunction<TResult> = (value: TResult) => void;
export type RejectFunction = (reason?: any) => void;
export type EmojisType = string[] | EmojiLike[] | (string | EmojiLike)[];

export interface ChannelLocation {
  /**
   * Guild to locate the channel
   */
  guildId?: string;
  /**
   * Id of the channel
   */
  channelId: string;
}

/**
 * Get all function `T` parameters as they may be
 * optional.
 */
export type ParametersAsOptional<T extends GenericFunction> = Parameters<T> | void[];

/**
 * Available types of config files
 */
export type configFileType = "js" | "json" | "ts";

/**
 * Represents **command** structure
 */
export interface AssertionProps {
  commandName: string;
  expectation: messageExpectationType;
  usingTrueStatement: boolean;
  output?: messageOutputType;
  messageType: messageType;
}

/**
 * Represents **test** structure
 */
export interface Test {
  name?: string | number | boolean;
  subTests?: Test[];
  testsFunctions: TestFunctionType[];
  testsReports?: TestReport[];
}

/**
 * Represents **group** structure
 */
export interface Group {
  name?: string | number | boolean;
  subGroups?: Group[];
  tests: Test[];
}

/**
 * Contain all tests cases | groups of a test file.
 */
export interface TestFile {
  path: string;
  groups: Group[];
  isEmpty: boolean;
}

export interface BaseRole {
  name?: string;
  color?: ColorResolvable | Colors;
  isHoist?: boolean;
  position?: number;
  permissions?: RolePermission;
  isMentionable?: boolean;
}

/**
 * Contains a set of properties needed for execution of corde
 */
export interface ConfigOptions {
  /**
   * Fake bot used to test the really one
   */
  cordeTestToken: string;
  /**
   * User's bot that will be tested
   */
  botTestId: string;
  /**
   * User's bot token that will run.
   */
  botTestToken: string;
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
   */
  timeOut?: number;
  /**
   * Defines how identify bot calls
   */
  botPrefix: string;
  /**
   * Path for case tests. Use this from the base directory of the application
   */
  testFiles: string[];
}

/**
 * Object contract used to identify messages in message
 * edition tests.
 */
export interface MessageEditedIdentifier {
  /**
   * Identifier of the message
   */
  id?: string;
  /**
   * Old content of the message to identify it.
   */
  oldContent?: string;
}

export interface SemiRunnerReport {
  totalTests: number;
  totalEmptyTests: number;
  totalEmptyTestFiles: number;
  totalTestFiles: number;
  totalTestsPassed: number;
  totalTestsFailed: number;
  totalTestFilesPassed: number;
  totalTestFilesFailed: number;
}

export interface RunnerReport extends SemiRunnerReport {
  testTimer: string;
}

export interface MessageEmbedAuthor {
  name?: string;
  url?: string;
  iconURL?: string;
}

export interface MessageEmbedFooter {
  /**
   * footer text
   */
  text?: string;
  /**
   * url of footer icon (only supports http(s) and attachments)
   */
  iconURL?: string;
}

export interface MessageEmbedImage {
  /**
   * source url of image (only supports http(s) and attachments)
   */
  url: string;
  /**
   * height of image
   */
  height?: number;
  /**
   * width of image
   */
  width?: number;
}

export interface MessageEmbedThumbnail {
  /**
   * Url of the thumbnail
   */
  url: string;
  /**
   * Height of the thumbnail
   */
  height?: number;
  /**
   * width of the thumbnail
   */
  width?: number;
}

export interface FileLike {
  /**
   * Buffer, URL or stream of the file.
   *
   * @see https://nodejs.org/api/stream.html
   * @see https://nodejs.org/api/buffer.html
   */
  attachment: Buffer | string | Stream;
  /**
   * Name of the file
   */
  name: string;
}

/**
 * Main and optional informations about a embed message.
 */
export interface MessageEmbedLike {
  /**
   * author name **or** information
   */
  author?: MessageEmbedAuthor | string;
  /**
   * color code of the embed
   */
  color?: ColorResolvable;
  /**
   * description of embed
   */
  description?: string;
  /**
   * fields information. Array of embed field objects
   */
  fields?: EmbedFieldData[];
  /**
   * files urls **or** informations of the embed.
   */
  files?: (FileLike | string)[];
  /**
   * Footer url **or** information
   */
  footer?: MessageEmbedFooter | string;
  /**
   * Image URL **or** information
   */
  image?: MessageEmbedImage | string;
  /**
   * Source url of thumbnail (only supports http(s) and attachments)
   */
  thumbnailUrl?: string;
  /**
   * Timestamp of embed content **or** a Date object
   */
  timestamp?: number | Date;
  /**
   * Title of embed
   */
  title?: string;
  /**
   * Url of embed
   */
  url?: string;
}
