declare namespace corde {
  // ----------------------------- Init of Discord.js Types -----------------------------

  type TextChannel = import("discord.js").TextChannel;
  export type PartialOrMessageReaction =
    | import("discord.js").MessageReaction
    | import("discord.js").PartialMessageReaction;

  export type Intent =
    | "GUILDS"
    | "GUILD_MEMBERS"
    | "GUILD_BANS"
    | "GUILD_EMOJIS_AND_STICKERS"
    | "GUILD_INTEGRATIONS"
    | "GUILD_WEBHOOKS"
    | "GUILD_INVITES"
    | "GUILD_VOICE_STATES"
    | "GUILD_PRESENCES"
    | "GUILD_MESSAGES"
    | "GUILD_MESSAGE_REACTIONS"
    | "GUILD_MESSAGE_TYPING"
    | "DIRECT_MESSAGES"
    | "DIRECT_MESSAGE_REACTIONS"
    | "DIRECT_MESSAGE_TYPING"
    | "GUILD_SCHEDULED_EVENTS"
    | "ALL";

  type User = import("discord.js").User;
  type Channel = import("discord.js").Channel;
  type Message = import("discord.js").Message;
  type PartialUser = import("discord.js").PartialUser;

  type MessageReaction = import("discord.js").MessageReaction;
  type PartialMessageReaction = import("discord.js").PartialMessageReaction;
  type TextBasedChannel = import("discord.js").TextBasedChannel;
  type Role = import("discord.js").Role;

  type GuildEmoji = import("discord.js").GuildEmoji;
  type GuildBan = import("discord.js").GuildBan;
  type Guild = import("discord.js").Guild;
  type GuildMember = import("discord.js").GuildMember;

  type PartialGuildMember = import("discord.js").PartialGuildMember;
  type Collection<T, U> = import("discord.js").Collection<T, U>;
  type PartialMessage = import("discord.js").PartialMessage;
  type Presence = import("discord.js").Presence;
  type VoiceState = import("discord.js").VoiceState;
  type DMChannel = import("discord.js").DMChannel;
  type NewsChannel = import("discord.js").NewsChannel;
  type MessageOptions = import("discord.js").MessageOptions;
  type CreateRoleOptions = import("discord.js").CreateRoleOptions;
  type VoiceChannel = import("discord.js").VoiceChannel;
  type CategoryChannel = import("discord.js").CategoryChannel;
  type AnyChannel = import("discord.js").AnyChannel;
  type VoiceConnection = import("@discordjs/voice").VoiceConnection;

  // ----------------------------- End of Discord.js types -----------------------------

  type KeyOf<T> = keyof T;

  type Stream = import("stream").Stream;
  type GuildCreateChannelOptions = import("discord.js").GuildChannelCreateOptions;
  type GuildCreateOptions = import("discord.js").GuildCreateOptions;
  type BitField<T> = import("discord.js").BitField<T>;
  type Permission = import("discord.js").PermissionString;

  export type FunctionOnly<T> = {
    [K in KeyOf<T>]: T[K] extends (...args: any[]) => any ? K : never;
  }[KeyOf<T>];

  export type PropOnly<T> = {
    [K in KeyOf<T>]: T[K] extends (...args: any[]) => any ? never : K;
  }[KeyOf<T>];

  export type GuildScheduleEventType = "SCHEDULED" | "ACTIVE" | "COMPLETED" | "CANCELED";

  export interface IEventResume {
    count: number;
    index: number;
    nonce: string | undefined;
  }

  export interface IVoiceChannelState {
    channel: VoiceChannel;
    connection?: VoiceConnection;
  }

  export interface ICreateChannelFilter extends IDefaultOptions {
    /**
     * Filter by the channel's name.
     */
    name?: string;
    /**
     * Filter by a channel that is Text (`TextChannel` | `DMChannel` | `NewsChannel`).
     */
    isText?: boolean;
  }

  export interface IDescribeClosure {
    /**
     * Create a group of tests.
     *
     * @param description Resolvable description of the group. It is often a string,
     * but can be sync or async functions, numbers, booleans... Functions will be executed to get the
     * primitive value of then.
     *
     * @param testDefinitions Function for Corde to invoke that will define inner suites a test
     *
     * @since 1.0
     */
    <T>(description: T, testDefinitions: (() => void) | (() => Promise<void>)): void;
  }

