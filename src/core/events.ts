import {
  Channel,
  Client,
  ClientEvents,
  Collection,
  Guild,
  GuildEmoji,
  GuildMember,
  Message,
  MessageReaction,
  PartialDMChannel,
  PartialGuildMember,
  PartialMessage,
  PartialUser,
  Presence,
  Role,
  Speaking,
  User,
  VoiceState,
} from "discord.js";
import { once } from "events";
import { RolePermission } from "..";
import { RoleData } from "../types";

interface EventResume {
  count: number;
  index: number;
  nonce: string;
}

// https://gist.github.com/koad/316b265a91d933fd1b62dddfcc3ff584

/**
 * Encapsulation of Discord.js events.
 */
export class Events {
  protected readonly _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  /**
   * Execute an event `once` returning it's response.
   * @param event event's name.
   */
  private async _once<T extends any>(event: keyof ClientEvents): Promise<T> {
    const response = await once(this._client, event);

    if (response.length === 1) {
      return response[0];
    }
    return response as T;
  }

  /**
   * Emitted when the client becomes ready to start working.
   * @param fn Operation to be executed after client becomes ready.
   */
  public onReady(fn: () => void) {
    this._client.on("ready", fn);
  }

  /**
   * Emitted once the client becomes ready to start working.
   */
  public onceReady() {
    return this._once<void>("ready");
  }

  /**
   * Emitted when a **bot** removes a emoji from a message.
   */
  public onMessageReactionRemoveEmoji(fn: (reaction: MessageReaction) => void) {
    this._client.on("messageReactionRemoveEmoji", fn);
  }

  /**
   * Emitted once a **bot** removes a emoji from a message.
   * @returns Reaction removed.
   */
  public onceMessageReactionRemoveEmoji() {
    return this._once<MessageReaction>("messageReactionRemoveEmoji");
  }

  /**
   * Emitted when a channel is created.
   * @param fn function to receive the event.
   */
  public onChannelCreate(fn: (channel: Channel) => void) {
    this._client.on("channelCreate", fn);
  }

  /**
   * Emitted once a channel is created.
   * @returns Created channel.
   */
  public onceChannelCreate() {
    return this._once<Channel>("channelCreate");
  }

  /**
   * Emitted whenever a channel is deleted.
   * @param fn function to receive the deleted channel
   */
  public onChannelDelete(fn: (deletedChannel: Channel) => void) {
    this._client.on("channelDelete", fn);
  }

  /**
   * Emitted once a channel is deleted.
   * @returns Deleted channel.
   */
  public onceChannelDelete() {
    return this._once<Channel>("channelDelete");
  }

  /**
   * Emitted whenever the pins of a channel are updated.
   * Due to the nature of the WebSocket event, not much information can be provided easily here -
   * you need to manually check the pins yourself.
   *
   * @param fn function to receive the channel and the time that it was updated.
   */
  public onChannelPinsUpdate(fn: (channel: Channel, updateTime: Date) => void) {
    this._client.on("channelPinsUpdate", fn);
  }

  /**
   * Emitted once the pins of a channel are updated.
   * Due to the nature of the WebSocket event, not much information can be provided easily here -
   * you need to manually check the pins yourself.
   *
   * @returns `Channel` and `date` of it's change.
   */
  public async onceChannelPinsUpdate(): Promise<[Channel, Date]> {
    return this._once<[Channel, Date]>("channelPinsUpdate");
  }

  /**
   * Emitted whenever a channel is updated - e.g. name change, topic change.
   * @param fn function to receive the channel change
   */
  public onChannelUpdate(fn: (oldChannel: Channel, newChannel: Channel) => void) {
    this._client.on("channelUpdate", fn);
  }

  /**
   * Emitted once a channel is updated - e.g. name change, topic change.
   * @returns `Old channel` and `new value` of the channel.
   */
  public async onceChannelUpdate(): Promise<[Channel, Channel]> {
    return this._once<[Channel, Channel]>("channelUpdate");
  }

  /**
   * Emitted for general debugging information.
   * @param fn
   */
  public onDebug(fn: (arg: string) => void) {
    this._client.on("debug", fn);
  }

