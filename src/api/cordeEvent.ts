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
import { Optional } from "../types";

interface IDefault {
  authorId?: string | null;
  channel?: corde.IChannelIdentifier | null;
  timeout?: number | null;
  guildId?: string | null;
  message?: corde.IMessageIdentifier;
  [val: string]: any;
}

function getAuthorId(options?: IDefault) {
  return options?.authorId ?? runtime.configs.botTestId;
}

function getChannelId(options?: IDefault) {
  return options?.channelId ?? runtime.configs.channelId;
}

function getGuildId(options?: IDefault) {
  return getGuildId(options);
}

function getTimeout(options?: IDefault) {
  return options?.timeout ?? runtime.configs.timeout;
}

function getChannel(channel: Optional<corde.IChannelIdentifier>): corde.IChannelIdentifier {
  return channel ?? { id: runtime.configs.channelId };
}

function getGuild(options?: IDefault): corde.IGuildIdentifier {
  return getGuild(options);
}

function getDefaultOptionsIfNeeded<T extends any>(options?: any): T {
  const op = options as IDefault;
  return {
    authorId: getAuthorId(op),
    channelId: getChannelId(op),
    timeout: getTimeout(op),
    ...op,
  } as any;
}

function getTimeoutParameterIfNeeded(options?: corde.IDefaultOptions & Record<string, any>) {
  if (runtime.configs.useTimoutValueInEventsDefaultParameters) {
    return {
      timeout: getTimeout(options),
      ...options,
    };
  }
  return {
    timeout: options?.timeout,
    ...options,
  };
}

/**
 * @global
 */
