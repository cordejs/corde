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
    throw new Error("Function not implemented.");
  },
  /**
   * @global
   */
  onceChannelPinsUpdate: function (
    options?: corde.IChannelPinsUpdateOptions,
  ): Promise<[Channel, Date]> {
    throw new Error("Function not implemented.");
  },
  /**
   * @global
   */
  onceChannelUpdate: function (options?: corde.IChannelUpdateOptions): Promise<[Channel, Channel]> {
    throw new Error("Function not implemented.");
  },
  /**
   * @global
   */
  onceRoleDelete: function (options?: corde.IRoleEventOptions): Promise<Role> {
    throw new Error("Function not implemented.");
  },
  /**
   * @global
   */
  onceEmojiCreate: function (options?: corde.IEmojiCreateOptions): Promise<GuildEmoji> {
    throw new Error("Function not implemented.");
  },
  /**
   * @global
   */
  onceEmojiDelete: function (options?: corde.IEmojiDeleteOptions): Promise<GuildEmoji> {
    throw new Error("Function not implemented.");
  },
  /**
   * @global
   */
  onceEmojiUpdate: function (
    options?: corde.IEmojiUpdateOptions,
  ): Promise<[GuildEmoji, GuildEmoji]> {
    throw new Error("Function not implemented.");
  },
  /**
   * @global
   */
  onceGuildBan: function (options?: corde.IGuildBanOptions): Promise<[Guild, User]> {
    throw new Error("Function not implemented.");
  },
  /**
   * @global
   */
  onceGuildBanRemove: function (options?: corde.IGuildBanRemoveOptions): Promise<[Guild, User]> {
    throw new Error("Function not implemented.");
  },
  /**
   * @global
   */
  onceGuildCreate: function (options?: corde.IGuildCreateFilterOptions): Promise<Guild> {
    throw new Error("Function not implemented.");
  },
  /**
   * @global
   */
  onceGuildDelete: function (options?: corde.IGuildDeleteOptions): Promise<Guild> {
    throw new Error("Function not implemented.");
  },
  /**
   * @global
   */
  onceGuildMemberAdd: function (
    options?: corde.IGuildMemberAvailableOptions,
  ): Promise<GuildMember> {
    throw new Error("Function not implemented.");
  },
  /**
   * @global
   */
  onceGuildMemberAvailable: function (): Promise<GuildMember | PartialGuildMember> {
    throw new Error("Function not implemented.");
  },
  /**
   * @global
   */
  onceGuildMemberRemove: function (): Promise<GuildMember | PartialGuildMember> {
    throw new Error("Function not implemented.");
  },
  /**
   * @global
   */
  onceGuildMemberChunk: function (
    options?: corde.IGuildMemberChunkOptions,
  ): Promise<[Collection<string, GuildMember>, Guild]> {
    throw new Error("Function not implemented.");
  },
  /**
   * @global
   */
  onceGuildMemberSpeaking: function (
    options?: corde.IGuildMemberSpeakingOptions,
  ): Promise<GuildMember | PartialGuildMember> {
    throw new Error("Function not implemented.");
  },
  /**
   * @global
   */
  onceGuildMemberUpdate: function (): Promise<[GuildMember | PartialGuildMember, GuildMember]> {
    throw new Error("Function not implemented.");
  },
  /**
   * @global
   */
  onceGuildUnavailable: function (): Promise<Guild> {
    throw new Error("Function not implemented.");
  },
  /**
   * @global
   */
  onceGuildUpdate: function (): Promise<[Guild, Guild]> {
    throw new Error("Function not implemented.");
  },
  /**
   * @global
   */
  onceMessageDelete: function (): Promise<Message | PartialMessage> {
    throw new Error("Function not implemented.");
  },
  /**
   * @global
   */
  onceMessageDeleteBulk: function (): Promise<Collection<string, Message | PartialMessage>> {
    throw new Error("Function not implemented.");
  },
  /**
   * @global
   */
  onceMessageReactionRemove: function (): Promise<[MessageReaction, User | PartialUser]> {
    throw new Error("Function not implemented.");
  },
  /**
   * @global
   */
  onceMessageUpdate: function (): Promise<[Message | PartialMessage, Message | PartialMessage]> {
    throw new Error("Function not implemented.");
  },
  /**
   * @global
   */
  onceMessagePinned: function (
    options?: corde.IMessageEventOptions,
  ): Promise<Message | PartialMessage> {
    throw new Error("Function not implemented.");
  },
  /**
   * @global
   */
  onceMessageUnPinned: function (
    options?: corde.IMessageEventOptions,
  ): Promise<Message | PartialMessage> {
    throw new Error("Function not implemented.");
  },
  /**
   * @global
   */
  onceMessageContentOrEmbedChange: function (
    options?: corde.IMessageEventOptions,
  ): Promise<Message> {
    throw new Error("Function not implemented.");
  },

  oncePresenceUpdate: function (): Promise<Presence> {
    throw new Error("Function not implemented.");
  },
  /**
   * @global
   */
  onceRoleCreate: function (): Promise<Role> {
    throw new Error("Function not implemented.");
  },
  /**
   * @global
   */
  onceRoleUpdate: function (): Promise<[Role, Role]> {
    throw new Error("Function not implemented.");
  },
  /**
   * @global
   */
  onceRoleRenamed: function (options?: corde.IRoleEventOptions): Promise<Role> {
    throw new Error("Function not implemented.");
  },
  /**
   * @global
   */
  onceRolePositionUpdate: function (options?: corde.IRoleEventOptions): Promise<Role> {
    throw new Error("Function not implemented.");
  },
  /**
   * @global
   */ onceRoleUpdateColor: function (options?: corde.IRoleEventOptions): Promise<Role> {
    throw new Error("Function not implemented.");
  },
  /**
   * @global
   */ onceRoleHoistUpdate: function (options?: corde.IRoleEventOptions): Promise<Role> {
    throw new Error("Function not implemented.");
  },
  /**
   * @global
   */ onceRoleMentionableUpdate: function (options?: corde.IRoleEventOptions): Promise<Role> {
    throw new Error("Function not implemented.");
  },
  /**
   * @global
   */ onceRolePermissionUpdate: function (
    options?: corde.IRolePermissionUpdateOptions,
  ): Promise<Role> {
    throw new Error("Function not implemented.");
  },
  /**
   * @global
   */ onceUserUpdate: function (options?: IUserUpdateOptions): Promise<[User | PartialUser, User]> {
    throw new Error("Function not implemented.");
  },
  /**
   * @global
   */ onceVoiceStateUpdate: function (
    options?: IVoiceStateUpdateOptions,
  ): Promise<[VoiceState, VoiceState]> {
    throw new Error("Function not implemented.");
  },
};