  /**
   * Emitted once for general debugging information.
   */
  public onceDebug() {
    return this._once<void>("debug");
  }

  /**
   * Emitted whenever a guild role is deleted.
   * @param fn function to receive the deleted role.
   */
  public onRoleDelete(fn: (role: Role) => void) {
    this._client.on("roleDelete", fn);
  }

  /**
   * Emitted once a guild role is deleted.
   * @returns Deleted role.
   */
  public onceRoleDelete() {
    return this._once<Role>("roleDelete");
  }

  /**
   * Emitted whenever the client's WebSocket disconnects and will no longer attempt to reconnect.
   * @param fn function to receive the event.
   */
  public onDisconnect(fn: (closeEvent: CloseEvent) => void) {
    this._client.on("disconnect", fn);
  }

  /**
   * Emitted once the client's WebSocket disconnects and will no longer attempt to reconnect.
   * @returns Close event.
   */
  public onceDisconnect() {
    return this._once<CloseEvent>("disconnect");
  }

  /**
   * Emitted whenever a custom emoji is created in a guild.
   * @param fn function to receive the created emoji
   */
  public onEmojiCreate(fn: (createdEmoji: GuildEmoji) => void) {
    this._client.on("emojiCreate", fn);
  }

  /**
   * Emitted once a custom emoji is created in a guild.
   * @returns Created emoji.
   */
  public onceEmojiCreate() {
    return this._once<GuildEmoji>("emojiCreate");
  }

  /**
   * Emitted whenever a custom guild emoji is deleted.
   * @param fn function to receive the deleted emoji.
   */
  public onEmojiDelete(fn: (emojiDeleted: GuildEmoji) => void) {
    this._client.on("emojiDelete", fn);
  }

  /**
   * Emitted once a custom guild emoji is deleted.
   * @returns The emoji that was deleted
   */
  public onceEmojiDelete() {
    return this._once<GuildEmoji>("emojiDelete");
  }

  /**
   * Emitted whenever a custom guild emoji is updated.
   * @param fn function to receice the old and the new value of the emoji.
   */
  public onEmojiUpdate(fn: (oldEmoji: GuildEmoji, newEmoji: GuildEmoji) => void) {
    this._client.on("emojiUpdate", fn);
  }

  /**
   * Emitted once a custom guild emoji is updated.
   * @returns `Old` and `new` role value.
   */
  public onceEmojiUpdate(): Promise<[GuildEmoji, GuildEmoji]> {
    return this._once<[GuildEmoji, GuildEmoji]>("emojiUpdate");
  }

  /**
   * Emitted whenever the client's WebSocket encounters a connection error.
   * @param fn function to receive the error.
   */
  public onError(fn: (error: Error) => void) {
    this._client.on("error", fn);
  }

  /**
   * Emitted once the client's WebSocket encounters a connection error.
   * @return Found error.
   */
  public onceError() {
    return this._once<Error>("error");
  }

  /**
   * Emitted whenever a member is banned from a guild.
   * @param fn function to receive the guild where the user was removed from,
   * and the user itself.
   */
  public onGuildBan(fn: (guild: Guild, user: User) => void) {
    this._client.on("guildBanAdd", fn);
  }

  /**
   * Emitted once a member is banned from a guild.
   * @returns `guild` where the user was banned from, and the `user` itself
   */
  public onceGuildBan() {
    return this._once<[Guild, User]>("guildBanAdd");
  }

  /**
   * Emitted whenever a member is unbanned from a guild.
   * @param fn function to receive the guild that the user was removed
   * from ban, and the user.
   */
  public onGuilBanRemove(fn: (guild: Guild, user: User) => void) {
    this._client.on("guildBanRemove", fn);
  }

  /**
   * Emitted once a member is unbanned from a guild.
   * @returns the `guild` that the user was removed
   * from ban, and the `user`.
   */
  public onceGuilBanRemove() {
    return this._once<[Guild, User]>("guildBanRemove");
  }

  /**
   * Emitted whenever the client joins a guild.
   * @param fn function to receive the created guild.
   */
  public onGuildCreate(fn: (createdGuild: Guild) => void) {
    this._client.on("guildCreate", fn);
  }

