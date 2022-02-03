import runtime from "../core/runtime";
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
  if (runtime.configs.useTimeoutValueInEventsDefaultParameters) {
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
    return runtime.bot.events.onceMessage(options);
  },
  /**
   * @global
   */
  onceMessageReactionsAdd(options?: corde.ISearchMessageReactionsFilter) {
    if (runtime.configs.useConfigValuesInEventsDefaultParameters) {
      options = getDefaultOptionsIfNeeded(options);
    }
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.onceMessageReactionsAdd(getDefaultOptionsIfNeeded(options));
  },
  /**
   * @global
   */
  onceChannelCreate(options?: corde.ICreateChannelFilter) {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.onceChannelCreate(options);
  },
  /**
   * @global
   */
  onceMessageReactionAdd: function (options?: corde.IMessageReactionAddFilter) {
    if (runtime.configs.useConfigValuesInEventsDefaultParameters) {
      options = getDefaultOptionsIfNeeded(options);
    }
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.onceMessageReactionAdd(options);
  },
  /**
   * @global
   */
  onceMessageReactionRemoveEmoji: function (options?: corde.IMessageReactionRemoveFilter) {
    if (runtime.configs.useConfigValuesInEventsDefaultParameters) {
      options = {
        channel: getChannel(options?.channel),
        ...options,
      };
    }
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.onceMessageReactionRemoveEmoji(options);
  },
  /**
   * @global
   */
  onceChannelDelete: function (options?: corde.IChannelDeleteFilter) {
    if (runtime.configs.useConfigValuesInEventsDefaultParameters) {
      options = {
        channel: getChannel(options?.channel),
        ...options,
      };
    }
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.onceChannelDelete(options);
  },
  /**
   * @global
   */
  onceChannelPinsUpdate: function (options?: corde.IChannelPinsUpdateFilter) {
    if (runtime.configs.useConfigValuesInEventsDefaultParameters) {
      options = {
        channel: getChannel(options?.channel),
        ...options,
      };
    }
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.onceChannelPinsUpdate(options);
  },
  /**
   * @global
   */
  onceChannelUpdate: function (options?: corde.IChannelUpdateFilter) {
    if (runtime.configs.useConfigValuesInEventsDefaultParameters) {
      options = {
        channel: getChannel(options?.channel),
        ...options,
      };
    }
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.onceChannelUpdate(options);
  },
  /**
   * @global
   */
  onceRoleDelete: function (options?: corde.IRoleEventFilter) {
    if (runtime.configs.useConfigValuesInEventsDefaultParameters) {
      options = {
        guild: getGuild(options?.guild),
        ...options,
      };
    }
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.onceRoleDelete(options);
  },
  /**
   * @global
   */
  onceEmojiCreate: function (options?: corde.IEmojiCreateFilter) {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.onceEmojiCreate(options);
  },
  /**
   * @global
   */
  onceEmojiDelete: function (options?: corde.IEmojiDeleteFilter) {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.onceEmojiDelete(options);
  },
  /**
   * @global
   */
  onceEmojiUpdate: function (options?: corde.IEmojiUpdateFilter) {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.onceEmojiUpdate(options);
  },
  /**
   * @global
   */
  onceGuildBan: function (options?: corde.IGuildBanFilter) {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.onceGuildBan({
      guild: getGuild(options?.guild),
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildBanRemove: function (options?: corde.IGuildBanRemoveFilter) {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.onceGuildBanRemove({
      guild: getGuild(options?.guild),
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildCreate: function (options?: corde.IGuildCreateFilter) {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.onceGuildCreate({
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildDelete: function (options?: corde.IGuildDeleteFilter) {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.onceGuildDelete({
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildMemberAdd: function (options?: corde.IGuildMemberAddFilter) {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.onceGuildMemberAdd({
      guild: getGuild(options?.guild),
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildMemberAvailable: function (options?: corde.IGuildMemberAvailableFilter) {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.onceGuildMemberAvailable({
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildMemberRemove: function (options?: corde.IGuildMemberRemoveFilter) {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.onceGuildMemberRemove({
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildMemberChunk: function (options?: corde.IGuildMemberChunkFilter) {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.onceGuildMemberChunk({
      guild: getGuild(options?.guild),
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildMemberUpdate: function (options?: corde.IGuildMemberUpdateFilter) {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.onceGuildMemberUpdate({
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildUnavailable: function (options?: corde.IGuildUnavailableFilter) {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.onceGuildUnavailable({
      ...options,
    });
  },
  /**
   * @global
   */
  onceGuildUpdate: function (options?: corde.IGuildUnavailableFilter) {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.onceGuildUpdate({
      ...options,
    });
  },
  /**
   * @global
   */
  onceMessageDelete: function (options?: corde.IMessageDeleteFilter) {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.onceMessageDelete({
      author: getAuthor(options?.author),
      channel: getChannel(options?.channel),
      ...options,
    });
  },
  /**
   * @global
   */
  onceMessageDeleteBulk: function (options?: corde.IMessageDeleteBulkFilter) {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.onceMessageDeleteBulk({
      ...options,
    });
  },
  /**
   * @global
   */
  onceMessageReactionRemove: function (options?: corde.IMessageReactionRemoveFilter) {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.onceMessageReactionRemove({
      author: getAuthor(options.author),
      channel: getChannel(options.channel),
      ...options,
    });
  },
  /**
   * @global
   */
  onceMessageUpdate: function (options?: corde.IMessageUpdateFilter) {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.onceMessageUpdate({
      ...options,
    });
  },
  /**
   * @global
   */
  onceMessagePinned: function (options?: corde.IMessageEventFilter) {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.onceMessagePinned({
      ...options,
    });
  },
  /**
   * @global
   */
  onceMessageUnPinned: function (options?: corde.IMessageEventFilter) {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.onceMessageUnPinned({
      ...options,
    });
  },
  /**
   * @global
   */
  onceMessageContentOrEmbedChange: function (options?: corde.IMessageEventFilter) {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.onceMessageContentOrEmbedChange({
      author: getAuthor(options?.author),
      channel: getChannel(options?.channel),
      ...options,
    });
  },
  /**
   * @global
   */
  oncePresenceUpdate: function (options?: corde.IPresenceUpdateFilter) {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.oncePresenceUpdate({
      guild: getGuild(options.guild),
      ...options,
    });
  },
  /**
   * @global
   */
  onceRoleCreate: function (options?: corde.IRoleCreateEventFilter) {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.onceRoleCreate({
      guild: getGuild(options),
      ...options,
    });
  },
  /**
   * @global
   */
  onceRoleUpdate: function (options?: corde.IRoleUpdateEventFilter) {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.onceRoleUpdate({
      ...options,
    });
  },
  /**
   * @global
   */
  onceRoleRenamed: function (options?: corde.IRoleEventFilter) {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.onceRoleRenamed({
      ...options,
    });
  },
  /**
   * @global
   */
  onceRolePositionUpdate: function (options?: corde.IRoleEventFilter) {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.onceRolePositionUpdate({
      ...options,
    });
  },
  /**
   * @global
   */
  onceRoleUpdateColor: function (options?: corde.IRoleEventFilter) {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.onceRoleUpdateColor({
      ...options,
    });
  },
  /**
   * @global
   */
  onceRoleHoistUpdate: function (options?: corde.IRoleEventFilter) {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.onceRoleHoistUpdate({
      guild: getGuild(options?.guild),
      ...options,
    });
  },
  /**
   * @global
   */
  onceRoleMentionableUpdate: function (options?: corde.IRoleEventFilter) {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.onceRoleMentionableUpdate({
      guild: getGuild(options.guild),
      ...options,
    });
  },
  /**
   * @global
   */
  onceRolePermissionUpdate: function (options?: corde.IRolePermissionUpdateFilter) {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.onceRolePermissionUpdate({
      guild: getGuild(options.guild),
      ...options,
    });
  },
  /**
   * @global
   */
  onceUserUpdate: function (options?: corde.IUserUpdateFilter) {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.onceUserUpdate({
      ...options,
    });
  },
  /**
   * @global
   */
  onceVoiceStateUpdate: function (options?: corde.IVoiceStateUpdateFilter) {
    options = getTimeoutParameterIfNeeded(options);
    return runtime.bot.events.onceVoiceStateUpdate({
      channel: getChannel(options),
      ...options,
    });
  },
};
