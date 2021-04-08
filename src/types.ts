import {
  BitField,
  Collection,
  Guild,
  GuildChannel,
  Message,
  MessageEmbed,
  Role,
  RoleManager,
  TextChannel,
} from "discord.js";
import { Colors, ColorsHex, RolePermission } from "./utils";
import { EmbedFieldData } from "discord.js";
import { Stream } from "stream";
import { Events } from "./core/events";

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
export type Primitive = number | string | boolean;
export type ResolveFunction<TResult> = (value: TResult) => void;
export type RejectFunction = (reason?: any) => void;
export type EmojisType = string[] | EmojiLike[] | (string | EmojiLike)[];

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

export type Base64Resolvable = Buffer | string;

export type VerificationLevelType = "NONE" | "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH";

/**
 * @see https://discord.com/developers/docs/resources/guild#guild-object-verification-level
 */
export enum VerificationLevel {
  /**
   * Unrestricted
   */
  NONE = "NONE",
  /**
   * Must have verified email on account
   */
  LOW = "LOW",
  /**
   * Must be registered on Discord for longer than 5 minutes
   */
  MEDIUM = "MEDIUM",
  /**
   * Must be a member of the server for longer than 10 minutes
   */
  HIGH = "HIGH",
  /**
   * Must have a verified phone number
   */
  VERY_HIGH = "VERY_HIGH",
}

export type ColorResolvable =
  | "DEFAULT"
  | "WHITE"
  | "AQUA"
  | "GREEN"
  | "BLUE"
  | "YELLOW"
  | "PURPLE"
  | "LUMINOUS_VIVID_PINK"
  | "GOLD"
  | "ORANGE"
  | "RED"
  | "GREY"
  | "DARKER_GREY"
  | "NAVY"
  | "DARK_AQUA"
  | "DARK_GREEN"
  | "DARK_BLUE"
  | "DARK_PURPLE"
  | "DARK_VIVID_PINK"
  | "DARK_GOLD"
  | "DARK_ORANGE"
  | "DARK_RED"
  | "DARK_GREY"
  | "LIGHT_GREY"
  | "DARK_NAVY"
  | "BLURPLE"
  | "GREYPLE"
  | "DARK_BUT_NOT_BLACK"
  | "NOT_QUITE_BLACK"
  | "RANDOM"
  | [number, number, number]
  | number
  | ColorsHex
  | Colors
  | string;

export type ImageSize = 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096;
export type AllowedImageFormat = "webp" | "png" | "jpg" | "jpeg" | "gif";

/**
 * @see https://discord.com/developers/docs/resources/guild#guild-object-guild-features
 */
export type GuildFeaturesType =
  | "ANIMATED_ICON"
  | "BANNER"
  | "COMMERCE"
  | "COMMUNITY"
  | "DISCOVERABLE"
  | "FEATURABLE"
  | "INVITE_SPLASH"
  | "NEWS"
  | "PARTNERED"
  | "RELAY_ENABLED"
  | "VANITY_URL"
  | "VERIFIED"
  | "VIP_REGIONS"
  | "WELCOME_SCREEN_ENABLED";

/**
 * Defines Guild's features
 *
 * @see https://discord.com/developers/docs/resources/guild#guild-object-guild-features
 */