  /**
   * Emitted once the client joins a guild.
   * @returns Created guild.
   */
  public onceGuildCreate() {
    return this._once<Guild>("guildCreate");
  }

  /**
   * Emitted whenever a guild is deleted/left.
   * @param fn function to receive the deleted guild.
   */
  public onGuildDelete(fn: (deletedGuild: Guild) => void) {
    this._client.on("guildDelete", fn);
  }

  /**
   * Emitted once a guild is deleted/left.
   * @returns Deleted guild.
   */
  public onceGuildDelete() {
    return this._once<Guild>("guildDelete");
  }

  /**
   * Emitted whenever a user joins a guild.
   * @param fn function to receive the member who was added to guild.
   */
  public onGuildMemberAdd(fn: (member: GuildMember) => void) {
    this._client.on("guildMemberAdd", fn);
  }

  /**
   * Emitted once a user joins a guild.
   * @returns Member who was added to guild.
   */
  public onceGuildMemberAdd() {
    return this._once<GuildMember>("guildMemberAdd");
  }

  /**
   * Emitted whenever a member becomes available in a large guild.
   * @param fn function to receive the guild who is available.
   */
  public onGuildMemberAvailable(fn: (member: GuildMember | PartialGuildMember) => void) {
    this._client.on("guildMemberAvailable", fn);
  }

  /**
   * Emitted once a member becomes available in a large guild.
   * @returns Guild who is available.
   */
  public onceGuildMemberAvailable() {
    return this._once<GuildMember | PartialGuildMember>("guildMemberAvailable");
  }

  /**
   * Emitted whenever a member leaves a guild, or is kicked.
   * @param fn function to receive the member of guild who kicked.
   */
  public onGuildMemberRemove(fn: (member: GuildMember | PartialGuildMember) => void) {
    this._client.on("guildMemberRemove", fn);
  }

  /**
   * Emitted once a member leaves a guild, or is kicked.
   * @returns Member of guild who kicked.
   */
  public onceGuildMemberRemove() {
    return this._once<GuildMember | PartialGuildMember>("guildMemberRemove");
  }

  /**
   * Emitted whenever a chunk of guild members is received (all members come from the same guild).
   * @param fn function to receive the collection of members that the guild received.
   */
  public onGuildMemberChunk(
    fn: (members: Collection<string, GuildMember>, guild: Guild, eventResume: EventResume) => void,
  ) {
    this._client.on("guildMembersChunk", fn);
  }

  /**
   * Emitted once a chunk of guild members is received (all members come from the same guild).
   * @returns The collection of members that the guild received.
   */
  public onceGuildMemberChunk() {
    return this._once<[Collection<string, GuildMember>, Guild, EventResume]>("guildMembersChunk");
  }

  /**
   * Emitted whenever a guild member starts/stops speaking.
   * @param fn function to receive the guild's member who is speaking.
   */
  public onGuildMemberSpeaking(
    fn: (member: GuildMember | PartialGuildMember, speaking: Readonly<Speaking>) => void,
  ) {
    this._client.on("guildMemberSpeaking", fn);
  }

  /**
   * Emitted once a guild member starts/stops speaking.
   * @returns The guild's member who is speaking.
   */
  public onceGuildMemberSpeaking() {
    return this._once<[GuildMember | PartialGuildMember, Readonly<Speaking>]>(
      "guildMemberSpeaking",
    );
  }

  /**
   * Emitted whenever a guild member changes - i.e. new role, removed role, nickname.
   * @param fn function to receive the old and the new value of the guild member.
   */
  public onGuildMemberUpdate(
    fn: (oldMember: GuildMember | PartialGuildMember, newMember: GuildMember) => void,
  ) {
    this._client.on("guildMemberUpdate", fn);
  }

  /**
   * Emitted once a guild member changes - i.e. new role, removed role, nickname.
   * @returns Old and the new value of the guild member.
   */
  public onceGuildMemberUpdate() {
    return this._once<[GuildMember | PartialGuildMember, GuildMember]>("guildMemberUpdate");
  }

