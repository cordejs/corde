import {
  ClientApplication,
  DefaultMessageNotifications,
  MessageActivity,
  MessageAttachment,
  MessageFlags,
  MessageMentions,
  MessageReaction,
  MessageReference,
  MessageType,
  PermissionOverwrites,
} from "discord.js";
import { Guild, GuildMember, Message } from "../structures";
import { DeepReadonly, GuildFeaturesType, IMessageAuthor, IMessageEmbed, Nullable } from "../types";
import { RolePermission } from "../utils";

export interface IEntityToSnapshot<T> {
  /**
   * Creates a **readonly** instance of this entity only with
   * all public properties.
   */
  createSnapshot(): DeepReadonly<T>;
}

export type SnapshotlyEntity<T> = T & IEntityToSnapshot<T>;

export interface IGuildSnapshot {
  /**
   * The ID of the voice channel where AFK members are moved
   */
  readonly afkChannelID: string | null;
  /**
   * The time in seconds before a user is counted as "away from keyboard"
   */
  readonly afkTimeout: number;
  /**
   * The ID of the application that created this guild (if applicable)
   */
  readonly applicationID: string | null;
  /**
   * The approximate amount of members the guild has.
   *
   * *Needs call **fetch** if you want to receive this parameter*
   */
  readonly approximateMemberCount: number | null;
  /**
   * The approximate amount of presences the guild has.
   *
   * *Needs call **fetch** if you want to receive this parameter*
   */
  readonly approximatePresenceCount: number | null;
  /**
   * Whether the guild is available to access. If it is not available, it indicates a server outage.
   */
  readonly isAvailable: boolean;
  /**
   * The hash of the guild banner.
   */
  readonly banner: string | null;
  /**
   * Whether the bot has been removed from the guild.
   */
  readonly isDeleted: boolean;
  /**
   * The description of the guild, if any.
   */
  readonly description: string | null;
  /**
   * The hash of the guild discovery splash image.
   */
  readonly discoverySplash: string | null;
  /**
   * The hash of the guild icon.
   */
  readonly icon: string | null;
  /**
   * The Unique ID of the guild, useful for comparisons.
   */
  readonly id: string;
  /**
   * The time corde's bot joined the guild.
   */
  readonly joinedAt: Date;
  /**
   * Whether has more than large_threshold members, 50 by default.
   */
  readonly isLarge: boolean;
  /**
   * The maximum amount of members the guild can have.
   */
  readonly maximumMembers: number | null;
  /**
   * The maximum amount of presences the guild can have.
   *
   * *Needs call **fetch** if you want to receive this parameter*
   */
  readonly maximumPresences: number | null;
  /**
   * The full amount of members in this guild.
   */
  readonly membersCount: number;
  /**
   * The required MFA level for the guild
   *
   * @see https://discord.com/developers/docs/resources/guild#guild-object-mfa-level
   */
  readonly mfaLevel: number;
  /**
   * The name of the guild
   */
  readonly name: string;
  /**
   * The user ID of this guild's owner
   */
  readonly ownerId: string;
  /**
   * If this guild is partnered
   */
  readonly isPartnered: boolean;
  /**
   * The preferred locale of a Community guild.
   * Used in server discovery and notices from Discord.
   *
   * Default is `en-US`
   */
  readonly preferredLocale: string;
  /**
   * The total number of boosts for this server
   */
  readonly premiumSubscriptionCount: number | null;
  /**
   * The id of the channel where admins and moderators
   * of Community guilds receive notices from Discord
   */
  readonly publicUpdatesChannelId: string | null;
  /**
   * The region the guild is located in
   *
   * @see https://discord.com/developers/docs/resources/voice#voice-region-object
   */
  readonly region: string;
  /**
   * An array of guild features partnered guilds have enabled.
   *
   * @see https://discord.com/developers/docs/resources/guild#guild-object-guild-features
   */
  readonly features: GuildFeaturesType[];
  /**
   * If this guild is verified
   */
  readonly isVerified: boolean;
  /**
   * Default message notification level.
   *
   * @see https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level
   */
  readonly defaultMessageNotifications: number | DefaultMessageNotifications;
}

export interface IChannelSnapshot {
  /**
   * The unique ID of the channel.
   */
  readonly id: string;
  /**
   *
   */
  readonly createdAt: Date;
  /**
   * Whether the channel has been deleted.
   */
  readonly isDeleted: boolean;
  /**
   * The type of the channel, either:
   *
   * * `dm` - a DM channel
   * * `text` - a guild text channel
   * * `voice` - a guild voice channel
   * * `category` - a guild category channel
   * * `news` - a guild news channel
   * * `store` - a guild store channel
   * * `stage` - a guild stage channel
   * * `unknown` - a generic channel of unknown type, could be Channel or GuildChannel
   *
   */
  readonly type: "dm" | "text" | "voice" | "group" | "category" | "news" | "store" | "unknown";
}

