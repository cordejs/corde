declare namespace corde {
  /**
   * Define events emitted by Discord.js used internally by corde to test
   * each bot operation in a Promise response with filters.
   */
  export interface IOnceEvents {
    /**
     * Emitted when a guild channel is created.
     *
     * @param options Optional filter to get a channel. If timeout is not provied,
     * the default value is used or the one privided in configs.
     *
     * @returns First channel created, or another one based on a filter.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceChannelCreate(options?: corde.ICreateChannelFilter): Promise<import("discord.js").Channel>;
    /**
     * Emitted when a message is created.
     *
     * @param options Optional filter to get a message.
     * @returns First message created, or another one based on a filter.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceMessage(
      options?: corde.IMessageEventFilter | undefined,
    ): Promise<import("discord.js").Message>;

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
    ): Promise<
      [
        import("discord.js").MessageReaction,
        import("discord.js").User | import("discord.js").PartialUser,
      ]
    >;

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
    ): Promise<
      [
        import("discord.js").MessageReaction,
        void | import("discord.js").User | import("discord.js").PartialUser,
      ][]
    >;

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
    ): Promise<import("discord.js").MessageReaction>;

    /**
     * Emitted when a channel is deleted.
     *
     * @param options Optional filter to get the channel.
     * @returns Deleted channel.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceChannelDelete(options?: corde.IChannelDeleteFilter): Promise<import("discord.js").Channel>;

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
    ): Promise<[import("discord.js").Channel, Date]>;

    /**
     * Emitted when a channel is updated - e.g. name change, topic change.
     *
     * @param options Optional filter to get the channel.
     * @returns `Old channel` and `new value` of the channel.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceChannelUpdate(
      options?: corde.IChannelUpdateFilter,
    ): Promise<[import("discord.js").Channel, import("discord.js").Channel]>;

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
    onceRoleDelete(
      options?: corde.IRoleEventFilter | undefined,
    ): Promise<import("discord.js").Role>;

    /**
     * Emitted when a custom emoji is created in a guild.
     *
     * @param options Optional filter to get the emoji.
     * @returns Created emoji.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceEmojiCreate(options?: corde.IEmojiCreateFilter): Promise<import("discord.js").GuildEmoji>;

    /**
     * Emitted when a custom guild emoji is deleted.
     *
     * @param options Optional filter to get the emoji.
     * @returns The emoji that was deleted.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceEmojiDelete(options?: corde.IEmojiDeleteFilter): Promise<import("discord.js").GuildEmoji>;

    /**
     * Emitted when a custom guild emoji is updated.
     *
     * @param options Optional filter to get the role.
     * @returns `Old` and `new` role value.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceEmojiUpdate(
      options?: corde.IEmojiUpdateFilter,
    ): Promise<[import("discord.js").GuildEmoji, import("discord.js").GuildEmoji]>;

    /**
     * Emitted when a member is banned from a guild.
     *
     * @param options Optional filter to get the guild.
     * @returns `guild` where the user was banned from, and the `user` itself
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceGuildBan(
      options?: corde.IGuildBanFilter,
    ): Promise<[import("discord.js").Guild, import("discord.js").User]>;

    /**
     * Emitted when a member is unbanned from a guild.
     *
     * @param options Optional filter to get the guild.
     * @returns the `guild` that the user was removed from ban, and the `user`.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceGuildBanRemove(
      options?: corde.IGuildBanRemoveFilter,
    ): Promise<[import("discord.js").Guild, import("discord.js").User]>;

    /**
     * Emitted when the client joins a guild.
     *
     * @param options Optional filter to get the guild.
     * @returns Created guild.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceGuildCreate(options?: corde.IGuildCreateFilter): Promise<import("discord.js").Guild>;

    /**
     * Emitted when a guild is deleted/left.
     *
     * @param options Optional filter to get the guild.
     * @returns Deleted guild.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceGuildDelete(options?: corde.IGuildDeleteFilter): Promise<import("discord.js").Guild>;

    /**
     * Emitted when a user joins a guild.
     *
     * @param options Optional filter to get the guild member.
     * @returns Member who was added to guild.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceGuildMemberAdd(
      options?: corde.IGuildMemberAddFilter,
    ): Promise<import("discord.js").GuildMember>;

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
    ): Promise<import("discord.js").GuildMember | import("discord.js").PartialGuildMember>;

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
    ): Promise<import("discord.js").GuildMember | import("discord.js").PartialGuildMember>;

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
    ): Promise<
      [
        import("discord.js").Collection<string, import("discord.js").GuildMember>,
        import("discord.js").Guild,
      ]
    >;

    /**
     * Emitted when a guild member starts/stops speaking.
     *
     * @param options Optional filter to get the guild member.
     * @returns The guild's member who is speaking.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceGuildMemberSpeaking(
      options?: corde.IGuildMemberSpeakingFilter,
    ): Promise<import("discord.js").GuildMember | import("discord.js").PartialGuildMember>;

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
    ): Promise<
      [
        import("discord.js").GuildMember | import("discord.js").PartialGuildMember,
        import("discord.js").GuildMember,
      ]
    >;

    /**
     * Emitted when a guild becomes unavailable, likely due to a server outage.
     *
     * @param options Optional filter to get the guild.
     * @returns Unvailable guild.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceGuildUnavailable(
      options?: corde.IGuildUnvailableFilter,
    ): Promise<import("discord.js").Guild>;

    /**
     * Emitted when a guild is updated - e.g. name change.
     *
     * @param options Optional filter to get the guild.
     * @returns The old and new value of the updated guild.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceGuildUpdate(
      options?: corde.IGuildUpdateFilter,
    ): Promise<[import("discord.js").Guild, import("discord.js").Guild]>;

    /**
     * Emitted when a message is deleted.
     *
     * @param options Optional filter to get the message.
     * @returns Deleted message.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceMessageDelete(
      options?: corde.IMessageDeleteFilter,
    ): Promise<import("discord.js").Message | import("discord.js").PartialMessage>;

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
    ): Promise<
      import("discord.js").Collection<
        string,
        import("discord.js").Message | import("discord.js").PartialMessage
      >
    >;

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
    ): Promise<
      [
        import("discord.js").MessageReaction,
        import("discord.js").User | import("discord.js").PartialUser,
      ]
    >;

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
    ): Promise<
      [
        import("discord.js").Message | import("discord.js").PartialMessage,
        import("discord.js").Message | import("discord.js").PartialMessage,
      ]
    >;

    /**
     * Emitted when a message is pinned
     *
     * @param options Optional filter to get the message.
     * @returns The pinned message
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceMessagePinned(
      options?: corde.IMessageEventFilter,
    ): Promise<import("discord.js").Message | import("discord.js").PartialMessage>;

    /**
     * Emitted when a message is unPinned
     *
     * @param options Optional filter to get the message.
     * @returns The pinned message
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceMessageUnPinned(
      options?: corde.IMessageEventFilter,
    ): Promise<import("discord.js").Message | import("discord.js").PartialMessage>;

    /**
     * Emitted when a message with `id` x or `content` y, or its embed message has changed.
     *
     * @param options Optional filter to get the message.
     * @returns A message who had his content changed
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceMessageContentOrEmbedChange(
      options?: corde.IMessageEventFilter,
    ): Promise<import("discord.js").Message>;

    /**
     * Emitted when a guild member's presence changes, or they change one of their details.
     *
     * @param options Optional filter to get the presence.
     * @returns Old and new presence values.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    oncePresenceUpdate(
      options?: corde.IPresenceUpdateFilter,
    ): Promise<import("discord.js").Presence>;

    /**
     * Emitted when a role is created.
     *
     * @param options Optional filter to get the role.
     * @returns Created role.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceRoleCreate(options?: corde.IRoleCreateEventFilter): Promise<import("discord.js").Role>;

    /**
     * Emitted when a guild role is updated.
     *
     * @param options Optional filter to get the role.
     * @returns `old` and the `new` role value.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceRoleUpdate(
      options?: corde.IRoleUpdateEventFilter,
    ): Promise<[import("discord.js").Role, import("discord.js").Role]>;

    /**
     * Emitted when a role's `name` is updated.
     *
     * @param options Optional filter to get the role.
     * @returns `old` and the `new` role value.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceRoleRenamed(options?: corde.IRoleEventFilter): Promise<import("discord.js").Role>;

    /**
     * Emitted when a role's `position` is updated.
     *
     * @param options Optional filter to get the role.
     * @returns `old` and the `new` role value.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceRolePositionUpdate(options?: corde.IRoleEventFilter): Promise<import("discord.js").Role>;

    /**
     * Emitted when a role's `color` is updated.
     *
     * @param options Optional filter to get the role.
     * @returns `old` and the `new` role value.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceRoleUpdateColor(options?: corde.IRoleEventFilter): Promise<import("discord.js").Role>;

    /**
     * Emitted when a role's `hoist` is updated.
     *
     * @param options Optional filter to get the role.
     * @returns `old` and the `new` role value.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceRoleHoistUpdate(options?: corde.IRoleEventFilter): Promise<import("discord.js").Role>;

    /**
     * Emitted when a role's `mentionable` is updated.
     *
     * @param options Optional filter to get the role.
     * @returns `old` and the `new` role value.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceRoleMentionableUpdate(options?: corde.IRoleEventFilter): Promise<import("discord.js").Role>;

    /**
     * Emitted when a role's `permission` is updated.
     *
     * @param options Optional filter to get the role.
     * @returns Specified role that had his permissions updated.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceRolePermissionUpdate(
      options?: corde.IRolePermissionUpdateFilter,
    ): Promise<import("discord.js").Role>;

    /**
     * Emitted when a user's details (e.g. username) are changed.
     *
     * @param options Optional filter to get the user.
     * @returns Updated user based on the filter or anyone else.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceUserUpdate(
      options?: corde.IUserUpdateFilter,
    ): Promise<
      [import("discord.js").User | import("discord.js").PartialUser, import("discord.js").User]
    >;

    /**
     * Emitted when a user changes voice state - e.g. joins/leaves a channel, mutes/unmutes.
     *
     * @param options Optional filter to get the role.
     * @returns `Old` and the `new` voiceState value.
     *
     * @throws TimeoutError if no channel is created in the defined time.
     * @since 5.0
     */
    onceVoiceStateUpdate(
      options?: corde.IVoiceStateUpdateFilter,
    ): Promise<[import("discord.js").VoiceState, import("discord.js").VoiceState]>;
  }
}
