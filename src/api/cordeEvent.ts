import {
  Channel,
  Collection,
  Guild,
  GuildEmoji,
  GuildMember,
  Message,
  MessageReaction,
  PartialGuildMember,
  PartialMessage,
  PartialUser,
  Presence,
  Role,
  User,
  VoiceState,
} from "discord.js";
import { runtime } from "../core";

interface IDefault {
  authorId?: string | null;
  channelId?: string | null;
  timeout?: number | null;
  [val: string]: any;
}

function getDefaultOptionsIfNeeded<T extends any>(options?: any): T {
  const op = options as IDefault;
  return {
    authorId: op?.authorId ?? runtime.configs.botTestId,
    channelId: op?.channelId ?? runtime.configs.channelId,
    timeout: op?.timeout ?? runtime.configs.timeout,
    ...op,
  } as any;
}

/**
 * @global
 */
export const cordeEvent: corde.IOnceEvents = {
  /**
   * @global
   */
  onceMessage(options?: corde.IMessageEventOptions) {
    return runtime.events.onceMessage(getDefaultOptionsIfNeeded(options));
  },
  /**
   * @global
   */
  onceMessageReactionsAdd(options?: corde.ISearchMessageReactionsOptions) {
    return runtime.events.onceMessageReactionsAdd(getDefaultOptionsIfNeeded(options));
  },
  /**
   * @global
   */
  onceChannelCreate(options?: corde.ICreateChannelFilter) {
    return runtime.events.onceChannelCreate({
      timeout: options?.timeout ?? runtime.configs.timeout,
      ...options,
    });
  },
  /**
   * @global
   */
  onceMessageReactionAdd: function (
    options?: corde.IMessageReactionAddOptions,
  ): Promise<[MessageReaction, User | PartialUser]> {
    return runtime.events.onceMessageReactionAdd(getDefaultOptionsIfNeeded(options));
  },
  /**
   * @global
   */
  onceMessageReactionRemoveEmoji: function (
    options?: corde.IMessageReactionRemoveOptions,
  ): Promise<MessageReaction> {
    return runtime.events.onceMessageReactionRemoveEmoji(getDefaultOptionsIfNeeded(options));
  },
  /**
   * @global
   */
  onceChannelDelete: function (options?: corde.IChannelDeleteOptions): Promise<Channel> {
    return runtime.events.onceChannelDelete({
      channelIdentifier: options?.channelIdentifier ?? { id: runtime.configs.channelId },
      timeout: options?.timeout ?? runtime.configs.timeout,
      ...options,
    });
  },
  /**
   * @global
   */
  onceChannelPinsUpdate: function (
    options?: corde.IChannelPinsUpdateOptions,
  ): Promise<[Channel, Date]> {
    return runtime.events.onceChannelPinsUpdate({
      channelIdentifier: options?.channelIdentifier ?? { id: runtime.configs.channelId },
      timeout: options?.timeout ?? runtime.configs.timeout,
      ...options,
    });
  },
  /**
   * @global
   */
  onceChannelUpdate: function (options?: corde.IChannelUpdateOptions): Promise<[Channel, Channel]> {
    return runtime.events.onceChannelUpdate({
      channelIdentifier: options?.channelIdentifier ?? { id: runtime.configs.channelId },
      timeout: options?.timeout ?? runtime.configs.timeout,
      ...options,
    });
  },
  /**
   * @global
   */
  onceRoleDelete: function (options?: corde.IRoleEventOptions): Promise<Role> {
    return runtime.events.onceRoleDelete({
      guildId: options?.guildId ?? runtime.configs.guildId,
      timeout: options?.timeout ?? runtime.configs.timeout,
      ...options,
    });
  },
  /**
   * @global
   */
  onceEmojiCreate: function (options?: corde.IEmojiCreateOptions): Promise<GuildEmoji> {
    return runtime.events.onceEmojiCreate({
      timeout: options?.timeout ?? runtime.configs.timeout,
      ...options,
    });
  },
  /**
   * @global
   */
  onceEmojiDelete: function (options?: corde.IEmojiDeleteOptions): Promise<GuildEmoji> {
    return runtime.events.onceEmojiDelete({
      timeout: options?.timeout ?? runtime.configs.timeout,
      ...options,
    });
  },
  /**
   * @global
   */
  onceEmojiUpdate: function (
    options?: corde.IEmojiUpdateOptions,
  ): Promise<[GuildEmoji, GuildEmoji]> {
    return runtime.events.onceEmojiUpdate({
      timeout: options?.timeout ?? runtime.configs.timeout,
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildBan: function (options?: corde.IGuildBanOptions): Promise<[Guild, User]> {
    return runtime.events.onceGuildBan({
      guildIdentifier: options?.guildIdentifier ?? { id: runtime.configs.guildId },
      timeout: options?.timeout ?? runtime.configs.timeout,
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildBanRemove: function (options?: corde.IGuildBanRemoveOptions): Promise<[Guild, User]> {
    return runtime.events.onceGuildBanRemove({
      guildIdentifier: options?.guildIdentifier ?? { id: runtime.configs.guildId },
      timeout: options?.timeout ?? runtime.configs.timeout,
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildCreate: function (options?: corde.IGuildCreateFilterOptions): Promise<Guild> {
    return runtime.events.onceGuildCreate({
      timeout: options?.timeout ?? runtime.configs.timeout,
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildDelete: function (options?: corde.IGuildDeleteOptions): Promise<Guild> {
    return runtime.events.onceGuildDelete({
      timeout: options?.timeout ?? runtime.configs.timeout,
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildMemberAdd: function (options?: corde.IGuildMemberAddOptions): Promise<GuildMember> {
    return runtime.events.onceGuildMemberAdd({
      guild: options?.guild ?? { id: runtime.configs.guildId },
      timeout: options?.timeout ?? runtime.configs.timeout,
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildMemberAvailable: function (
    options?: corde.IGuildMemberAvailableOptions,
  ): Promise<GuildMember | PartialGuildMember> {
    return runtime.events.onceGuildMemberAvailable({
      timeout: options?.timeout ?? runtime.configs.timeout,
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildMemberRemove: function (
    options?: corde.IGuildMemberRemoveOptions,
  ): Promise<GuildMember | PartialGuildMember> {
    return runtime.events.onceGuildMemberRemove({
      timeout: options?.timeout ?? runtime.configs.timeout,
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildMemberChunk: function (
    options?: corde.IGuildMemberChunkOptions,
  ): Promise<[Collection<string, GuildMember>, Guild]> {
    return runtime.events.onceGuildMemberChunk({
      guild: options?.guild ?? { id: runtime.configs.guildId },
      timeout: options?.timeout ?? runtime.configs.timeout,
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildMemberSpeaking: function (
    options?: corde.IGuildMemberSpeakingOptions,
  ): Promise<GuildMember | PartialGuildMember> {
    return runtime.events.onceGuildMemberSpeaking({
      timeout: options?.timeout ?? runtime.configs.timeout,
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildMemberUpdate: function (
    options?: corde.IGuildMemberUpdateOptions,
  ): Promise<[GuildMember | PartialGuildMember, GuildMember]> {
    return runtime.events.onceGuildMemberUpdate({
      timeout: options?.timeout ?? runtime.configs.timeout,
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildUnavailable: function (options?: corde.IGuildUnvailableOptions): Promise<Guild> {
    return runtime.events.onceGuildUnavailable({
      timeout: options?.timeout ?? runtime.configs.timeout,
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildUpdate: function (options?: corde.IGuildUnvailableOptions): Promise<[Guild, Guild]> {
    return runtime.events.onceGuildUpdate({
      timeout: options?.timeout ?? runtime.configs.timeout,
      ...options,
    });
  },
  /**
   * @global
   */
  onceMessageDelete: function (
    options?: corde.IMessageDeleteOptions,
  ): Promise<Message | PartialMessage> {
    return runtime.events.onceMessageDelete({
      authorId: options?.authorId ?? runtime.configs.botTestId,
      channelId: options?.channelId ?? runtime.configs.channelId,
      timeout: options?.timeout ?? runtime.configs.timeout,
      ...options,
    });
  },
  /**
   * @global
   */
  onceMessageDeleteBulk: function (
    options?: corde.IMessageDeleteBulkOptions,
  ): Promise<Collection<string, Message | PartialMessage>> {
    return runtime.events.onceMessageDeleteBulk({
      timeout: options?.timeout ?? runtime.configs.timeout,
      ...options,
    });
  },
  /**
   * @global
   */
  onceMessageReactionRemove: function (
    options?: corde.IMessageReactionRemoveOptions,
  ): Promise<[MessageReaction, User | PartialUser]> {
    return runtime.events.onceMessageReactionRemove({
      authorId: options?.authorId ?? runtime.configs.botTestId,
      channelId: options?.channelId ?? runtime.configs.channelId,
      timeout: options?.timeout ?? runtime.configs.timeout,
      ...options,
    });
  },
  /**
   * @global
   */
  onceMessageUpdate: function (
    options?: corde.IMessageUpdateOptions,
  ): Promise<[Message | PartialMessage, Message | PartialMessage]> {
    return runtime.events.onceMessageUpdate({
      timeout: options?.timeout ?? runtime.configs.timeout,
      ...options,
    });
  },
  /**
   * @global
   */
  onceMessagePinned: function (
    options?: corde.IMessageEventOptions,
  ): Promise<Message | PartialMessage> {
    return runtime.events.onceMessagePinned({
      timeout: options?.timeout ?? runtime.configs.timeout,
      ...options,
    });
  },
  /**
   * @global
   */
  onceMessageUnPinned: function (
    options?: corde.IMessageEventOptions,
  ): Promise<Message | PartialMessage> {
    return runtime.events.onceMessageUnPinned({
      timeout: options?.timeout ?? runtime.configs.timeout,
      ...options,
    });
  },
  /**
   * @global
   */
  onceMessageContentOrEmbedChange: function (
    options?: corde.IMessageEventOptions,
  ): Promise<Message> {
    return runtime.events.onceMessageContentOrEmbedChange({
      authorId: options?.authorId ?? runtime.configs.botTestId,
      channelId: options?.channelId ?? runtime.configs.channelId,
      timeout: options?.timeout ?? runtime.configs.timeout,
      ...options,
    });
  },
  /**
   * @global
   */
  oncePresenceUpdate: function (options?: corde.IPresenceUpdateOptions): Promise<Presence> {
    return runtime.events.oncePresenceUpdate({
      guild: options?.guild ?? { id: runtime.configs.guildId },
      timeout: options?.timeout ?? runtime.configs.timeout,
      ...options,
    });
  },
  /**
   * @global
   */
  onceRoleCreate: function (options?: corde.IRoleCreateEventOptions): Promise<Role> {
    return runtime.events.onceRoleCreate({
      guild: options?.guild ?? { id: runtime.configs.guildId },
      timeout: options?.timeout ?? runtime.configs.timeout,
      ...options,
    });
  },
  /**
   * @global
   */
  onceRoleUpdate: function (options?: corde.IRoleUpdateEventOptions): Promise<[Role, Role]> {
    return runtime.events.onceRoleUpdate({
      timeout: options?.timeout ?? runtime.configs.timeout,
      ...options,
    });
  },
  /**
   * @global
   */
  onceRoleRenamed: function (options?: corde.IRoleEventOptions): Promise<Role> {
    return runtime.events.onceRoleRenamed({
      timeout: options?.timeout ?? runtime.configs.timeout,
      ...options,
    });
  },
  /**
   * @global
   */
  onceRolePositionUpdate: function (options?: corde.IRoleEventOptions): Promise<Role> {
    return runtime.events.onceRolePositionUpdate({
      timeout: options?.timeout ?? runtime.configs.timeout,
      ...options,
    });
  },
  /**
   * @global
   */
  onceRoleUpdateColor: function (options?: corde.IRoleEventOptions): Promise<Role> {
    return runtime.events.onceRoleUpdateColor({
      timeout: options?.timeout ?? runtime.configs.timeout,
      ...options,
    });
  },
  /**
   * @global
   */
  onceRoleHoistUpdate: function (options?: corde.IRoleEventOptions): Promise<Role> {
    return runtime.events.onceRoleHoistUpdate({
      guildId: options?.guildId ?? runtime.configs.guildId,
      timeout: options?.timeout ?? runtime.configs.timeout,
      ...options,
    });
  },
  /**
   * @global
   */
  onceRoleMentionableUpdate: function (options?: corde.IRoleEventOptions): Promise<Role> {
    return runtime.events.onceRoleMentionableUpdate({
      guildId: options?.guildId ?? runtime.configs.guildId,
      timeout: options?.timeout ?? runtime.configs.timeout,
      ...options,
    });
  },
  /**
   * @global
   */
  onceRolePermissionUpdate: function (options?: corde.IRolePermissionUpdateOptions): Promise<Role> {
    return runtime.events.onceRolePermissionUpdate({
      guild: options?.guild ?? { id: runtime.configs.guildId },
      timeout: options?.timeout ?? runtime.configs.timeout,
      ...options,
    });
  },
  /**
   * @global
   */
  onceUserUpdate: function (
    options?: corde.IUserUpdateOptions,
  ): Promise<[User | PartialUser, User]> {
    return runtime.events.onceUserUpdate({
      timeout: options?.timeout ?? runtime.configs.timeout,
      ...options,
    });
  },
  /**
   * @global
   */
  onceVoiceStateUpdate: function (
    options?: corde.IVoiceStateUpdateOptions,
  ): Promise<[VoiceState, VoiceState]> {
    return runtime.events.onceVoiceStateUpdate({
      channel: options?.channel ?? { id: runtime.configs.channelId },
      timeout: options?.timeout ?? runtime.configs.timeout,
      ...options,
    });
  },
};
