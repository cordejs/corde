declare namespace corde {
  /**
   * Define events emitted by Discord.js used internally by corde to test
   * each bot operation in a Promise response with filters.
   */
  export interface IOnceEvents {
    /**
     * Emitted when a guild channel is created.
     *
     * @param options Optional filter to get a channel. If timeout is not provided,
     * the default value is used or the one provided in configs.
     *
     * @returns First channel created, or another one based on a filter.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceChannelCreate(options?: corde.ICreateChannelFilter): Promise<Channel>;
    /**
     * Emitted when a message is created.
     *
     * @param options Optional filter to get a message.
     * @returns First message created, or another one based on a filter.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceMessage(options?: corde.IMessageEventFilter | undefined): Promise<Message>;

    /**
     * Emitted when a reaction is added to a cached message.
     *
     * @param options Filter to get a reaction.
     * @returns List of relation of reactions added and the author.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceMessageReactionAdd(
      options?: corde.IMessageReactionAddFilter,
    ): Promise<[PartialOrMessageReaction, User | PartialUser]>;

    /**
     * Emitted when a bulk of reactions is added to a cached message.
     *
     * @description This functions is similar to `onceMessageReactionAdd`
     * but handling multiple reaction at once in a single message.
     *
     * @param options Optional filter to get the reactions.
     * @returns First reaction added or a list of reactions based on a filter
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceMessageReactionsAdd(
      options?: corde.ISearchMessageReactionsFilter,
    ): Promise<[PartialOrMessageReaction, void | User | PartialUser][]>;

    /**
     * Emitted when a **bot** removes a emoji from a message.
     *
     * @param options Optional filter to get the reaction.
     * @returns First reaction removed or another one based on a filter.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceMessageReactionRemoveEmoji(
      options?: corde.IMessageReactionRemoveFilter,
    ): Promise<MessageReaction | PartialMessageReaction>;

    /**
     * Emitted when a channel is deleted.
     *
     * @param options Optional filter to get the channel.
     * @returns Deleted channel.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceChannelDelete(options?: corde.IChannelDeleteFilter): Promise<Channel>;

    /**
     * Emitted when the pins of a channel are updated.
     * Due to the nature of the WebSocket event, not much information can be provided easily here -
     * you need to manually check the pins yourself.
     *
     * @param options Optional filter to get the channel.
     * @returns `Channel` and `date` of it's change.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceChannelPinsUpdate(
      options?: corde.IChannelPinsUpdateFilter,
    ): Promise<[TextBasedChannel, Date]>;

    /**
     * Emitted when a channel is updated - e.g. name change, topic change.
     *
     * @param options Optional filter to get the channel.
     * @returns `Old channel` and `new value` of the channel.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceChannelUpdate(options?: corde.IChannelUpdateFilter): Promise<[Channel, Channel]>;

    /**
     * Emitted when a guild role is deleted.
     * If `roleIdentifier` is informed, returns the deleted role that
     * match with `roleIdentifier` value, if not, returns the first role deleted.
     *
     * Waits for a determined timeout, rejecting this async function if reaches
     * the timeout value.
     *
     * @param options Optional filter to get the role.
     * @returns Deleted role.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceRoleDelete(options?: corde.IRoleEventFilter | undefined): Promise<Role>;

    /**
     * Emitted when a custom emoji is created in a guild.
     *
     * @param options Optional filter to get the emoji.
     * @returns Created emoji.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceEmojiCreate(options?: corde.IEmojiCreateFilter): Promise<GuildEmoji>;

    /**
     * Emitted when a custom guild emoji is deleted.
     *
     * @param options Optional filter to get the emoji.
     * @returns The emoji that was deleted.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceEmojiDelete(options?: corde.IEmojiDeleteFilter): Promise<GuildEmoji>;

    /**
     * Emitted when a custom guild emoji is updated.
     *
     * @param options Optional filter to get the role.
     * @returns `Old` and `new` role value.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceEmojiUpdate(options?: corde.IEmojiUpdateFilter): Promise<[GuildEmoji, GuildEmoji]>;

    /**
     * Emitted when a member is banned from a guild.
     *
     * @param options Optional filter to get the guild.
     * @returns `guild` where the user was banned from, and the `user` itself
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceGuildBan(options?: corde.IGuildBanFilter): Promise<GuildBan>;

    /**
     * Emitted when a member is unbanned from a guild.
     *
     * @param options Optional filter to get the guild.
     * @returns the `guild` that the user was removed from ban, and the `user`.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceGuildBanRemove(options?: corde.IGuildBanRemoveFilter): Promise<GuildBan>;

    /**
     * Emitted when the client joins a guild.
     *
     * @param options Optional filter to get the guild.
     * @returns Created guild.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceGuildCreate(options?: corde.IGuildCreateFilter): Promise<Guild>;

    /**
     * Emitted when a guild is deleted/left.
     *
     * @param options Optional filter to get the guild.
     * @returns Deleted guild.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceGuildDelete(options?: corde.IGuildDeleteFilter): Promise<Guild>;

    /**
     * Emitted when a user joins a guild.
     *
     * @param options Optional filter to get the guild member.
     * @returns Member who was added to guild.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceGuildMemberAdd(options?: corde.IGuildMemberAddFilter): Promise<GuildMember>;

    /**
     * Emitted when a member becomes available in a large guild.
     *
     * @param options Optional filter to get the guild.
     * @returns Guild who is available.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceGuildMemberAvailable(
      options?: corde.IGuildMemberAvailableFilter,
    ): Promise<GuildMember | PartialGuildMember>;

    /**
     * Emitted when a member leaves a guild, or is kicked.
     *
     * @param options Optional filter to get the guild member.
     * @returns Member of guild who kicked.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceGuildMemberRemove(
      options?: corde.IGuildMemberRemoveFilter,
    ): Promise<GuildMember | PartialGuildMember>;

    /**
     * Emitted when a chunk of guild members is received (all members come from the same guild).
     *
     * @param options Optional filter to get the guild member.
     * @returns The collection of members that the guild received.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceGuildMemberChunk(
      options?: corde.IGuildMemberChunkFilter,
    ): Promise<[Collection<string, GuildMember>, Guild]>;

    /**
     * Emitted when a guild member changes - i.e. new role, removed role, nickname.
     *
     * @param options Optional filter to get the guild member.
     * @returns Old and the new value of the guild member.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceGuildMemberUpdate(
      options?: corde.IGuildMemberUpdateFilter,
    ): Promise<[GuildMember | PartialGuildMember, GuildMember]>;

    /**
     * Emitted when a guild becomes unavailable, likely due to a server outage.
     *
     * @param options Optional filter to get the guild.
     * @returns Unavailable guild.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceGuildUnavailable(options?: corde.IGuildUnavailableFilter): Promise<Guild>;

    /**
     * Emitted when a guild is updated - e.g. name change.
     *
     * @param options Optional filter to get the guild.
     * @returns The old and new value of the updated guild.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceGuildUpdate(options?: corde.IGuildUpdateFilter): Promise<[Guild, Guild]>;

    /**
     * Emitted when a message is deleted.
     *
     * @param options Optional filter to get the message.
     * @returns Deleted message.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceMessageDelete(options?: corde.IMessageDeleteFilter): Promise<Message | PartialMessage>;

    /**
     * Emitted when messages are deleted in bulk.
     *
     * @param options Optional filter to get the message.
     * @returns Collection of messages that was deleted.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceMessageDeleteBulk(
      options?: corde.IMessageDeleteBulkFilter,
    ): Promise<Collection<string, Message | PartialMessage>>;

    /**
     * Emitted when a reaction is removed from a message.
     *
     * @param options Optional filter to get the message reaction.
     * @returns Removed reaction and the author of the remotion.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceMessageReactionRemove(
      options?: corde.IMessageReactionRemoveFilter,
    ): Promise<[PartialOrMessageReaction, User | PartialUser]>;

    /**
     * Emitted when a message is updated - e.g. embed or content change.
     *
     * @param options Optional filter to get the message.
     * @returns `Old` and `new` value of a message.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceMessageUpdate(
      options?: corde.IMessageUpdateFilter,
    ): Promise<[Message | PartialMessage, Message | PartialMessage]>;

    /**
     * Emitted when a message is pinned
     *
     * @param options Optional filter to get the message.
     * @returns The pinned message
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceMessagePinned(options?: corde.IMessageEventFilter): Promise<Message | PartialMessage>;

    /**
     * Emitted when a message is unPinned
     *
     * @param options Optional filter to get the message.
     * @returns The pinned message
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceMessageUnPinned(options?: corde.IMessageEventFilter): Promise<Message | PartialMessage>;

    /**
     * Emitted when a message with `id` x or `content` y, or its embed message has changed.
     *
     * @param options Optional filter to get the message.
     * @returns A message who had his content changed
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceMessageContentOrEmbedChange(options?: corde.IMessageEventFilter): Promise<Message>;

    /**
     * Emitted when a guild member's presence changes, or they change one of their details.
     *
     * @param options Optional filter to get the presence.
     * @returns Old and new presence values.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    oncePresenceUpdate(options?: corde.IPresenceUpdateFilter): Promise<Presence>;

    /**
     * Emitted when a role is created.
     *
     * @param options Optional filter to get the role.
     * @returns Created role.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceRoleCreate(options?: corde.IRoleCreateEventFilter): Promise<Role>;

    /**
     * Emitted when a guild role is updated.
     *
     * @param options Optional filter to get the role.
     * @returns `old` and the `new` role value.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceRoleUpdate(options?: corde.IRoleUpdateEventFilter): Promise<[Role, Role]>;

    /**
     * Emitted when a role's `name` is updated.
     *
     * @param options Optional filter to get the role.
     * @returns `old` and the `new` role value.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceRoleRenamed(options?: corde.IRoleEventFilter): Promise<Role>;

    /**
     * Emitted when a role's `position` is updated.
     *
     * @param options Optional filter to get the role.
     * @returns `old` and the `new` role value.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceRolePositionUpdate(options?: corde.IRoleEventFilter): Promise<Role>;

    /**
     * Emitted when a role's `color` is updated.
     *
     * @param options Optional filter to get the role.
     * @returns `old` and the `new` role value.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceRoleUpdateColor(options?: corde.IRoleEventFilter): Promise<Role>;

    /**
     * Emitted when a role's `hoist` is updated.
     *
     * @param options Optional filter to get the role.
     * @returns `old` and the `new` role value.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceRoleHoistUpdate(options?: corde.IRoleEventFilter): Promise<Role>;

    /**
     * Emitted when a role's `mentionable` is updated.
     *
     * @param options Optional filter to get the role.
     * @returns `old` and the `new` role value.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceRoleMentionableUpdate(options?: corde.IRoleEventFilter): Promise<Role>;

    /**
     * Emitted when a role's `permission` is updated.
     *
     * @param options Optional filter to get the role.
     * @returns Specified role that had his permissions updated.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceRolePermissionUpdate(options?: corde.IRolePermissionUpdateFilter): Promise<Role>;

    /**
     * Emitted when a user's details (e.g. username) are changed.
     *
     * @param options Optional filter to get the user.
     * @returns Updated user based on the filter or anyone else.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceUserUpdate(options?: corde.IUserUpdateFilter): Promise<[User | PartialUser, User]>;

    /**
     * Emitted when a user changes voice state - e.g. joins/leaves a channel, mutes/unmute.
     *
     * @param options Optional filter to get the role.
     * @returns `Old` and the `new` voiceState value.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceVoiceStateUpdate(
      options?: corde.IVoiceStateUpdateFilter,
    ): Promise<[VoiceState, VoiceState]>;
  }
}