export enum GuildFeatures {
  /**
   * Guild has access to set an invite splash background
   */
  INVITE_SPLASH = "INVITE_SPLASH",
  /**
   * Guild has access to set 384kbps bitrate in voice (previously VIP voice servers)
   */
  VIP_REGIONS = "VIP_REGIONS",
  /**
   * Guild has access to set a vanity URL
   */
  VANITY_URL = "VANITY_URL",
  /**
   * Guild is verified
   */
  VERIFIED = "VERIFIED",
  /**
   * Guild is partnered
   */
  PARTNERED = "PARTNERED",
  /**
   * Guild can enable welcome screen, Membership Screening, and discovery, and receives community updates
   */
  COMMUNITY = "COMMUNITY",
  /**
   * Guild has access to use commerce features (i.e. create store channels)
   */
  COMMERCE = "COMMERCE",
  /**
   * Guild has access to create news channels
   */
  NEWS = "NEWS",
  /**
   * Guild is able to be discovered in the directory
   */
  DISCOVERABLE = "DISCOVERABLE",
  /**
   * Guild is able to be featured in the directory
   */
  FEATURABLE = "FEATURABLE",
  /**
   * Guild has access to set an animated guild icon
   */
  ANIMATED_ICON = "ANIMATED_ICON",
  /**
   * Guild has access to set a guild banner image
   */
  BANNER = "BANNER",
  /**
   * Guild has enabled the welcome screen
   */
  WELCOME_SCREEN_ENABLED = "WELCOME_SCREEN_ENABLED",
  /**
   * Guild has enabled [Membership Screening](https://discord.com/developers/docs/resources/guild#membership-screening-object)
   */
  MEMBER_VERIFICATION_GATE_ENABLED = "MEMBER_VERIFICATION_GATE_ENABLED",
  /**
   * Guild can be previewed before joining via Membership Screening or the directory
   */
  PREVIEW_ENABLED = "PREVIEW_ENABLED",
}

export type RecursiveReadonlyArray<T> = ReadonlyArray<T | RecursiveReadonlyArray<T>>;
export type SystemChannelFlagsString = "WELCOME_MESSAGE_DISABLED" | "BOOST_MESSAGE_DISABLED";
export type SystemChannelFlagsResolvable = BitFieldResolvable<SystemChannelFlagsString>;

export type BitFieldResolvable<T extends string> =
  | RecursiveReadonlyArray<T | number | Readonly<BitField<T>>>
  | T
  | number
  | Readonly<BitField<T>>;

export interface ImageURLOptions {
  format?: AllowedImageFormat;
  size?: ImageSize;
}

/**
 * System channel flags of Discord
 *
 * @see https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags
 */
export enum SystemChannelFlag {
  /**
   * Suppress member join notifications
   */
  SUPPRESS_JOIN_NOTIFICATIONS = "SUPPRESS_JOIN_NOTIFICATIONS",
  /**
   * Suppress server boost notifications
   */
  SUPPRESS_PREMIUM_SUBSCRIPTIONS = "SUPPRESS_PREMIUM_SUBSCRIPTIONS",
}

