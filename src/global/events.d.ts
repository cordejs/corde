declare namespace corde {
  export interface IOnceEvents {
    /**
     * Emitted once a channel is created.
     * @returns Created channel.
     * @internal
     */
    onceChannelCreate(options?: corde.ICreateChannelFilter): Promise<import("discord.js").Channel>;
    /**
     * Emitted once a message is created.
     * @returns Created message.
     * @internal
     */
    onceMessage(
      options?: corde.IMessageEventOptions | undefined,
    ): Promise<import("discord.js").Message>;
    /**
     * @param filter
     * @returns A list of relation of reactions added and the author.
     * @internal
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
     * @returns Reaction removed.
     * @internal
     */
    onceMessageReactionRemoveEmoji(
      options?: corde.IMessageReactionRemoveOptions,
    ): Promise<import("discord.js").MessageReaction>;

    /**
     * @param filter
     * @returns A list of relation of reactions removed and the author.
     * @internal
     */
    onceMessageReactionsRemove(
      filter?: corde.ISearchMessageReactionsOptions | undefined,
    ): Promise<
      [
        import("discord.js").MessageReaction,
        void | import("discord.js").User | import("discord.js").PartialUser,
      ][]
    >;

    /**
     * Emitted once a channel is deleted.
     * @returns Deleted channel.
     * @internal
     */
    onceChannelDelete(options?: corde.IChannelDeleteOptions): Promise<import("discord.js").Channel>;

    /**
     * Emitted once the pins of a channel are updated.
     * Due to the nature of the WebSocket event, not much information can be provided easily here -
     * you need to manually check the pins yourself.
     *
     * @returns `Channel` and `date` of it's change.
     * @internal
     */
    onceChannelPinsUpdate(
      options?: corde.IChannelPinsUpdateOptions,
    ): Promise<[import("discord.js").Channel, Date]>;

    /**
     * Emitted once a channel is updated - e.g. name change, topic change.
     * @returns `Old channel` and `new value` of the channel.
     * @internal
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
     * @internal
     */
    onceRoleDelete(
      options?: corde.IRoleEventOptions | undefined,
    ): Promise<import("discord.js").Role>;

    /**
     * Emitted once a custom emoji is created in a guild.
     * @returns Created emoji.
     * @internal
     */
    onceEmojiCreate(options?: corde.IEmojiCreateOptions): Promise<import("discord.js").GuildEmoji>;

    /**
     * Emitted once a custom guild emoji is deleted.
     * @returns The emoji that was deleted.
     * @internal
     */
    onceEmojiDelete(options?: corde.IEmojiDeleteOptions): Promise<import("discord.js").GuildEmoji>;

    /**
     * Emitted once a custom guild emoji is updated.
     * @returns `Old` and `new` role value.
     * @internal
     */
    onceEmojiUpdate(
      options?: corde.IEmojiUpdateOptions,
    ): Promise<[import("discord.js").GuildEmoji, import("discord.js").GuildEmoji]>;

    /**
     * Emitted once a member is banned from a guild.
     * @returns `guild` where the user was banned from, and the `user` itself
     * @internal
     */
    onceGuildBan(
      options?: corde.IGuildBanOptions,
    ): Promise<[import("discord.js").Guild, import("discord.js").User]>;

    /**
     * Emitted once a member is unbanned from a guild.
     * @returns the `guild` that the user was removed
     * from ban, and the `user`.
     * @internal
     */
    onceGuildBanRemove(
      options?: corde.IGuildBanRemoveOptions,
    ): Promise<[import("discord.js").Guild, import("discord.js").User]>;

    /**
     * Emitted once the client joins a guild.
     * @returns Created guild.
     * @internal
     */
    onceGuildCreate(options?: corde.IGuildCreateFilterOptions): Promise<import("discord.js").Guild>;

    /**
     * Emitted once a guild is deleted/left.
     * @returns Deleted guild.
     * @internal
     */
    onceGuildDelete(options?: corde.IGuildDeleteOptions): Promise<import("discord.js").Guild>;

    /**
     * Emitted once a user joins a guild.
     * @returns Member who was added to guild.
     * @internal
     */
    onceGuildMemberAdd(
      options?: corde.IGuildMemberAvailableOptions,
    ): Promise<import("discord.js").GuildMember>;

    /**
     * Emitted once a member becomes available in a large guild.
     * @returns Guild who is available.
     * @internal
     */
    onceGuildMemberAvailable(): Promise<
      import("discord.js").GuildMember | import("discord.js").PartialGuildMember
    >;

    /**
     * Emitted once a member leaves a guild, or is kicked.
     * @returns Member of guild who kicked.
     * @internal
     */
    onceGuildMemberRemove(): Promise<
      import("discord.js").GuildMember | import("discord.js").PartialGuildMember
    >;

    /**
     * Emitted once a chunk of guild members is received (all members come from the same guild).
     * @returns The collection of members that the guild received.
     * @internal
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
     * @internal
     */
    onceGuildMemberSpeaking(
      options?: corde.IGuildMemberSpeakingOptions,
    ): Promise<import("discord.js").GuildMember | import("discord.js").PartialGuildMember>;

    /**
     * Emitted once a guild member changes - i.e. new role, removed role, nickname.
     * @returns Old and the new value of the guild member.
     * @internal
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
     * @internal
     */
    onceGuildUnavailable(): Promise<import("discord.js").Guild>;

    /**
     * Emitted once a guild is updated - e.g. name change.
     * @returns The old and new value of the updated guild.
     * @internal
     */
    onceGuildUpdate(): Promise<[import("discord.js").Guild, import("discord.js").Guild]>;

    /**
     * Emitted once a message is deleted.
     * @returns Deleted message.
     * @internal
     */
    onceMessageDelete(): Promise<
      import("discord.js").Message | import("discord.js").PartialMessage
    >;

    /**
     * Emitted once messages are deleted in bulk.
     * @returns Collection of messages that was deleted.
     * @internal
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
     * @internal
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
     * @internal
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
     * @internal
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
     * @internal
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
     * @internal
     */
    onceMessageContentOrEmbedChange(
      options?: corde.IMessageEventOptions,
    ): Promise<import("discord.js").Message>;

    /**
     * Emitted once a guild member's presence changes, or they change one of their details.
     * @returns Old and new presence values.
     * @internal
     */
    oncePresenceUpdate(): Promise<import("discord.js").Presence>;

    /**
     * Emitted once a role is created.
     * @returns Created role.
     * @internal
     */
    onceRoleCreate(): Promise<import("discord.js").Role>;

    /**
     * Emitted once a guild role is updated.
     * @returns `old` and the `new` role value.
     * @internal
     */
    onceRoleUpdate(): Promise<[import("discord.js").Role, import("discord.js").Role]>;
    /**
     * @internal
     */
    onceRoleRenamed(options?: corde.IRoleEventOptions): Promise<import("discord.js").Role>;

    /**
     * @internal
     */
    onceRolePositionUpdate(options?: corde.IRoleEventOptions): Promise<import("discord.js").Role>;
    /**
     * @internal
     */
    onceRoleUpdateColor(options?: corde.IRoleEventOptions): Promise<import("discord.js").Role>;
    /**
     * @internal
     */
    onceRoleHoistUpdate(options?: corde.IRoleEventOptions): Promise<import("discord.js").Role>;
    /**
     * @internal
     */
    onceRoleMentionableUpdate(
      options?: corde.IRoleEventOptions,
    ): Promise<import("discord.js").Role>;

    /**
     * Waits for changes in permission of a specific role.
     * @param roleIdentifier `id` or `name` to identify the role.
     * @returns Specified role that had his permissions updated.
     * @internal
     */
    onceRolePermissionUpdate(
      roleIdentifier: IRoleIdentifier,
      timeout?: number,
      guildId?: string,
    ): Promise<import("discord.js").Role>;

    /**
     * Emitted whenever a user's details (e.g. username) are changed.
     * @param fn function to receive the old and the new value of the user.
     * @internal
     */
    onceUserUpdate(): Promise<
      [import("discord.js").User | import("discord.js").PartialUser, import("discord.js").User]
    >;

    /**
     * Emitted once a user changes voice state - e.g. joins/leaves a channel, mutes/unmutes.
     * @returns `Old` and the `new` voiceState value.
     * @internal
     */
    onceVoiceStateUpdate(): Promise<
      [import("discord.js").VoiceState, import("discord.js").VoiceState]
    >;
  }
  export interface ICommandEvent {
    waitMessage(): Promise<import("discord.js").Message>;
  }
}