export interface IVoiceChannelSnapshot {
  /**
   * Whether the channel is editable by the client user
   */
  readonly isEditable: boolean;
  /**
   * Checks if the voice channel is full
   */
  readonly isFull: boolean;
  /**
   * Whether the channel is joinable by the client user
   */
  readonly isJoinable: boolean;
  /**
   * Checks if the client has permission to send audio to the voice channel
   */
  readonly isSpeakable: boolean;
  /**
   * The maximum amount of users allowed in this channel - 0 means unlimited.
   */
  readonly userLimit: number;
}

export interface ITextBasedChannelSnapshot extends IChannelSnapshot {
  /**
   * The date when the last pinned message was pinned, if there was one.
   */
  readonly lastPinAt: Date | null;
  /**
   * Whether or not the typing indicator is being shown in the channel.
   */
  readonly isTyping: boolean;
  /**
   * Number of times `startTyping` has been called
   */
  readonly typingCount: number;
  /**
   * The Message object of the last message in the channel, if one was sent.
   */
  readonly lastMessage: Nullable<Message>;
  /**
   * The ID of the last message sent in this channel, if one was sent.
   */
  readonly lastMessageId: string | undefined;
}

export interface ITextChannelSnapshot extends ITextBasedChannelSnapshot {
  /**
   * Whether the channel is deletable by the client user.
   */
  readonly isDeletable: boolean;
  /**
   * The guild the channel is in
   */
  readonly guild: Guild;
  /**
   * Whether the channel is manageable by the client user.
   */
  readonly isManageable: boolean;
  /**
   * A collection of cached members of this channel, mapped by their ID.
   * Members that can view this channel, if the channel is text based. Members in the channel, if the channel is voice based.
   */
  readonly members: GuildMember[];
  /**
   * The name of the guild channel.
   */
  readonly name: string;
  /**
   * Whether the guild considers this channel NSFW (Not Safe for Work)
   */
  readonly nsfw: boolean;
  /**
   * A list of permission overwrites in this channel for roles and users
   */
  readonly permissionOverwrites: PermissionOverwrites[];
  /**
   * If the permissionOverwrites match the parent channel, null if no parent.
   */
  readonly permissionsLocked: boolean | null;
  /**
   * The position of the channel
   */
  readonly position: number;
  /**
   * The ratelimit per user for this channel in seconds.
   */
  readonly rateLimitPerUser: number;
  /**
   * The raw position of the channel from discord.
   */
  readonly rawPosition: number;
  readonly topic: string | null;
  /**
   * Whether the channel is viewable by the client user.
   */
  readonly isViewable: boolean;
}

export interface IDMChannelSnapshot extends IChannelSnapshot {}

export interface INewsChannelSnapshot extends IChannelSnapshot {
  readonly nsfw: boolean;
  readonly topic?: string;
}

export interface IRoleSnapshot {
  /**
   * Integer representation of hexadecimal color code.
   */
  readonly color: number;
  /**
   * Creation time of the role.
   */
  readonly createdAt: Date;
  /**
   * Inform if this role was deleted.
   */
  readonly isDeleted: boolean;
  /**
   * Inform if this role can be edited.
   */
  readonly isEditable: boolean;
  /**
   * This role's color in hexadecimal.
   */
  readonly hexColor: string;
  /**
   * If this role is pinned in the user listing
   */
  readonly isHoist: boolean;
  /**
   * Id of this role.
   */
  readonly id: string;
  /**
   * Whether this role is managed by an integration
   */
  readonly isManaged: boolean;
  /**
   * Whether this role is mentionable
   */
  readonly isMentionable: boolean;
  /**
   * Name of this role.
   */
  readonly name: string;
  /**
   * Position of this role.
   *
   * @see https://discord.com/developers/docs/topics/permissions#permission-hierarchy
   */
  readonly position: number;
}

export interface IGuildChannelSnapshot extends IChannelSnapshot {
  readonly calculatedPosition: number;
  /**
   * Whether the member has been removed from the guild
   */
  readonly isDeleted: boolean;
  /**
   * Whether the channel is manageable by the client user
   */
  readonly isManageable: boolean;
  /**
   * A collection of members that can see this channel, mapped by their ID
   */
  readonly members: IGuildMemberSnapshot[];
  /**
   * The name of the guild channel
   */
  readonly name: string;
  /**
   * The ID of the category parent of this channel
   */
  readonly parentID?: string;
  /**
   * The position of the channel
   */
  readonly position: number;
  /**
   * The raw position of the channel from discord
   */
  readonly rawPosition: number;
  /**
   * Whether the channel is viewable by the client user
   */
  readonly isViewable: boolean;
  /**
   * If the permissionOverwrites match the parent channel, null if no parent
   */
  readonly isPermissionsLocked?: boolean;
}