export type Locale =
  | "af-ZA"
  | "am-ET"
  | "ar-AE"
  | "ar-BH"
  | "ar-DZ"
  | "ar-EG"
  | "ar-IQ"
  | "ar-JO"
  | "ar-KW"
  | "ar-LB"
  | "ar-LY"
  | "ar-MA"
  | "arn-CL"
  | "ar-OM"
  | "ar-QA"
  | "ar-SA"
  | "ar-SY"
  | "ar-TN"
  | "ar-YE"
  | "as-IN"
  | "az-Cyrl-AZ"
  | "az-Latn-AZ"
  | "ba-RU"
  | "be-BY"
  | "bg-BG"
  | "bn-BD"
  | "bn-IN"
  | "bo-CN"
  | "br-FR"
  | "bs-Cyrl-BA"
  | "bs-Latn-BA"
  | "ca-ES"
  | "co-FR"
  | "cs-CZ"
  | "cy-GB"
  | "da-DK"
  | "de-AT"
  | "de-CH"
  | "de-DE"
  | "de-LI"
  | "de-LU"
  | "dsb-DE"
  | "dv-MV"
  | "el-GR"
  | "en-029"
  | "en-AU"
  | "en-BZ"
  | "en-CA"
  | "en-GB"
  | "en-IE"
  | "en-IN"
  | "en-JM"
  | "en-MY"
  | "en-NZ"
  | "en-PH"
  | "en-SG"
  | "en-TT"
  | "en-US"
  | "en-ZA"
  | "en-ZW"
  | "es-AR"
  | "es-BO"
  | "es-CL"
  | "es-CO"
  | "es-CR"
  | "es-DO"
  | "es-EC"
  | "es-ES"
  | "es-GT"
  | "es-HN"
  | "es-MX"
  | "es-NI"
  | "es-PA"
  | "es-PE"
  | "es-PR"
  | "es-PY"
  | "es-SV"
  | "es-US"
  | "es-UY"
  | "es-VE"
  | "et-EE"
  | "eu-ES"
  | "fa-IR"
  | "fi-FI"
  | "fil-PH"
  | "fo-FO"
  | "fr-BE"
  | "fr-CA"
  | "fr-CH"
  | "fr-FR"
  | "fr-LU"
  | "fr-MC"
  | "fy-NL"
  | "ga-IE"
  | "gd-GB"
  | "gl-ES"
  | "gsw-FR"
  | "gu-IN"
  | "ha-Latn-NG"
  | "he-IL"
  | "hi-IN"
  | "hr-BA"
  | "hr-HR"
  | "hsb-DE"
  | "hu-HU"
  | "hy-AM"
  | "id-ID"
  | "ig-NG"
  | "ii-CN"
  | "is-IS"
  | "it-CH"
  | "it-IT"
  | "iu-Cans-CA"
  | "iu-Latn-CA"
  | "ja-JP"
  | "ka-GE"
  | "kk-KZ"
  | "kl-GL"
  | "km-KH"
  | "kn-IN"
  | "kok-IN"
  | "ko-KR"
  | "ky-KG"
  | "lb-LU"
  | "lo-LA"
  | "lt-LT"
  | "lv-LV"
  | "mi-NZ"
  | "mk-MK"
  | "ml-IN"
  | "mn-MN"
  | "mn-Mong-CN"
  | "moh-CA"
  | "mr-IN"
  | "ms-BN"
  | "ms-MY"
  | "mt-MT"
  | "nb-NO"
  | "ne-NP"
  | "nl-BE"
  | "nl-NL"
  | "nn-NO"
  | "nso-ZA"
  | "oc-FR"
  | "or-IN"
  | "pa-IN"
  | "pl-PL"
  | "prs-AF"
  | "ps-AF"
  | "pt-BR"
  | "pt-PT"
  | "qut-GT"
  | "quz-BO"
  | "quz-EC"
  | "quz-PE"
  | "rm-CH"
  | "ro-RO"
  | "ru-RU"
  | "rw-RW"
  | "sah-RU"
  | "sa-IN"
  | "se-FI"
  | "se-NO"
  | "se-SE"
  | "si-LK"
  | "sk-SK"
  | "sl-SI"
  | "sma-NO"
  | "sma-SE"
  | "smj-NO"
  | "smj-SE"
  | "smn-FI"
  | "sms-FI"
  | "sq-AL"
  | "sr-Cyrl-BA"
  | "sr-Cyrl-CS"
  | "sr-Cyrl-ME"
  | "sr-Cyrl-RS"
  | "sr-Latn-BA"
  | "sr-Latn-CS"
  | "sr-Latn-ME"
  | "sr-Latn-RS"
  | "sv-FI"
  | "sv-SE"
  | "sw-KE"
  | "syr-SY"
  | "ta-IN"
  | "te-IN"
  | "tg-Cyrl-TJ"
  | "th-TH"
  | "tk-TM"
  | "tn-ZA"
  | "tr-TR"
  | "tt-RU"
  | "tzm-Latn-DZ"
  | "ug-CN"
  | "uk-UA"
  | "ur-PK"
  | "uz-Cyrl-UZ"
  | "uz-Latn-UZ"
  | "vi-VN"
  | "wo-SN"
  | "xh-ZA"
  | "yo-NG"
  | "zh-CN"
  | "zh-HK"
  | "zh-MO"
  | "zh-SG"
  | "zh-TW"
  | "zu-ZA";