  /**
   * Emitted whenever a guild becomes unavailable, likely due to a server outage.
   * @param fn function to receive the unvailable guild.
   */
  public onGuildUnavailable(fn: (guild: Guild) => void) {
    this._client.on("guildUnavailable", fn);
  }

  /**
   * Emitted once a guild becomes unavailable, likely due to a server outage.
   * @returns Unvailable guild.
   */
  public onceGuildUnavailable() {
    return this._once<Guild>("guildUnavailable");
  }

  /**
   * Emitted whenever a guild is updated - e.g. name change.
   * @param fn function to receive the old and new value of the updated guild.
   */
  public onGuildUpdate(fn: (oldGuild: Guild, newGuild: Guild) => void) {
    this._client.on("guildUpdate", fn);
  }

  /**
   * Emitted once a guild is updated - e.g. name change.
   * @returns The old and new value of the updated guild.
   */
  public onceGuildUpdate() {
    return this._once<[Guild, Guild]>("guildUpdate");
  }

  /**
   * Emitted whenever a message is created.
   * @param fn function to receive the created message.
   */
  public onMessage(fn: (message: Message) => void) {
    this._client.on("message", fn);
  }

  /**
   * Emitted once a message is created.
   * @returns Created message.
   */
  public onceMessage() {
    return this._once<Message>("message");
  }

  /**
   * Emitted whenever a message is deleted.
   * @param fn function to receive the deleted message.
   */
  public onMessageDelete(fn: (deletedMessage: Message | PartialMessage) => void) {
    this._client.on("messageDelete", fn);
  }

  /**
   * Emitted once a message is deleted.
   * @returns Deleted message.
   */
  public onceMessageDelete() {
    return this._once<Message | PartialMessage>("messageDelete");
  }

  /**
   * Emitted whenever messages are deleted in bulk.
   * @param fn function to receive the collection of messages that
   * was deleted.
   */
  public onMessageDeleteBulk(
    fn: (deletedMessages: Collection<string, Message | PartialMessage>) => void,
  ) {
    this._client.on("messageDeleteBulk", fn);
  }

  /**
   * Emitted once messages are deleted in bulk.
   * @returns Collection of messages that was deleted.
   */
  public onceMessageDeleteBulk() {
    return this._once<Collection<string, Message | PartialMessage>>("messageDeleteBulk");
  }

  /**
   * Emitted whenever a reaction is added to a message.
   * @param fn function to receive the added reaction and it's author.
   */
  public onMessageReactionAdd(
    fn: (addedReaction: MessageReaction, author: User | PartialUser) => void,
  ) {
    this._client.on("messageReactionAdd", fn);
  }

  /**
   * Emitted once a reaction is added to a message.
   * @returns Added reaction and it's author.
   */
  public onceMessageReactionAdd() {
    return this._once<[MessageReaction, User | PartialUser]>("messageReactionAdd");
  }

  /**
   * Emitted whenever a reaction is removed from a message.
   * @param fn function to receive the removed reaction and the author
   * of the remotion.
   */
  public onMessageReactionRemove(
    fn: (removedReaction: MessageReaction, author: User | PartialUser) => void,
  ) {
    this._client.on("messageReactionRemove", fn);
  }

  /**
   * Emitted once a reaction is removed from a message.
   * @returns Removed reaction and the author of the remotion.
   */
  public onceMessageReactionRemove() {
    return this._once<[MessageReaction, User | PartialUser]>("messageReactionRemove");
  }

  /**
   * Emitted whenever all reactions are removed from a message.
   * @param fn function to receive the message who had it's reactions
   * removed.
   */
  public onMessageReactionRemoveAll(fn: (message: Message | PartialMessage) => void) {
    this._client.on("messageReactionRemoveAll", fn);
  }

  /**
   * Emitted whenever all reactions are removed from a message.
   * @param fn Message who had it's reactions removed.
   */
  public onceMessageReactionRemoveAll() {
    return this._once<Message | PartialMessage>("messageReactionRemoveAll");
  }