export const cordeEvent: corde.IOnceEvents = {
  /**
   * @global
   */
  onceMessage(options?: corde.IMessageEventOptions) {
    if (runtime.configs.useConfigValuesInEventsDefaultParameters) {
      options = getDefaultOptionsIfNeeded(options);
    }
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceMessage(options);
  },
  /**
   * @global
   */
  onceMessageReactionsAdd(options?: corde.ISearchMessageReactionsOptions) {
    if (runtime.configs.useConfigValuesInEventsDefaultParameters) {
      options = getDefaultOptionsIfNeeded(options);
    }
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceMessageReactionsAdd(getDefaultOptionsIfNeeded(options));
  },
  /**
   * @global
   */
  onceChannelCreate(options?: corde.ICreateChannelFilter) {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceChannelCreate(options);
  },
  /**
   * @global
   */
  onceMessageReactionAdd: function (
    options?: corde.IMessageReactionAddOptions,
  ): Promise<[MessageReaction, User | PartialUser]> {
    if (runtime.configs.useConfigValuesInEventsDefaultParameters) {
      options = getDefaultOptionsIfNeeded(options);
    }
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceMessageReactionAdd(options);
  },
  /**
   * @global
   */
  onceMessageReactionRemoveEmoji: function (
    options?: corde.IMessageReactionRemoveOptions,
  ): Promise<MessageReaction> {
    if (runtime.configs.useConfigValuesInEventsDefaultParameters) {
      options = {
        channel: getChannel(options?.channel),
        ...options,
      };
    }
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceMessageReactionRemoveEmoji(options);
  },
  /**
   * @global
   */
  onceChannelDelete: function (options?: corde.IChannelDeleteOptions): Promise<Channel> {
    if (runtime.configs.useConfigValuesInEventsDefaultParameters) {
      options = {
        channel: getChannel(options?.channel),
        ...options,
      };
    }
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceChannelDelete(options);
  },
  /**
   * @global
   */
  onceChannelPinsUpdate: function (
    options?: corde.IChannelPinsUpdateOptions,
  ): Promise<[Channel, Date]> {
    if (runtime.configs.useConfigValuesInEventsDefaultParameters) {
      options = {
        channel: getChannel(options?.channel),
        ...options,
      };
    }
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceChannelPinsUpdate(options);
  },
  /**
   * @global
   */
  onceChannelUpdate: function (options?: corde.IChannelUpdateOptions): Promise<[Channel, Channel]> {
    if (runtime.configs.useConfigValuesInEventsDefaultParameters) {
      options = {
        channel: getChannel(options?.channel),
        ...options,
      };
    }
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceChannelUpdate(options);
  },
  /**
   * @global
   */
  onceRoleDelete: function (options?: corde.IRoleEventOptions): Promise<Role> {
    if (runtime.configs.useConfigValuesInEventsDefaultParameters) {
      options = {
        guildId: getGuildId(options),
        ...options,
      };
    }
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceRoleDelete(options);
  },
  /**
   * @global
   */
  onceEmojiCreate: function (options?: corde.IEmojiCreateOptions): Promise<GuildEmoji> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceEmojiCreate(options);
  },
  /**
   * @global
   */
  onceEmojiDelete: function (options?: corde.IEmojiDeleteOptions): Promise<GuildEmoji> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceEmojiDelete(options);
  },
  /**
   * @global
   */
  onceEmojiUpdate: function (
    options?: corde.IEmojiUpdateOptions,
  ): Promise<[GuildEmoji, GuildEmoji]> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceEmojiUpdate(options);
  },
  /**
   * @global
   */
  onceGuildBan: function (options?: corde.IGuildBanOptions): Promise<[Guild, User]> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceGuildBan({
      guildIdentifier: getGuild(options),
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildBanRemove: function (options?: corde.IGuildBanRemoveOptions): Promise<[Guild, User]> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceGuildBanRemove({
      guildIdentifier: getGuild(options),
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildCreate: function (options?: corde.IGuildCreateFilterOptions): Promise<Guild> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceGuildCreate({
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildDelete: function (options?: corde.IGuildDeleteOptions): Promise<Guild> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceGuildDelete({
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildMemberAdd: function (options?: corde.IGuildMemberAddOptions): Promise<GuildMember> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceGuildMemberAdd({
      guild: getGuild(options),
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildMemberAvailable: function (
    options?: corde.IGuildMemberAvailableOptions,
  ): Promise<GuildMember | PartialGuildMember> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceGuildMemberAvailable({
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildMemberRemove: function (
    options?: corde.IGuildMemberRemoveOptions,
  ): Promise<GuildMember | PartialGuildMember> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceGuildMemberRemove({
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildMemberChunk: function (
    options?: corde.IGuildMemberChunkOptions,
  ): Promise<[Collection<string, GuildMember>, Guild]> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceGuildMemberChunk({
      guild: getGuild(options),
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildMemberSpeaking: function (
    options?: corde.IGuildMemberSpeakingOptions,
  ): Promise<GuildMember | PartialGuildMember> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceGuildMemberSpeaking({
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildMemberUpdate: function (
    options?: corde.IGuildMemberUpdateOptions,
  ): Promise<[GuildMember | PartialGuildMember, GuildMember]> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceGuildMemberUpdate({
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildUnavailable: function (options?: corde.IGuildUnvailableOptions): Promise<Guild> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceGuildUnavailable({
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildUpdate: function (options?: corde.IGuildUnvailableOptions): Promise<[Guild, Guild]> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceGuildUpdate({
      ...options,
    });
  },
  /**
   * @global
   */
  onceMessageDelete: function (
    options?: corde.IMessageDeleteOptions,
  ): Promise<Message | PartialMessage> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceMessageDelete({
      authorId: getAuthorId(options),
      channelId: getChannelId(options),
      ...options,
    });
  },
  /**
   * @global
   */
  onceMessageDeleteBulk: function (
    options?: corde.IMessageDeleteBulkOptions,
  ): Promise<Collection<string, Message | PartialMessage>> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceMessageDeleteBulk({
      ...options,
    });
  },
  /**
   * @global
   */
  onceMessageReactionRemove: function (
    options?: corde.IMessageReactionRemoveOptions,
  ): Promise<[MessageReaction, User | PartialUser]> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceMessageReactionRemove({
      authorId: getAuthorId(options),
      channelId: getChannelId(options),
      ...options,
    });
  },
  /**
   * @global
   */
  onceMessageUpdate: function (
    options?: corde.IMessageUpdateOptions,
  ): Promise<[Message | PartialMessage, Message | PartialMessage]> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceMessageUpdate({
      ...options,
    });
  },
  /**
   * @global
   */
  onceMessagePinned: function (
    options?: corde.IMessageEventOptions,
  ): Promise<Message | PartialMessage> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceMessagePinned({
      ...options,
    });
  },
  /**
   * @global
   */
  onceMessageUnPinned: function (
    options?: corde.IMessageEventOptions,
  ): Promise<Message | PartialMessage> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceMessageUnPinned({
      ...options,
    });
  },
  /**
   * @global
   */
  onceMessageContentOrEmbedChange: function (
    options?: corde.IMessageEventOptions,
  ): Promise<Message> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceMessageContentOrEmbedChange({
      authorId: getAuthorId(options),
      channelId: getChannelId(options),
      ...options,
    });
  },
  /**
   * @global
   */
  oncePresenceUpdate: function (options?: corde.IPresenceUpdateOptions): Promise<Presence> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.oncePresenceUpdate({
      guild: getGuild(options),
      ...options,
    });
  },
  /**
   * @global
   */
  onceRoleCreate: function (options?: corde.IRoleCreateEventOptions): Promise<Role> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceRoleCreate({
      guild: getGuild(options),
      ...options,
    });
  },
  /**
   * @global
   */
  onceRoleUpdate: function (options?: corde.IRoleUpdateEventOptions): Promise<[Role, Role]> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceRoleUpdate({
      ...options,
    });
  },
  /**
   * @global
   */
  onceRoleRenamed: function (options?: corde.IRoleEventOptions): Promise<Role> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceRoleRenamed({
      ...options,
    });
  },
  /**
   * @global
   */
  onceRolePositionUpdate: function (options?: corde.IRoleEventOptions): Promise<Role> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceRolePositionUpdate({
      ...options,
    });
  },
  /**
   * @global
   */
  onceRoleUpdateColor: function (options?: corde.IRoleEventOptions): Promise<Role> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceRoleUpdateColor({
      ...options,
    });
  },
  /**
   * @global
   */
  onceRoleHoistUpdate: function (options?: corde.IRoleEventOptions): Promise<Role> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceRoleHoistUpdate({
      guildId: getGuildId(options),
      ...options,
    });
  },
  /**
   * @global
   */
  onceRoleMentionableUpdate: function (options?: corde.IRoleEventOptions): Promise<Role> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceRoleMentionableUpdate({
      guildId: getGuildId(options),
      ...options,
    });
  },
  /**
   * @global
   */
  onceRolePermissionUpdate: function (options?: corde.IRolePermissionUpdateOptions): Promise<Role> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceRolePermissionUpdate({
      guild: getGuild(options),
      ...options,
    });
  },
  /**
   * @global
   */
  onceUserUpdate: function (
    options?: corde.IUserUpdateOptions,
  ): Promise<[User | PartialUser, User]> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceUserUpdate({
      ...options,
    });
  },
  /**
   * @global
   */
  onceVoiceStateUpdate: function (
    options?: corde.IVoiceStateUpdateOptions,
  ): Promise<[VoiceState, VoiceState]> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceVoiceStateUpdate({
      channel: getChannel(options),
      ...options,
    });
  },
};
