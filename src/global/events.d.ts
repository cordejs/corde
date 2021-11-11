declare namespace corde {
  /**
   * Define events emitted by Discord.js used internally by corde to test
   * each bot operation in a Promise response with filters.
   */
  export interface IOnceEvents {
    /**
     * Emitted when a guild channel is created.
     * @param options Filter to get a channel.
     * @returns The first channel created, or another one based on a filter.
     * @since 5.0
     */
    onceChannelCreate(options?: corde.ICreateChannelFilter): Promise<import("discord.js").Channel>;

    /**
     * Emitted once a message is created.
     * @param options Filter to get a message.
     * @returns The first message created, or another one based on a filter.
     * @since 5.0
     */
    onceMessage(
      options?: corde.IMessageEventOptions | undefined,
    ): Promise<import("discord.js").Message>;

    /**
     * Emitted when a reaction is added to a cached message.
     * @param options Filter to get a reaction.
     * @returns A list of relation of reactions added and the author.
     * @since 5.0
     */
    onceMessageReactionAdd(
      options?: corde.IMessageReactionAddOptions,
    ): Promise<
      [
        import("discord.js").MessageReaction,
        import("discord.js").User | import("discord.js").PartialUser,
      ]
    >;

    /**
     * Emitted when a bulk of reactions is added to a cached message.
     *
     * This functions is similar to `onceMessageReactionAdd`
     * but handling multiple reaction at once in a single message.
     *
     * @param options Filter to get the reactions.
     * @returns First reaction added or a list of reactions based on a filter
     * @since 5.0
     */
    onceMessageReactionsAdd(
      options?: corde.ISearchMessageReactionsOptions | undefined,
    ): Promise<
      [
        import("discord.js").MessageReaction,
        void | import("discord.js").User | import("discord.js").PartialUser,
      ][]
    >;

    /**
     * Emitted once a **bot** removes a emoji from a message.
     * @param options Filter to get the reaction.
     * @returns First reaction removed or another one based on a filter.
     * @since 5.0
     */
    onceMessageReactionRemoveEmoji(
      options?: corde.IMessageReactionRemoveOptions,
    ): Promise<import("discord.js").MessageReaction>;

    /**
     * Emitted when a channel is deleted.
     * @param options
     * @returns Deleted channel.
     * @since 5.0
     */
    onceChannelDelete(options?: corde.IChannelDeleteOptions): Promise<import("discord.js").Channel>;

    /**
     * Emitted once the pins of a channel are updated.
     * Due to the nature of the WebSocket event, not much information can be provided easily here -
     * you need to manually check the pins yourself.
     *
     * @returns `Channel` and `date` of it's change.
     * @since 5.0
     */
    onceChannelPinsUpdate(
      options?: corde.IChannelPinsUpdateOptions,
    ): Promise<[import("discord.js").Channel, Date]>;

    /**
     * Emitted once a channel is updated - e.g. name change, topic change.
     * @returns `Old channel` and `new value` of the channel.
     * @since 5.0
     */
    onceChannelUpdate(
      options?: corde.IChannelUpdateOptions,
    ): Promise<[import("discord.js").Channel, import("discord.js").Channel]>;

    /**
     * Emitted once a guild role is deleted.
     * If `roleIdentifier` is informed, returns the deleted role that
     * match with `roleIdentifier` value, if not, returns the first role deleted.
     *
     * Waits for a determined timeout, rejecting this async function if reaches
     * the timeout value.
     *
     * @param roleIdentifier Identifiers of the role.
     * @param timeout Time that this functions should wait for a response.
     * @returns Deleted role.
     * @since 5.0
     */
    onceRoleDelete(
      options?: corde.IRoleEventOptions | undefined,
    ): Promise<import("discord.js").Role>;

    /**
     * Emitted once a custom emoji is created in a guild.
     * @returns Created emoji.
     * @since 5.0
     */
    onceEmojiCreate(options?: corde.IEmojiCreateOptions): Promise<import("discord.js").GuildEmoji>;

    /**
     * Emitted once a custom guild emoji is deleted.
     * @returns The emoji that was deleted.
     * @since 5.0
     */
    onceEmojiDelete(options?: corde.IEmojiDeleteOptions): Promise<import("discord.js").GuildEmoji>;

    /**
     * Emitted once a custom guild emoji is updated.
     * @returns `Old` and `new` role value.
     * @since 5.0
     */
    onceEmojiUpdate(
      options?: corde.IEmojiUpdateOptions,
    ): Promise<[import("discord.js").GuildEmoji, import("discord.js").GuildEmoji]>;

    /**
     * Emitted once a member is banned from a guild.
     * @returns `guild` where the user was banned from, and the `user` itself
     * @since 5.0
     */
    onceGuildBan(
      options?: corde.IGuildBanOptions,
    ): Promise<[import("discord.js").Guild, import("discord.js").User]>;

    /**
     * Emitted once a member is unbanned from a guild.
     * @returns the `guild` that the user was removed
     * from ban, and the `user`.
     * @since 5.0
     */
    onceGuildBanRemove(
      options?: corde.IGuildBanRemoveOptions,
    ): Promise<[import("discord.js").Guild, import("discord.js").User]>;

    /**
     * Emitted once the client joins a guild.
     * @returns Created guild.
     * @since 5.0
     */
    onceGuildCreate(options?: corde.IGuildCreateFilterOptions): Promise<import("discord.js").Guild>;

    /**
     * Emitted once a guild is deleted/left.
     * @returns Deleted guild.
     * @since 5.0
     */
    onceGuildDelete(options?: corde.IGuildDeleteOptions): Promise<import("discord.js").Guild>;

    /**
     * Emitted once a user joins a guild.
     * @returns Member who was added to guild.
     * @since 5.0
     */
    onceGuildMemberAdd(
      options?: corde.IGuildMemberAvailableOptions,
    ): Promise<import("discord.js").GuildMember>;

    /**
     * Emitted once a member becomes available in a large guild.
     * @returns Guild who is available.
     * @since 5.0
     */
    onceGuildMemberAvailable(): Promise<
      import("discord.js").GuildMember | import("discord.js").PartialGuildMember
    >;

    /**
     * Emitted once a member leaves a guild, or is kicked.
     * @returns Member of guild who kicked.
     * @since 5.0
     */
    onceGuildMemberRemove(): Promise<
      import("discord.js").GuildMember | import("discord.js").PartialGuildMember
    >;

    /**
     * Emitted once a chunk of guild members is received (all members come from the same guild).
     * @returns The collection of members that the guild received.
     * @since 5.0
     */
    onceGuildMemberChunk(
      options?: corde.IGuildMemberChunkOptions,
    ): Promise<
      [
        import("discord.js").Collection<string, import("discord.js").GuildMember>,
        import("discord.js").Guild,
      ]
    >;

    /**
     * Emitted once a guild member starts/stops speaking.
     * @returns The guild's member who is speaking.
     * @since 5.0
     */
    onceGuildMemberSpeaking(
      options?: corde.IGuildMemberSpeakingOptions,
    ): Promise<import("discord.js").GuildMember | import("discord.js").PartialGuildMember>;

    /**
     * Emitted once a guild member changes - i.e. new role, removed role, nickname.
     * @returns Old and the new value of the guild member.
     * @since 5.0
     */
    onceGuildMemberUpdate(): Promise<
      [
        import("discord.js").GuildMember | import("discord.js").PartialGuildMember,
        import("discord.js").GuildMember,
      ]
    >;

    /**
     * Emitted once a guild becomes unavailable, likely due to a server outage.
     * @returns Unvailable guild.
     * @since 5.0
     */
    onceGuildUnavailable(): Promise<import("discord.js").Guild>;

    /**
     * Emitted once a guild is updated - e.g. name change.
     * @returns The old and new value of the updated guild.
     * @since 5.0
     */
    onceGuildUpdate(): Promise<[import("discord.js").Guild, import("discord.js").Guild]>;

    /**
     * Emitted once a message is deleted.
     * @returns Deleted message.
     * @since 5.0
     */
    onceMessageDelete(): Promise<
      import("discord.js").Message | import("discord.js").PartialMessage
    >;

    /**
     * Emitted once messages are deleted in bulk.
     * @returns Collection of messages that was deleted.
     * @since 5.0
     */
    onceMessageDeleteBulk(): Promise<
      import("discord.js").Collection<
        string,
        import("discord.js").Message | import("discord.js").PartialMessage
      >
    >;

    /**
     * Emitted once a reaction is removed from a message.
     * @returns Removed reaction and the author of the remotion.
     * @since 5.0
     */
    onceMessageReactionRemove(): Promise<
      [
        import("discord.js").MessageReaction,
        import("discord.js").User | import("discord.js").PartialUser,
      ]
    >;

    /**
     * Emitted once a message is updated - e.g. embed or content change.
     * @returns `Old` and `new` value of a message.
     * @since 5.0
     */
    onceMessageUpdate(): Promise<
      [
        import("discord.js").Message | import("discord.js").PartialMessage,
        import("discord.js").Message | import("discord.js").PartialMessage,
      ]
    >;

    /**
     * Emitted once a message is pinned
     *
     * @param messageIdentifier IIdentifier of the message
     * @param timeout timeout to wait
     * @returns The pinned message
     * @since 5.0
     */
    onceMessagePinned(
      options?: corde.IMessageEventOptions,
    ): Promise<import("discord.js").Message | import("discord.js").PartialMessage>;

    /**
     * Emitted once a message is unPinned
     *
     * @param messageIdentifier IIdentifier of the message
     * @param timeout timeout to wait
     * @returns The pinned message
     * @since 5.0
     */
    onceMessageUnPinned(
      options?: corde.IMessageEventOptions,
    ): Promise<import("discord.js").Message | import("discord.js").PartialMessage>;

    /**
     * Emitted once a message with `id` x or `content` y, or its embed message has changed.
     *
     * @param messageIdentifier IIdentifier of the message
     * @param timeout time to wait for change
     * @returns A message who had his content changed
     * @since 5.0
     */
    onceMessageContentOrEmbedChange(
      options?: corde.IMessageEventOptions,
    ): Promise<import("discord.js").Message>;

    /**
     * Emitted once a guild member's presence changes, or they change one of their details.
     * @returns Old and new presence values.
     * @since 5.0
     */
    oncePresenceUpdate(): Promise<import("discord.js").Presence>;

    /**
     * Emitted once a role is created.
     * @returns Created role.
     * @since 5.0
     */
    onceRoleCreate(): Promise<import("discord.js").Role>;

    /**
     * Emitted once a guild role is updated.
     * @returns `old` and the `new` role value.
     * @since 5.0
     */
    onceRoleUpdate(): Promise<[import("discord.js").Role, import("discord.js").Role]>;

    /**
     * @since 5.0
     */
    onceRoleRenamed(options?: corde.IRoleEventOptions): Promise<import("discord.js").Role>;

    /**
     * @since 5.0
     */
    onceRolePositionUpdate(options?: corde.IRoleEventOptions): Promise<import("discord.js").Role>;

    /**
     * @since 5.0
     */
    onceRoleUpdateColor(options?: corde.IRoleEventOptions): Promise<import("discord.js").Role>;

    /**
     * @since 5.0
     */
    onceRoleHoistUpdate(options?: corde.IRoleEventOptions): Promise<import("discord.js").Role>;

    /**
     * @since 5.0
     */
    onceRoleMentionableUpdate(
      options?: corde.IRoleEventOptions,
    ): Promise<import("discord.js").Role>;

    /**
     * Waits for changes in permission of a specific role.
     * @param roleIdentifier `id` or `name` to identify the role.
     * @returns Specified role that had his permissions updated.
     * @since 5.0
     */
    onceRolePermissionUpdate(
      roleIdentifier: IRoleIdentifier,
      timeout?: number,
      guildId?: string,
    ): Promise<import("discord.js").Role>;

    /**
     * Emitted whenever a user's details (e.g. username) are changed.
     * @param fn function to receive the old and the new value of the user.
     * @since 5.0
     */
    onceUserUpdate(): Promise<
      [import("discord.js").User | import("discord.js").PartialUser, import("discord.js").User]
    >;

    /**
     * Emitted once a user changes voice state - e.g. joins/leaves a channel, mutes/unmutes.
     * @returns `Old` and the `new` voiceState value.
     * @since 5.0
     */
    onceVoiceStateUpdate(): Promise<
      [import("discord.js").VoiceState, import("discord.js").VoiceState]
    >;
  }
  export interface ICommandEvent {
    waitMessage(): Promise<import("discord.js").Message>;
  }
}
