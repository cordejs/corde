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

function getTimeout(options?: IDefault) {
  return options?.timeout ?? runtime.configs.timeout;
}

function getChannel(channel: Optional<corde.IChannelIdentifier>): corde.IChannelIdentifier {
  return channel ?? { id: runtime.configs.channelId };
}

function getGuild(guild: Optional<corde.IGuildIdentifier>): corde.IGuildIdentifier {
  return guild ?? { id: runtime.configs.channelId };
}

function getAuthor(author: Optional<corde.IAuthorIdentifier>): corde.IAuthorIdentifier {
  return author ?? { id: runtime.configs.botTestId };
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
  onceMessage(options?: corde.IMessageEventFilter) {
    if (runtime.configs.useConfigValuesInEventsDefaultParameters) {
      options = getDefaultOptionsIfNeeded(options);
    }
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceMessage(options);
  },
  /**
   * @global
   */
  onceMessageReactionsAdd(options?: corde.ISearchMessageReactionsFilter) {
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
    options?: corde.IMessageReactionAddFilter,
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
    options?: corde.IMessageReactionRemoveFilter,
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
  onceChannelDelete: function (options?: corde.IChannelDeleteFilter): Promise<Channel> {
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
    options?: corde.IChannelPinsUpdateFilter,
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
  onceChannelUpdate: function (options?: corde.IChannelUpdateFilter): Promise<[Channel, Channel]> {
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
  onceRoleDelete: function (options?: corde.IRoleEventFilter): Promise<Role> {
    if (runtime.configs.useConfigValuesInEventsDefaultParameters) {
      options = {
        guild: getGuild(options?.guild),
        ...options,
      };
    }
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceRoleDelete(options);
  },
  /**
   * @global
   */
  onceEmojiCreate: function (options?: corde.IEmojiCreateFilter): Promise<GuildEmoji> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceEmojiCreate(options);
  },
  /**
   * @global
   */
  onceEmojiDelete: function (options?: corde.IEmojiDeleteFilter): Promise<GuildEmoji> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceEmojiDelete(options);
  },
  /**
   * @global
   */
  onceEmojiUpdate: function (
    options?: corde.IEmojiUpdateFilter,
  ): Promise<[GuildEmoji, GuildEmoji]> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceEmojiUpdate(options);
  },
  /**
   * @global
   */
  onceGuildBan: function (options?: corde.IGuildBanFilter): Promise<[Guild, User]> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceGuildBan({
      guild: getGuild(options?.guild),
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildBanRemove: function (options?: corde.IGuildBanRemoveFilter): Promise<[Guild, User]> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceGuildBanRemove({
      guild: getGuild(options?.guild),
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildCreate: function (options?: corde.IGuildCreateFilter): Promise<Guild> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceGuildCreate({
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildDelete: function (options?: corde.IGuildDeleteFilter): Promise<Guild> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceGuildDelete({
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildMemberAdd: function (options?: corde.IGuildMemberAddFilter): Promise<GuildMember> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceGuildMemberAdd({
      guild: getGuild(options?.guild),
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildMemberAvailable: function (
    options?: corde.IGuildMemberAvailableFilter,
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
    options?: corde.IGuildMemberRemoveFilter,
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
    options?: corde.IGuildMemberChunkFilter,
  ): Promise<[Collection<string, GuildMember>, Guild]> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceGuildMemberChunk({
      guild: getGuild(options?.guild),
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildMemberSpeaking: function (
    options?: corde.IGuildMemberSpeakingFilter,
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
    options?: corde.IGuildMemberUpdateFilter,
  ): Promise<[GuildMember | PartialGuildMember, GuildMember]> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceGuildMemberUpdate({
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildUnavailable: function (options?: corde.IGuildUnvailableFilter): Promise<Guild> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceGuildUnavailable({
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildUpdate: function (options?: corde.IGuildUnvailableFilter): Promise<[Guild, Guild]> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceGuildUpdate({
      ...options,
    });
  },
  /**
   * @global
   */
  onceMessageDelete: function (
    options?: corde.IMessageDeleteFilter,
  ): Promise<Message | PartialMessage> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceMessageDelete({
      author: getAuthor(options?.author),
      channel: getChannel(options?.channel),
      ...options,
    });
  },
  /**
   * @global
   */
  onceMessageDeleteBulk: function (
    options?: corde.IMessageDeleteBulkFilter,
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
    options?: corde.IMessageReactionRemoveFilter,
  ): Promise<[MessageReaction, User | PartialUser]> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceMessageReactionRemove({
      author: getAuthor(options.author),
      channel: getChannel(options.channel),
      ...options,
    });
  },
  /**
   * @global
   */
  onceMessageUpdate: function (
    options?: corde.IMessageUpdateFilter,
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
    options?: corde.IMessageEventFilter,
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
    options?: corde.IMessageEventFilter,
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
    options?: corde.IMessageEventFilter,
  ): Promise<Message> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceMessageContentOrEmbedChange({
      author: getAuthor(options?.author),
      channel: getChannel(options?.channel),
      ...options,
    });
  },
  /**
   * @global
   */
  oncePresenceUpdate: function (options?: corde.IPresenceUpdateFilter): Promise<Presence> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.oncePresenceUpdate({
      guild: getGuild(options.guild),
      ...options,
    });
  },
  /**
   * @global
   */
  onceRoleCreate: function (options?: corde.IRoleCreateEventFilter): Promise<Role> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceRoleCreate({
      guild: getGuild(options),
      ...options,
    });
  },
  /**
   * @global
   */
  onceRoleUpdate: function (options?: corde.IRoleUpdateEventFilter): Promise<[Role, Role]> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceRoleUpdate({
      ...options,
    });
  },
  /**
   * @global
   */
  onceRoleRenamed: function (options?: corde.IRoleEventFilter): Promise<Role> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceRoleRenamed({
      ...options,
    });
  },
  /**
   * @global
   */
  onceRolePositionUpdate: function (options?: corde.IRoleEventFilter): Promise<Role> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceRolePositionUpdate({
      ...options,
    });
  },
  /**
   * @global
   */
  onceRoleUpdateColor: function (options?: corde.IRoleEventFilter): Promise<Role> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceRoleUpdateColor({
      ...options,
    });
  },
  /**
   * @global
   */
  onceRoleHoistUpdate: function (options?: corde.IRoleEventFilter): Promise<Role> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceRoleHoistUpdate({
      guild: getGuild(options?.guild),
      ...options,
    });
  },
  /**
   * @global
   */
  onceRoleMentionableUpdate: function (options?: corde.IRoleEventFilter): Promise<Role> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceRoleMentionableUpdate({
      guild: getGuild(options.guild),
      ...options,
    });
  },
  /**
   * @global
   */
  onceRolePermissionUpdate: function (options?: corde.IRolePermissionUpdateFilter): Promise<Role> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceRolePermissionUpdate({
      guild: getGuild(options.guild),
      ...options,
    });
  },
  /**
   * @global
   */
  onceUserUpdate: function (
    options?: corde.IUserUpdateFilter,
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
    options?: corde.IVoiceStateUpdateFilter,
  ): Promise<[VoiceState, VoiceState]> {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.events.onceVoiceStateUpdate({
      channel: getChannel(options),
      ...options,
    });
  },
};
