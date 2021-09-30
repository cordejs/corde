declare namespace corde {
  type KeyOf<T> = keyof T;

  type Stream = import("stream").Stream;
  type GuildCreateChannelOptions = import("discord.js").GuildCreateChannelOptions;
  type GuildCreateOptions = import("discord.js").GuildCreateOptions;
  type BitField<T> = import("discord.js").BitField<T>;

  export type FunctionOnly<T> = {
    [K in KeyOf<T>]: T[K] extends (...args: any[]) => any ? K : never;
  }[KeyOf<T>];

  export type PropOnly<T> = {
    [K in KeyOf<T>]: T[K] extends (...args: any[]) => any ? never : K;
  }[KeyOf<T>];

  export interface IDescribeClousure {
    <T extends unknown>(
      definitionResolvable: T,
      testDefinitions: (() => void) | (() => Promise<void>),
    ): void;
  }

  export interface ITestClousure {
    <T extends unknown>(
      definitionResolvable: T,
      testDefinitions: (() => void) | (() => Promise<void>),
      timeout?: number | undefined,
    ): void;
  }

  export interface IField {
    name: string;
    inline: boolean;
    value: string;
  }

  export interface IImage {
    url: string;
  }

  export interface IThumbnail {
    url: string;
  }

  export interface IEmoji {
    id?: string;
    name?: string;
  }

  export interface IAuthor {
    icon_url: string;
    name: string;
    url: string;
  }

  export interface IMinifiedEmbedMessage {
    author: IAuthor;
    color: number;
    description: string;
    fields: IField[];
    footer?: any;
    image: IImage;
    thumbnail: IThumbnail;
    timestamp?: any;
    title: string;
    type: string;
    url: string;
  }

  export interface IMessageIdentifier {
    /**
     * Text of a message, use it to find a message if you don't know
     * it's **id**.
     *
     * If there is more than one message with the same content,
     * Corde will handle the latest message sent.
     *
     * ps: To avoid possible inconsistencies, recommend using **id** for message search.
     */
    content?: string;
    /**
     * IIdentifier of the message
     */
    id?: string;
  }

  export interface IIdentifier {
    id?: string;
  }

  export interface IRoleIdentifier extends IIdentifier {
    name?: string;
  }

  export interface IChannelIdentifier extends IIdentifier {
    name?: string;
  }

  export type ChannelType = "voice" | "text" | "category";

  export interface IGuildCreateOptions extends GuildCreateOptions {
    name: string;
  }

  export interface ICreateChannelOptions extends GuildCreateChannelOptions {
    name: string;
  }

  export interface ICreateChannelOptionsSimple extends Omit<ICreateChannelOptions, "type"> {}

  export interface IGuildIdentifier extends IIdentifier {
    name?: string;
  }

  export interface IBaseRole {
    name?: string;
    color?: ColorResolvable;
    isHoist?: boolean;
    position?: number;
    permissions?: RolePermission;
    isMentionable?: boolean;
  }

  /**
   * Object contract used to identify messages in message edition tests.
   */
  export interface IMessageEditedIdentifier {
    /**
     * IIdentifier of the message
     */
    id?: string;
    /**
     * Old content of the message to identify it.
     */
    oldContent?: string;
  }

  export interface IMessageEmbedFooter {
    /**
     * footer text
     */
    text?: string;
    /**
     * URL of footer icon (only supports HTTP(s) and attachments)
     */
    iconURL?: string;
  }

  export interface IMessageEmbedImage {
    /**
     * source URL of the image (only supports HTTP(s) and attachments)
     */
    url: string;
    /**
     * Height of the image
     */
    height?: number;
    /**
     * width of the image
     */
    width?: number;
  }

  export interface IMessageEmbedThumbnail {
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

  export interface IFile {
    /**
     * Buffer, URL, or stream of the file.
     *
     * @see https://nodejs.org/api/stream.html
     * @see https://nodejs.org/api/buffer.html
     */
    attachment: Buffer | string | import("stream").Stream;
    /**
     * Name of the file
     */
    name?: string | null;
  }

  export interface IEmbedFieldData {
    name: string;
    value: string;
    inline?: boolean;
  }

  export interface IMessageEmbedAuthor {
    name?: string;
    url?: string;
    iconURL?: string;
  }

  /**
   * Main and optional information about an embedded message.
   */
  export interface IMessageEmbed {
    /**
     * author name **or** information
     */
    author?: IMessageEmbedAuthor | string;
    /**
     * color code of the embed
     */
    color?: ColorResolvable;
    /**
     * description of embed
     */
    description?: string;
    /**
     * fields information. An array of embed field objects
     */
    fields?: IEmbedFieldData[];
    /**
     * files URLs **or** information of the embed.
     */
    files?: (IFile | string)[];
    /**
     * Footer url **or** information
     */
    footer?: IMessageEmbedFooter | string;
    /**
     * IImage URL **or** information
     */
    image?: IMessageEmbedImage | string;
    /**
     * Source url of thumbnail (only supports HTTP(s) and attachments)
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
     * Guild can be discovered in the directory
     */
    DISCOVERABLE = "DISCOVERABLE",
    /**
     * Guild can be featured in the directory
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

  export interface IImageURLOptions {
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

  export interface IRoleData {
    name?: string;
    color?: ColorResolvable;
    hoist?: boolean;
    position?: number;
    permissions?: RolePermission;
    mentionable?: boolean;
  }

  export interface IMessageAuthor {
    id: string;
    isBot: boolean;
    createdAt: Date;
    username: string;
  }

  export namespace Config {
    export interface ICLIOptions {
      files: string;
      config: string;
    }
  }

  export type RolePermission =
    | "CREATE_INSTANT_INVITE"
    | "KICK_MEMBERS"
    | "BAN_MEMBERS"
    | "ADMINISTRATOR"
    | "MANAGE_CHANNELS"
    | "MANAGE_GUILD"
    | "ADD_REACTIONS"
    | "VIEW_AUDIT_LOG"
    | "PRIORITY_SPEAKER"
    | "STREAM"
    | "VIEW_CHANNEL"
    | "SEND_MESSAGES"
    | "SEND_TTS_MESSAGES"
    | "MANAGE_MESSAGES"
    | "EMBED_LINKS"
    | "ATTACH_FILES"
    | "READ_MESSAGE_HISTORY"
    | "MENTION_EVERYONE"
    | "USE_EXTERNAL_EMOJIS"
    | "VIEW_GUILD_INSIGHTS"
    | "CONNECT"
    | "SPEAK"
    | "MUTE_MEMBERS"
    | "DEAFEN_MEMBERS"
    | "MOVE_MEMBERS"
    | "USE_VAD"
    | "CHANGE_NICKNAME"
    | "MANAGE_NICKNAMES"
    | "MANAGE_ROLES"
    | "MANAGE_WEBHOOKS"
    | "MANAGE_EMOJIS";
}