  export interface ITestClosure {
    /**
     * Define a single test. A test should contain one or more expectations that test action of
     * the discord bot.
     * A spec whose expectations all succeed will be passing and a spec with any failures will fail.
     *
     * @param expectationDescription Textual description of what this test is checking
     * @param assertion Function that contains the code of your test. If not provided it will be ignored in the report.
     * @param timeout Custom timeout for an async test
     *
     * @since 1.0
     */
    <T>(
      description: T,
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

  export interface IDefaultOptions {
    /**
     * Time in seconds to corde waits for an event occur.
     */
    timeout?: number;
  }

  export interface IGuildMemberSpeakingFilter extends IGuildMemberIdentifier, IDefaultOptions {}
  export interface IGuildMemberUpdateFilter extends IGuildMemberIdentifier, IDefaultOptions {}
  export interface IGuildUnavailableFilter extends IGuildIdentifier, IDefaultOptions {}
  export interface IGuildUpdateFilter extends IGuildIdentifier, IDefaultOptions {}

  export interface IGuildMemberChunkFilter extends IDefaultOptions {
    /**
     * Filter by guild.
     */
    guild?: corde.IGuildIdentifier;
    /**
     * Filter by guild's members.
     */
    guildMembers?: corde.IGuildMemberIdentifier[];
  }

  export interface IEmojiDeleteFilter extends IEmojiCreateFilter {}
  export interface IEmojiUpdateFilter extends IEmojiCreateFilter {}

  export interface IGuildMemberRemoveFilter extends IGuildMemberAvailableFilter {}

  export interface IGuildMemberAvailableFilter extends IDefaultOptions {
    /**
     * Filter by guild member.
     */
    member?: corde.IGuildMemberIdentifier;
  }

  export interface IGuildMemberAddFilter extends IDefaultOptions {
    /**
     * Filter by guild member.
     */
    member?: corde.IGuildMemberIdentifier;
    /**
     * Filter by guild identifier.
     */
    guild?: corde.IGuildIdentifier;
    /**
     * Filter by user's identifier.
     */
    user?: corde.IUserIdentifier;
  }

  export interface IEmojiCreateFilter extends IDefaultOptions {
    /**
     * Filter by emoji.
     */
    emoji?: corde.IEmoji;
  }

  export interface IChannelPinsUpdateFilter extends IChannelDeleteFilter {}
  export interface IChannelUpdateFilter extends IChannelDeleteFilter {}

  export interface IChannelDeleteFilter extends IDefaultOptions {
    /**
     * Filter by a channel's identifier.
     */
    channel?: IChannelIdentifier;
  }

  export interface IMessageDeleteBulkFilter extends IDefaultOptions {
    options?: Omit<IMessageDeleteFilter, "timeout"> | Omit<IMessageDeleteFilter, "timeout">[];
  }

  export interface IMessageDeleteFilter extends IMessageEventFilter {}

  export interface IPresenceUpdateEventOptions {
    /**
     * Filter by user's identifier.
     */
    user?: corde.IUserIdentifier;
    /**
     * Filter by the presence status.
     */
    presenceStatus?: import("discord.js").PresenceStatus;
    /**
     * Filter by guild's identifier.
     */
    guild?: corde.IGuildIdentifier;
    /**
     * Filter by client presence.
     */
    clientPresence?: import("discord.js").ClientPresenceStatusData;
  }

  export interface IRoleCreateEventFilter extends IDefaultOptions {
    /**
     * Filter by role's name.
     */
    name?: string;
    /**
     * Filter by guild's identifier.
     */
    guild?: corde.IGuildIdentifier;
  }

  export interface IRoleUpdateEventFilter extends IDefaultOptions, IRoleIdentifier {}
  export interface IRoleRenamedEventOptions extends IRoleUpdateEventFilter {}

  export interface IMessageEventFilter extends IDefaultOptions {
    /**
     * Filter by a message's identifier.
     */
    message?: IMessageIdentifier;
    /**
     * Filter by a author's identifier.
     */
    author?: IAuthorIdentifier;
    /**
     * Filter by a channel's identifier.
     */
    channel?: IChannelIdentifier;
  }

  export interface IAuthorIdentifier {
    /**
     * User's id.
     */
    id?: string;
    /**
     * User's username.
     */
    username?: string;
    /**
     * Filter by if the author is or not a bot.
     */
    isBot?: boolean;
  }

  export interface IMessageReactionAddFilter extends IMessageReactionRemoveFilter {}

  export interface IMessageReactionRemoveAllOptions extends IMessageIdentifier, IDefaultOptions {}
  export interface IMessageUpdateFilter extends IMessageIdentifier, IDefaultOptions {}

  export interface IMessageReactionRemoveFilter extends IDefaultOptions {
    /**
     * Filter by the reaction emoji.
     */
    emoji?: IEmoji;
    /**
     * Filter by the message that the reaction belong
     */
    message?: IMessageIdentifier;
    /**
     * Filter by the author of the reaction.
     */
    author?: IAuthorIdentifier;
    /**
     * Filter by the channel where the message that the reaction
     * belongs to.
     */
    channel?: IChannelIdentifier;
  }

  export interface IMessageReactionRemoveEmojiFilter extends IDefaultOptions {
    /**
     * Filter by a emoji.
     */
    emoji?: IEmoji;
    /**
     * Filter by the message that the reaction belong
     */
    message?: IMessageIdentifier;
    /**
     * Filter by the channel where the message that the reaction
     * belongs to.
     */
    channel?: IChannelIdentifier;
  }

  export interface ISearchMessageReactionsFilter extends IDefaultOptions {
    /**
     * Filter by a collection of emojis.
     */
    emojis?: IEmoji[];
    /**
     * Filter by the message that the reaction belong
     */
    message?: IMessageIdentifier;
    /**
     * Filter by the author of the reaction.
     */
    author?: IAuthorIdentifier;
    /**
     * Filter by the channel where the message that the reaction
     * belongs to.
     */
    channel?: IChannelIdentifier;
  }

  export interface IMessageContentEvent
    extends Omit<corde.IMessageEventFilter, "messageIdentifier"> {}

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

  export interface IRoleIdentifier {
    /**
     * Role's id.
     */
    id?: string;
    /**
     * Role's name.
     */
    name?: string;
  }

  export type RoleIdentifier = {
    name?: string;
  } & IIdentifier;

  export interface IChannelIdentifier {
    /**
     * Channel's id
     */
    id?: string;
    /**
     * Channel's name (If exists)
     */
    name?: string;
  }

  export type ChannelType = "voice" | "text" | "category";

  export interface IGuildCreateFilter extends IDefaultOptions {
    /**
     * Filter by guild's name.
     */
    name?: string;
  }

  export interface IPresenceUpdateFilter extends IDefaultOptions {
    /**
     * Filter by the user that refers to the presence.
     */
    user?: corde.IUserIdentifier;
    /**
     * Filter by presence status
     */
    presenceStatus?: import("discord.js").PresenceStatus;
    /**
     * Filter by guild's identififer.
     */
    guild?: corde.IGuildIdentifier;
    /**
     * Filter by client presence.
     */
    clientPresence?: import("discord.js").ClientPresenceStatusData;
  }

  export interface IGuildCreateOptions extends GuildCreateOptions {
    /**
     * Filter by guild's name.
     */
    name: string;
  }

  export interface ICreateChannelOptions extends GuildCreateChannelOptions {
    /**
     * Filter by channel's name.
     */
    name: string;
  }

  export interface IGuildBanRemoveFilter extends IGuildBanFilter {}

  export interface IGuildBanFilter extends IDefaultOptions {
    /**
     * Filter by guild's identifier.
     */
    guild?: corde.IGuildIdentifier;
    /**
     * Filter by user's identifier.
     */
    user?: corde.IUserIdentifier;
  }

  export interface ICreateChannelOptionsSimple extends Omit<ICreateChannelOptions, "type"> {}

  export interface IUserIdentifier extends IGuildIdentifier {}

  export interface IGuildDeleteFilter extends IDefaultOptions, IGuildIdentifier {}

  export interface IGuildIdentifier {
    /**
     * Guild's id.
     */
    id?: string;
    /**
     * Guild's name.
     */
    name?: string;
  }

  export interface IVoiceStateUpdateFilter extends IDefaultOptions {
    /**
     * Filter by voice status id;
     */
    id?: string;
    /**
     * Filter by VoiceChannel identifier where the state is from.
     */
    channel?: IChannelIdentifier;
    /**
     * Filter by the Guild where the state is from.
     */
    guild?: IGuildIdentifier;
    /**
     * Filter by a voice state that was self-deafened.
     */
    selfDeaf?: boolean;
    /**
     * Filter by a voice state that was self-muted.
     */
    selfMute?: boolean;
    /**
     * Filter by a voice state that was deafened server-wide.
     */
    serverDeaf?: boolean;
    /**
     * Filter by a voice state that was muted server-wide.
     */
    serverMute?: boolean;
    /**
     * Filter by id of a member's connection.
     */
    sessionID?: string;
    /**
     * Filter by a member that is streaming using "Screen Share"
     */
    streaming?: boolean;
    /**
     * Filter by a voice state that is with camera enabled.
     */
    selfVideo?: boolean;
  }

  export interface IGuildMemberIdentifier extends IIdentifier {
    nickname?: string;
  }

  export interface IBaseRole {
    name?: string;
    color?: ColorResolvable;
    isHoist?: boolean;
    position?: number;
    permissions?: Permission;
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
    text: string;
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
    name: string;
    url?: string;
    iconURL?: string;
  }

  export interface IRoleEventFilter extends IRoleIdentifier, IDefaultOptions {
    /**
     * Filter by a `Guild` identifier.
     */
    guild?: IGuildIdentifier;
  }

  export interface IRolePermissionUpdateFilter extends IRoleIdentifier, IDefaultOptions {
    /**
     * Filter by a `Guild` identifier.
     */
    guild?: IGuildIdentifier;
  }

  export interface IUserUpdateFilter extends IDefaultOptions {
    /**
     * Filter by a `User` identifier.
     */
    user?: IUserIdentifier;
  }

  /**
   * Main and optional information about an embedded message.
   */
  export interface IMessageEmbed {
    /**
     * author name **or** information
     */
    author?: import("discord.js").MessageEmbedAuthor | string | null;
    /**
     * color code of the embed
     */
    color?: import("discord.js").ColorResolvable | null;
    /**
     * description of embed
     */
    description?: string | null;
    /**
     * fields information. An array of embed field objects
     */
    fields?: IEmbedFieldData[] | null;
    /**
     * Footer url **or** information
     */
    footer?: import("discord.js").EmbedFooterData | null;
    /**
     * IImage URL **or** information
     */
    image?: IMessageEmbedImage | string | null;
    /**
     * Source url of thumbnail (only supports HTTP(s) and attachments)
     */
    thumbnailUrl?: import("discord.js").MessageEmbedThumbnail | null;
    /**
     * Timestamp of embed content **or** a Date object
     */
    timestamp?: number | Date | null;
    /**
     * Title of embed
     */
    title?: string | null;
    /**
     * Url of embed
     */
    url?: string | null;
  }

  export type Base64Resolvable = Buffer | string;

  export type VerificationLevelType = "NONE" | "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH";

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
    permissions?: Permission;
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

  export interface IBot {
    /**
     * Gets the voice channel state that corde's bot is connected in, If it's connected.
     * This property is filled when `joinVoiceChannel()` connects to a channel
     * and is cleared when `leaveVoiceChannel()` is called.
     */
    readonly voiceState: IVoiceChannelState | undefined;

    /**
     * Client of Discord.js
     */
    readonly client: import("discord.js").Client<boolean>;

    /**
     * Same of `this.getChannel()`
     * @throws Error if corde bot is not connected.
     */
    readonly channel: TextChannel;

    /**
     * Get all channels in **cache** of the bot.
     * @throws Error if corde bot is not connected.
     */
    readonly channels: AnyChannel[];

    /**
     * Same of `this.getGuild()`
     * @throws Error if corde bot is not connected.
     */
    readonly guild: Guild;

    /**
     * Members of the guild defined in configs
     * @throws Error if corde bot is not connected.
     */
    readonly guildMembers: GuildMember[];

    /**
     * Get all guilds in **cache** of the bot.
     * @throws Error if corde bot is not connected.
     */
    readonly guilds: Guild[];

    /**
     * Get all roles in **cache** of the guild
     * defined in configs.
     *
     * @throws Error if corde bot is not connected.
     */
    readonly roles: Role[];

    /**
     * Checks if corde's bot is connected and ready.
     */
    readonly isLoggedIn: boolean;

    /**
     * Checks if a given message was sent by corde's bot
     * @param message Sent message
     * @returns If corde's bot is the author of the message
     */
    isMessageAuthor(message: Message): boolean;

    /**
     * Joins corde's bot to a voice channel.
     * @param channelId Voice channel to corde's bot connect
     * @throws Error if corde bot is not connected.
     * @returns Voice connection state. This property can be get from `bot.voiceState`
     */
    joinVoiceChannel(channelId: string): Promise<IVoiceChannelState>;

    /**
     * Leaves a voice channel.
     * @throws Error if corde bot is not connected.
     */
    leaveVoiceChannel(): void;

    /**
     * From all channels in **cache**, get all that are of type text
     * @throws Error if corde bot is not connected.
     */
    getOnlyTextChannels(): (DMChannel | NewsChannel | TextChannel)[];

    /**
     * Checks if corde's bot is in a voice channel
     */
    isInVoiceChannel(): boolean;

    /**
     * Makes a fetch of a channel based on it's `id`.
     * @param id Id of the channel.
     * @throws Error if corde bot is not connected.
     * @returns Channel if it's found
     */
    fetchChannel(id: string): Promise<AnyChannel | undefined>;

    /**
     * Makes a fetch of a guild based on it's `id`.
     * @param id Id of the guild
     * @throws Error if corde bot is not connected.
     * @returns Guild if it's found
     */
    fetchGuild(id: string): Promise<Guild | undefined>;

    /**
     * Fetch for a role based on it's id, caching it after that.
     * @param roleId Id of the role.
     * @throws Error if corde's bot isn't connected yet.
     * @returns Fetched Role or undefined.
     */
    fetchRole(roleId: string): Promise<Role | undefined>;

    /**
     * Fetch for a role based on it's id, and it's guild's id, caching it after that.
     *
     * @param roleId Id of the role.
     * @param guildId Id of the guild.
     * @param fetchGuild Define if the guild should be fetched or searched in cache.
     *
     * @throws Error if corde's bot isn't connected yet.
     *
     * @returns Fetched Role or undefined.
     */
    fetchRole(roleId: string, guildId: string, fetchGuild?: boolean): Promise<Role | undefined>;

    /**
     * Gets the channel defined in `configs`
     * @throws Error if corde bot is not connected.
     */
    getChannel(): TextChannel;

    /**
     * Gets a channel from `client.channels.cache` based on the channel's id
     *
     * @param id Channel Id
     * @throws Error if corde bot is not connected.
     * @return Channel searched by it's id or undefined.
     */
    getChannel(id: string): TextChannel | undefined;

    /**
     * Gets a channel from `client.channels.cache` based on the channel's id or name
     *
     * @param identifier Channel's identifier
     * @throws Error if corde bot is not connected.
     * @return Channel searched or undefined.
     */
    getChannel(identifier: corde.IChannelIdentifier): TextChannel | undefined;

    /**
     * Gets the guild defined in `configs`
     * @throws Error if corde bot is not connected.
     */
    getGuild(): Guild;

    /**
     * Gets a guild from `client.channels.guild` based on the guild's id
     * @param id Guild Id
     * @throws Error if corde bot is not connected.
     * @return Guild searched by it's id or undefined.
     */
    getGuild(id: string): Guild | undefined;

    /**
     * Gets a guild from `client.guild.cache` based on the guild's id or name
     *
     * @param identifier Guild's identifier
     * @throws Error if corde bot is not connected.
     * @return Guild searched or undefined.
     */
    getGuild(identifier: corde.IGuildIdentifier): Guild | undefined;

    /**
     * Sends a message to the connected textChannel.
     *
     * **This function does not work without a test case**
     *
     * @param message Message to send
     *
     * @example
     *
     * // Works
     * test("test 1", () => {
     *    const message = await corde.bot.send("msg");
     *    expect(`editMessage ${message.id}`).toEditMessage({ id: message.id }, "newValue");
     * });
     *
     * // Do not Works
     * group("test 1", () => {
     *    const message = await corde.bot.send("msg");
     * });
     *
     * @throws Error if corde bot is not connected.
     * @throws Error If message is invalid.
     *
     * @returns null if message is empty, null or undefined.
     * Message if **message** is not empty and it was send to Discord.
     *
     * @since 2.0
     */
    send(message: string | number | boolean | bigint): Promise<Message>;
    send(message: MessageOptions): Promise<Message>;

    /**
     * Creates a new role inside the guild provided in configs.
     *
     * @param name Name of the role.
     * @throws CordeClientError if corde has not yet connect it's bot.
     * @returns A promise that return the created role.
     *
     * @since 2.1
     */
    createRole(name?: string): Promise<Role>;

    /**
     * Creates a new role inside the guild provided in configs.
     *
     * @param data Basic information's about the role.
     * @throws CordeClientError if corde has not yet connect it's bot.
     * @returns A promise that return the created role.
     *
     * @since 2.1
     */
    createRole(data: CreateRoleOptions): Promise<Role>;

    /**
     * Creates a new `guild` in defined in configs.
     *
     * Shortcut for:
     *
     * ```typescript
     * this.client.guilds.create("nameExample");
     * ```
     *
     * @param name Name of the new guild.
     * @throws Error if corde's bot isn't connected yet.
     * @returns Created guild.
     */
    createGuild(name: string): Promise<Guild>;

    /**
     * Creates a new `guild` in defined in configs.
     *
     * Shortcut for:
     *
     * ```typescript
     * this.client.guilds.create("exampleName", { ... });
     * ```
     *
     * @param options information's about the guild.
     * @throws Error if corde's bot isn't connected yet.
     * @returns Created guild.
     */
    createGuild(options: corde.IGuildCreateOptions): Promise<Guild>;

    /**
     * Creates a new channel in guild defined in configs.
     *
     * Shortcut for:
     *
     * ```typescript
     * this.client.channels.create("exampleName");
     * ```
     *
     * @param name Name of the new channel.
     * @throws Error if corde's bot isn't connected yet.
     * @returns Created channel.
     */
    createChannel(name: string): Promise<TextChannel>;

    /**
     * Creates a new channel in guild defined in configs.
     *
     * Shortcut for:
     *
     * ```typescript
     * this.client.channels.create("exampleName", { ... });
     * ```
     *
     * @param options information's about the channel, including it's type.
     * @throws Error if corde's bot isn't connected yet.
     * @returns Created channel.
     */
    createChannel(
      channelOptions: corde.ICreateChannelOptions,
    ): Promise<TextChannel | VoiceChannel | CategoryChannel>;

    /**
     * Creates a new **voice** channel in guild defined in configs.
     *
     * Shortcut for:
     *
     * ```typescript
     * this.client.channels.create("exampleName", { type: "voice" });
     * ```
     *
     * @param name Name of the new channel.
     * @throws Error if corde's bot isn't connected yet.
     * @returns Created channel.
     */
    createVoiceChannel(name: string): Promise<VoiceChannel>;

    /**
     * Creates a new **voice** channel in guild defined in configs.
     *
     * Shortcut for:
     *
     * ```typescript
     * this.client.channels.create("exampleName", { ..., type: "voice" });
     * ```
     *
     * @param options information's about the channel.
     * @throws Error if corde's bot isn't connected yet.
     * @returns Created channel.
     */
    createVoiceChannel(options: corde.ICreateChannelOptionsSimple): Promise<VoiceChannel>;

    /**
     * Creates a new **text** channel in guild defined in configs.
     *
     * Shortcut for:
     *
     * ```typescript
     * this.client.channels.create("exampleName", { type: "text" });
     * ```
     *
     * @param name Name of the new channel.
     * @throws Error if corde's bot isn't connected yet.
     * @returns Created channel.
     */
    createTextChannel(name: string): Promise<TextChannel>;

    /**
     * Creates a new **text** channel in guild defined in configs.
     *
     * Shortcut for:
     *
     * ```typescript
     * this.client.channels.create("exampleName", { ..., type: "text" });
     * ```
     *
     * @param options information's about the channel.
     * @throws Error if corde's bot isn't connected yet.
     * @returns Created channel.
     */
    createTextChannel(options: corde.ICreateChannelOptionsSimple): Promise<TextChannel>;

    /**
     * Creates a new **category** channel in guild defined in configs.
     *
     * Shortcut for:
     *
     * ```typescript
     * this.client.channels.create("exampleName", { type: "category" });
     * ```
     *
     * @param name Name of the new channel.
     * @throws Error if corde's bot isn't connected yet.
     * @returns Created channel.
     */
    createCategoryChannel(name: string): Promise<CategoryChannel>;

    /**
     * Creates a new **category** channel in guild defined in configs.
     *
     * Shortcut for:
     *
     * ```typescript
     * this.client.channels.create("exampleName", { ..., type: "category" });
     * ```
     *
     * @param options information's about the channel.
     * @throws Error if corde's bot isn't connected yet.
     * @returns Created channel.
     */
    createCategoryChannel(options: corde.ICreateChannelOptionsSimple): Promise<CategoryChannel>;

    /**
     * Finds a role in config guild's cache, basing on it's **id**
     *
     * @param id Id of the role.
     * @throws CordeClientError if corde's bot is not connected.
     * @returns Role that matches the provided **id** or **name**
     */
    getRole(id: string): Role | undefined;

    /**
     * Finds a role in config guild's cache, basing on it's **id** or **name**.
     *
     * @param data Data of the role. It can be it's **name** or **id**.
     *
     * if both information's be provided, and they are from two different
     * roles, the result will correspond to the role that match's with the parameter
     * **id**.
     *
     * @throws CordeClientError if corde's bot is not connected.
     * @returns Role that matches the provided **id** or **name**
     */
    getRole(data: corde.IRoleIdentifier): Role | undefined;
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
     * Channel where tests will run
     */
    channelId: string;
    /**
     * Guild where tests will run
     */
    guildId: string;
    /**
     * Defines how to identify bot calls
     */
    botPrefix: string;
    /**
     * Path for case tests. Use this from the base directory of the application
     */
    testMatches: string[];
    /**
     * Definition of all patterns to ignore in tests search
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
     * occur when importing a test file.
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
    useTimeoutValueInEventsDefaultParameters?: boolean;
    /**
     * If true, corde will connect it's bot when start tests.
     *
     * @default true
     */
    loginCordeBotOnStart?: boolean;
    /**
     * Defines the max amount of time that a test suite can run.
     *
     * @example
     *
     * // Being suiteTimeout = 1000; The test case bellow
     * // will wait for in maximum, 1 second
     * it("", async () => {
     *  await command("ping").should.respond("pong");
     * });
     *
     * @default this.timeout
     */
    suiteTimeout?: number;
    /**
     * Defines max amount of time that a command can run.
     *
     * Avoid put a value for this prop equal to `suiteTimeout`.
     * It can lead to suites existing as they are no tests inside.
     *
     * @default 5000
     */
    commandTimeout?: number;
    /**
     * Defines a timeout for all others timeouts.
     *
     * If any other timeout has value, they will overlay
     * any value provided to `timeout`
     *
     * If
     *
     * ```js
     * {
     *  timeout: 1000,
     *  commandTimeout: 2000
     * }
     * ```
     *
     * Then the value for `commandTimeout` will be 2000
     *
     * @default 10000
     */
    timeout?: number;
    /**
     * Defines how much time corde should wait for logging with it's bot
     *
     * @default this.timeout
     */
    loginTimeout?: number;
    /**
     * Define which intents corde's bot is allowed.
     *
     * @see https://discord.com/developers/docs/topics/gateway#gateway-intents
     * @default []
     */
    intents?: Intent[];
  }
}