  /**
   * Emitted whenever a message is updated - e.g. embed or content change.
   * @param fn function to receive the old and new value of a message.
   */
  public onMessageUpdate(
    fn: (oldMessage: Message | PartialMessage, newMessage: Message | PartialMessage) => void,
  ) {
    this._client.on("messageUpdate", fn);
  }

  /**
   * Emitted once a message is updated - e.g. embed or content change.
   * @returns `Old` and `new` value of a message.
   */
  public onceMessageUpdate() {
    return this._once<[Message | PartialMessage, Message | PartialMessage]>("messageUpdate");
  }

  /**
   * Emitted whenever a guild member's presence changes, or they change one of their details.
   * @param fn function to receive the old and new presence values.
   */
  public onPresenceUpdate(fn: (oldMember: Presence, newMember: Presence) => void) {
    this._client.on("presenceUpdate", fn);
  }

  /**
   * Emitted once a guild member's presence changes, or they change one of their details.
   * @returns Old and new presence values.
   */
  public oncePresenceUpdate() {
    return this._once<[Presence, Presence]>("presenceUpdate");
  }

  /**
   * Emitted whenever a role is created.
   * @param fn function to receive the created role.
   */
  public onRoleCreate(fn: (createdRole: Role) => void) {
    this._client.on("roleCreate", fn);
  }

  /**
   * Emitted once a role is created.
   * @returns Created role.
   */
  public onceRoleCreate() {
    return this._once<Role>("roleCreate");
  }

  /**
   * Emitted whenever a guild role is updated.
   * @param fn function to receive the old and the new role value.
   */
  public onRoleUpdate(fn: (oldRole: Role, newRole: Role) => void) {
    this._client.on("roleUpdate", fn);
  }

  /**
   * Emitted once a guild role is updated.
   * @returns `old` and the `new` role value.
   */
  public onceRoleUpdate() {
    return this._once<[Role, Role]>("roleUpdate");
  }

  /**
   * Waits for changes in permission of a specific role.
   * @param roleData `id` or `name` to identify the role.
   * @returns Specified role that had his permissions updated.
   */
  public waitRolePermissionUpdate(roleData: RoleData) {
    return new Promise<Role>((resolve) => {
      this.onRoleUpdate((oldRole, newRole) => {
        if (newRole.id !== roleData.id && newRole.name !== roleData.name) {
          return;
        }

        if (!oldRole.permissions.equals(newRole.permissions)) {
          resolve(newRole);
        }
      });
    });
  }

  /**
   * Emitted whenever a user starts typing in a channel.
   * @param fn function to receive the channel (where) and the user (who)
   * is typing.
   */
  public onTypingStart(
    fn: (channel: Channel | PartialDMChannel, user: User | PartialUser) => void,
  ) {
    this._client.on("typingStart", fn);
  }

  /**
   * Emitted once a user starts typing in a channel.
   * @returns `Channel` (where) and the `user` (who) is typing.
   */
  public onceTypingStart() {
    return this._once<[Channel | PartialDMChannel, User | PartialUser]>("typingStart");
  }

  /**
   * Emitted whenever a user's details (e.g. username) are changed.
   * @param fn function to receive the old and the new value of the user.
   */
  public onUserUpdate(fn: (oldUser: User | PartialUser, newUser: User) => void) {
    this._client.on("userUpdate", fn);
  }

  /**
   * Emitted once a user's details (e.g. username) are changed.
   * @returns `Old` and the `new` value of the user.
   */
  public onceUserUpdate() {
    return this._once<[User | PartialUser, User]>("userUpdate");
  }

  /**
   * Emitted whenever a user changes voice state - e.g. joins/leaves a channel, mutes/unmutes.
   * @param fn function to receive the old and the new voiceState value.
   */
  public onVoiceStateUpdate(fn: (oldMember: VoiceState, newMember: VoiceState) => void) {
    this._client.on("voiceStateUpdate", fn);
  }

  /**
   * Emitted once a user changes voice state - e.g. joins/leaves a channel, mutes/unmutes.
   * @returns `Old` and the `new` voiceState value.
   */
  public onceVoiceStateUpdate() {
    return this._once<[VoiceState, VoiceState]>("voiceStateUpdate");
  }
}