export interface IGuildMemberSnapshot {
  /**
   * Whether this member is bannable by the client user
   */
  readonly isBanneable: boolean;
  /**
   * Whether the member has been removed from the guild
   */
  readonly isDeleted: boolean;
  /**
   * The displayed color of this member in base 10
   */
  readonly displayColor: number;
  /**
   * The nickname of this member, or their username if they don't have one.
   */
  readonly displayHexColor: string;
  /**
   * The guild that this member is part of.
   */
  readonly guild: IGuildSnapshot;
  /**
   * The ID of this member
   */
  readonly id: string;
  /**
   * The time this member joined the guild
   */
  readonly joinedAt: Date | null;
  /**
   * Whether this member is kickable by the client user
   */
  readonly isKickeable: boolean;
  /**
   * The Message object of the last message sent by the member in their guild, if one was sent.
   */
  readonly lastMessage?: IMessageSnapshot;
  /**
   * The ID of the channel for the last message sent by the member in their guild, if one was sent
   */
  readonly lastMessageChannelID: string | null;
  /**
   * The ID of the last message sent by the member in their guild, if one was sent
   */
  readonly lastMessageID: string | null;
  /**
   * Whether the client user is above this user in the hierarchy, according to role position and guild ownership.
   * This is a prerequisite for many moderative actions.
   */
  readonly isManageable: boolean;
  /**
   * The nickname of this member, if they have one.
   */
  readonly nickName: string | null;
  /**
   * The overall set of permissions for this member, taking only roles and owner status into account
   */
  readonly permissions: RolePermission[];
  /**
   * The overall set of permissions for this member, taking only roles and owner status into account
   */
  readonly premiumSince: Date | null;
  /**
   * The presence of this guild member
   */
  readonly presence: import("discord.js").Presence;
  /**
   * A list of roles belonging to this member
   */
  readonly roles: IRoleSnapshot[];
  /**
   * The user that this guild member instance represents
   */
  readonly user: import("discord.js").User;
  /**
   * The voice state of this member
   */
  readonly voiceState: import("discord.js").VoiceState;
}

export interface IMessageSnapshot {
  /**
   * Group activity
   */
  readonly activity?: MessageActivity;
  /**
   * Id of the channel the message was sent in.
   */
  readonly channelId: string;
  /**
   * Id of the guild the message was sent in.
   */
  readonly guildId?: string;
  /**
   * Supplemental application information for group activities
   */
  readonly application?: ClientApplication;
  /**
   * A collection of attachments in the message - e.g. Pictures - mapped by their ID
   */
  readonly attachments: MessageAttachment[];
  /**
   * The author of the message
   */
  readonly author: IMessageAuthor;
  /**
   * The channel that the message was sent in.
   */
  readonly channel: IChannelSnapshot;
  /**
   * The content of the message.
   */
  readonly content: string;
  /**
   * Whether this was a TTS (Text-to-Speech) message.
   */
  readonly tts: boolean;
  /**
   * Whether this message mentions everyone.
   */
  readonly mentionEveryone: boolean;
  /**
   * Roles specifically mentioned in this message.
   */
  readonly mentionedRoles: IRoleSnapshot[];
  /**
   * Roles specifically mentioned in this message.
   */
  readonly mentionedChannels: ITextChannelSnapshot[];
  /**
   * Used for validating a message was sent.
   */
  readonly nonce?: string;
  /**
   * The time the message was sent at
   */
  readonly createdAt: Date;
  /**
   * Whether the message is deletable by the client user
   */
  readonly isDeletable: boolean;
  /**
   * Whether this message has been deleted
   */
  readonly isDeleted: boolean;
  /**
   * Whether the message is editable by the client user
   */
  readonly isEditable: boolean;
  /**
   * The time the message was last edited at (if applicable)
   */
  readonly editedAt?: Date;
  /**
   * A list of embeds in the message - e.g. YouTube Player
   */
  readonly embeds: IMessageEmbed[];
  /**
   * Flags that are applied to the message
   */
  readonly flags: Readonly<MessageFlags>;
  /**
   * The guild the message was sent in (if in a guild channel)
   */
  readonly guild?: IGuildSnapshot;
  /**
   * Id of the message.
   */
  readonly id: string;
  /**
   * Represents the author of the message as a guild member.
   * Only available if the message comes from a guild where the author is still a member.
   */
  readonly authorAsGuildMember?: IGuildMemberSnapshot;
  /**
   * All valid mentions that the message contains
   */
  readonly mentions: MessageMentions;
  /**
   * Whether the message is pinnable by the client user
   */
  readonly isPinneable: boolean;
  /**
   * Whether or not this message is pinned
   */
  readonly isPinned: boolean;
  /**
   * Array with reactions belonging to this message
   */
  readonly reactions: MessageReaction[];
  /**
   * Message reference data
   */
  readonly reference?: MessageReference;
  /**
   * Whether or not this message was sent by Discord, not actually a user (e.g. pin notifications)
   */
  readonly isAuthorSystem: boolean;
  /**
   * The type of the message.
   *
   * @see https://discord.com/developers/docs/resources/channel#message-object-message-types
   */
  readonly type: MessageType;
  /**
   * The url to jump to this message
   */
  readonly url: string;
  /**
   * ID of the webhook that sent the message, if applicable
   */
  readonly webhookID?: string;
}
