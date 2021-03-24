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
import { runtime } from "../common";
import { DEFAULT_TEST_TIMEOUT } from "../consts";
import { TimeoutError } from "../errors";
import { EmojiLike, MessageIdentifier, RoleIdentifier } from "../types";
import { deepEqual, executePromiseWithTimeout } from "../utils";
import { Validator } from "../utils";

export interface EventResume {
  count: number;
  index: number;
  nonce: string;
}

export interface SearchMessageReactionsOptions {
  emojis?: EmojiLike[];
  messageIdentifier?: MessageIdentifier;
  authorId?: string;
  timeout?: number;
}

// https://gist.github.com/koad/316b265a91d933fd1b62dddfcc3ff584

/**
 * Encapsulation of Discord.js events.
 * @internal
 */
export class Events {
  protected readonly _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  /**
   * Emitted when the client becomes ready to start working.
   * @param fn Operation to be executed after client becomes ready.
   * @internal
   */
  public onReady(fn: () => void): void {
    this._client.on("ready", fn);
  }

  /**
   * Emitted once the client becomes ready to start working.
   * @internal
   */
  public async onceReady(): Promise<void> {
    await this._once<void>("ready");
    return;
  }

  /**
   * Emitted when a **bot** removes a emoji from a message.
   * @internal
   */
  public onMessageReactionRemoveEmoji(fn: (reaction: MessageReaction) => void): void {
    this._client.on("messageReactionRemoveEmoji", fn);
  }

  /**
   * Emitted once a **bot** removes a emoji from a message.
   * @returns Reaction removed.
   * @internal
   */
  public onceMessageReactionRemoveEmoji(): Promise<MessageReaction> {
    return this._once<MessageReaction>("messageReactionRemoveEmoji");
  }

  /**
   * Emitted when a channel is created.
   * @param fn function to receive the event.
   * @internal
   */
  public onChannelCreate(fn: (channel: Channel) => void): void {
    this._client.on("channelCreate", fn);
  }

  /**
   * Emitted once a channel is created.
   * @returns Created channel.
   * @internal
   */
  public onceChannelCreate(): Promise<Channel> {
    return this._once<Channel>("channelCreate");
  }

  /**
   * Emitted whenever a channel is deleted.
   * @param fn function to receive the deleted channel.
   * @internal
   */
  public onChannelDelete(fn: (deletedChannel: Channel) => void): void {
    this._client.on("channelDelete", fn);
  }

  /**
   * Emitted once a channel is deleted.
   * @returns Deleted channel.
   * @internal
   */
  public onceChannelDelete(): Promise<Channel> {
    return this._once<Channel>("channelDelete");
  }

  /**
   * Emitted whenever the pins of a channel are updated.
   * Due to the nature of the WebSocket event, not much information can be provided easily here -
   * you need to manually check the pins yourself.
   *
   * @param fn function to receive the channel and the time that it was updated.
   * @internal
   */
  public onChannelPinsUpdate(fn: (channel: Channel, updateTime: Date) => void): void {
    this._client.on("channelPinsUpdate", fn);
  }

  /**
   * Emitted once the pins of a channel are updated.
   * Due to the nature of the WebSocket event, not much information can be provided easily here -
   * you need to manually check the pins yourself.
   *
   * @returns `Channel` and `date` of it's change.
   * @internal
   */
  public async onceChannelPinsUpdate(): Promise<[Channel, Date]> {
    return this._once<[Channel, Date]>("channelPinsUpdate");
  }

  /**
   * Emitted whenever a channel is updated - e.g. name change, topic change.
   * @param fn function to receive the channel change
   * @internal
   */
  public onChannelUpdate(fn: (oldChannel: Channel, newChannel: Channel) => void) {
    this._client.on("channelUpdate", fn);
  }

  /**
   * Emitted once a channel is updated - e.g. name change, topic change.
   * @returns `Old channel` and `new value` of the channel.
   * @internal
   */
  public async onceChannelUpdate(): Promise<[Channel, Channel]> {
    return this._once<[Channel, Channel]>("channelUpdate");
  }

  /**
   * Emitted for general debugging information.
   * @param fn Function to handle debug info.
   * @internal
   */
  public onDebug(fn: (arg: string) => void) {
    this._client.on("debug", fn);
  }

  /**
   * Emitted once for general debugging information.
   * @internal
   */
  public async onceDebug(): Promise<string> {
    return await this._once<string>("debug");
  }

  /**
   * Emitted whenever a guild role is deleted.
   * @param fn function to receive the deleted role.
   * @internal
   */
  public onRoleDelete(fn: (role: Role) => void): void {
    this._client.on("roleDelete", fn);
  }

  /**
   * Emitted once a guild role is deleted.
   * If `roleIdentifier` is informed, returns the deleted role that
   * match with `roleIdentifier` value, if not, returns the first role deleted.
   *
   * Waits for a determined timeout, rejecting this async function if reachs
   * the timeout value.
   *
   * @param roleIdentifier Identifiers of the role.
   * @param timeout Time that this functions should wait for a response.
   * @returns Deleted role.
   * @internal
   */
  public onceRoleDelete(roleIdentifier?: RoleIdentifier, timeout?: number): Promise<Role> {
    return executePromiseWithTimeout((resolve) => {
      this.onRoleDelete((deletedRole) => {
        if (!roleIdentifier) {
          resolve(deletedRole);
        }

        if (this.roleMatchRoleData(roleIdentifier, deletedRole)) {
          resolve(deletedRole);
        }
      });
    }, timeout ?? runtime.timeOut);
  }

  /**
   * Emitted whenever the client's WebSocket disconnects and will no longer attempt to reconnect.
   * @param fn function to receive the event.
   * @internal
   */
  public onDisconnect(fn: (closeEvent: CloseEvent, code: number) => void): void {
    this._client.on("disconnect", fn);
  }

  /**
   * Emitted once the client's WebSocket disconnects and will no longer attempt to reconnect.
   * @returns Close event.
   * @internal
   */
  public onceDisconnect(): Promise<[CloseEvent, number]> {
    return this._once<[CloseEvent, number]>("disconnect");
  }

  /**
   * Emitted whenever a custom emoji is created in a guild.
   * @param fn function to receive the created emoji.
   * @internal
   */
  public onEmojiCreate(fn: (createdEmoji: GuildEmoji) => void): void {
    this._client.on("emojiCreate", fn);
  }

  /**
   * Emitted once a custom emoji is created in a guild.
   * @returns Created emoji.
   * @internal
   */
  public onceEmojiCreate(): Promise<GuildEmoji> {
    return this._once<GuildEmoji>("emojiCreate");
  }

  /**
   * Emitted whenever a custom guild emoji is deleted.
   * @param fn function to receive the deleted emoji.
   * @internal
   */
  public onEmojiDelete(fn: (emojiDeleted: GuildEmoji) => void): void {
    this._client.on("emojiDelete", fn);
  }

  /**
   * Emitted once a custom guild emoji is deleted.
   * @returns The emoji that was deleted.
   * @internal
   */
  public onceEmojiDelete(): Promise<GuildEmoji> {
    return this._once<GuildEmoji>("emojiDelete");
  }

  /**
   * Emitted whenever a custom guild emoji is updated.
   * @param fn function to receice the old and the new value of the emoji.
   * @internal
   */
  public onEmojiUpdate(fn: (oldEmoji: GuildEmoji, newEmoji: GuildEmoji) => void): void {
    this._client.on("emojiUpdate", fn);
  }

  /**
   * Emitted once a custom guild emoji is updated.
   * @returns `Old` and `new` role value.
   * @internal
   */
  public onceEmojiUpdate(): Promise<[GuildEmoji, GuildEmoji]> {
    return this._once<[GuildEmoji, GuildEmoji]>("emojiUpdate");
  }

  /**
   * Emitted whenever the client's WebSocket encounters a connection error.
   * @param fn function to receive the error.
   * @internal
   */
  public onError(fn: (error: Error) => void): void {
    this._client.on("error", fn);
  }

  /**
   * Emitted once the client's WebSocket encounters a connection error.
   * @return Found error.
   * @internal
   */
  public onceError(): Promise<Error> {
    return this._once<Error>("error");
  }

  /**
   * Emitted whenever a member is banned from a guild.
   * @param fn function to receive the guild where the user was removed from,
   * and the user itself.
   * @internal
   */
  public onGuildBan(fn: (guild: Guild, user: User) => void) {
    this._client.on("guildBanAdd", fn);
  }

  /**
   * Emitted once a member is banned from a guild.
   * @returns `guild` where the user was banned from, and the `user` itself
   * @internal
   */
  public onceGuildBan() {
    return this._once<[Guild, User]>("guildBanAdd");
  }

  /**
   * Emitted whenever a member is unbanned from a guild.
   * @param fn function to receive the guild that the user was removed
   * from ban, and the user.
   * @internal
   */
  public onGuildBanRemove(fn: (guild: Guild, user: User) => void) {
    this._client.on("guildBanRemove", fn);
  }

  /**
   * Emitted once a member is unbanned from a guild.
   * @returns the `guild` that the user was removed
   * from ban, and the `user`.
   * @internal
   */
  public onceGuildBanRemove() {
    return this._once<[Guild, User]>("guildBanRemove");
  }

  /**
   * Emitted whenever the client joins a guild.
   * @param fn function to receive the created guild.
   * @internal
   */
  public onGuildCreate(fn: (createdGuild: Guild) => void) {
    this._client.on("guildCreate", fn);
  }

  /**
   * Emitted once the client joins a guild.
   * @returns Created guild.
   * @internal
   */
  public onceGuildCreate() {
    return this._once<Guild>("guildCreate");
  }

  /**
   * Emitted whenever a guild is deleted/left.
   * @param fn function to receive the deleted guild.
   * @internal
   */
  public onGuildDelete(fn: (deletedGuild: Guild) => void) {
    this._client.on("guildDelete", fn);
  }

  /**
   * Emitted once a guild is deleted/left.
   * @returns Deleted guild.
   * @internal
   */
  public onceGuildDelete() {
    return this._once<Guild>("guildDelete");
  }

  /**
   * Emitted whenever a user joins a guild.
   * @param fn function to receive the member who was added to guild.
   * @internal
   */
  public onGuildMemberAdd(fn: (member: GuildMember) => void) {
    this._client.on("guildMemberAdd", fn);
  }

  /**
   * Emitted once a user joins a guild.
   * @returns Member who was added to guild.
   * @internal
   */
  public onceGuildMemberAdd() {
    return this._once<GuildMember>("guildMemberAdd");
  }

  /**
   * Emitted whenever a member becomes available in a large guild.
   * @param fn function to receive the guild who is available.
   * @internal
   */
  public onGuildMemberAvailable(fn: (member: GuildMember | PartialGuildMember) => void) {
    this._client.on("guildMemberAvailable", fn);
  }

  /**
   * Emitted once a member becomes available in a large guild.
   * @returns Guild who is available.
   * @internal
   */
  public onceGuildMemberAvailable() {
    return this._once<GuildMember | PartialGuildMember>("guildMemberAvailable");
  }

  /**
   * Emitted whenever a member leaves a guild, or is kicked.
   * @param fn function to receive the member of guild who kicked.
   * @internal
   */
  public onGuildMemberRemove(fn: (member: GuildMember | PartialGuildMember) => void) {
    this._client.on("guildMemberRemove", fn);
  }

  /**
   * Emitted once a member leaves a guild, or is kicked.
   * @returns Member of guild who kicked.
   * @internal
   */
  public onceGuildMemberRemove() {
    return this._once<GuildMember | PartialGuildMember>("guildMemberRemove");
  }

  /**
   * Emitted whenever a chunk of guild members is received (all members come from the same guild).
   * @param fn function to receive the collection of members that the guild received.
   * @internal
   */
  public onGuildMemberChunk(
    fn: (members: Collection<string, GuildMember>, guild: Guild, eventResume: EventResume) => void,
  ) {
    this._client.on("guildMembersChunk", fn);
  }

  /**
   * Emitted once a chunk of guild members is received (all members come from the same guild).
   * @returns The collection of members that the guild received.
   * @internal
   */
  public onceGuildMemberChunk() {
    return this._once<[Collection<string, GuildMember>, Guild, EventResume]>("guildMembersChunk");
  }

  /**
   * Emitted whenever a guild member starts/stops speaking.
   * @param fn function to receive the guild's member who is speaking.
   * @internal
   */
  public onGuildMemberSpeaking(
    fn: (member: GuildMember | PartialGuildMember, speaking: Readonly<Speaking>) => void,
  ): void {
    this._client.on("guildMemberSpeaking", fn);
  }

  /**
   * Emitted once a guild member starts/stops speaking.
   * @returns The guild's member who is speaking.
   * @internal
   */
  public onceGuildMemberSpeaking() {
    return this._once<[GuildMember | PartialGuildMember, Readonly<Speaking>]>(
      "guildMemberSpeaking",
    );
  }

  /**
   * Emitted whenever a guild member changes - i.e. new role, removed role, nickname.
   * @param fn function to receive the old and the new value of the guild member.
   * @internal
   */
  public onGuildMemberUpdate(
    fn: (oldMember: GuildMember | PartialGuildMember, newMember: GuildMember) => void,
  ) {
    this._client.on("guildMemberUpdate", fn);
  }

  /**
   * Emitted once a guild member changes - i.e. new role, removed role, nickname.
   * @returns Old and the new value of the guild member.
   * @internal
   */
  public onceGuildMemberUpdate() {
    return this._once<[GuildMember | PartialGuildMember, GuildMember]>("guildMemberUpdate");
  }

  /**
   * Emitted whenever a guild becomes unavailable, likely due to a server outage.
   * @param fn function to receive the unvailable guild.
   * @internal
   */
  public onGuildUnavailable(fn: (guild: Guild) => void) {
    this._client.on("guildUnavailable", fn);
  }

  /**
   * Emitted once a guild becomes unavailable, likely due to a server outage.
   * @returns Unvailable guild.
   * @internal
   */
  public onceGuildUnavailable() {
    return this._once<Guild>("guildUnavailable");
  }

  /**
   * Emitted whenever a guild is updated - e.g. name change.
   * @param fn function to receive the old and new value of the updated guild.
   * @internal
   */
  public onGuildUpdate(fn: (oldGuild: Guild, newGuild: Guild) => void) {
    this._client.on("guildUpdate", fn);
  }

  /**
   * Emitted once a guild is updated - e.g. name change.
   * @returns The old and new value of the updated guild.
   * @internal
   */
  public onceGuildUpdate() {
    return this._once<[Guild, Guild]>("guildUpdate");
  }

  /**
   * Emitted whenever a message is created.
   * @param fn function to receive the created message.
   * @internal
   */
  public onMessage(fn: (message: Message) => void) {
    this._client.on("message", fn);
  }

  /**
   * Emitted once a message is created.
   * @returns Created message.
   * @internal
   */
  public onceMessage(authorId?: string, timeout?: number) {
    return executePromiseWithTimeout<Message>((resolve) => {
      this.onMessage((message) => {
        if (!authorId) {
          resolve(message);
          return;
        }

        if (message.author.id === authorId) {
          resolve(message);
          return;
        }
      });
    }, timeout ?? runtime.timeOut);
  }

  /**
   * Emitted whenever a message is deleted.
   * @param fn function to receive the deleted message.
   * @internal
   */
  public onMessageDelete(fn: (deletedMessage: Message | PartialMessage) => void) {
    this._client.on("messageDelete", fn);
  }

  /**
   * Emitted once a message is deleted.
   * @returns Deleted message.
   * @internal
   */
  public onceMessageDelete() {
    return this._once<Message | PartialMessage>("messageDelete");
  }

  /**
   * Emitted whenever messages are deleted in bulk.
   * @param fn function to receive the collection of messages that
   * was deleted.
   * @internal
   */
  public onMessageDeleteBulk(
    fn: (deletedMessages: Collection<string, Message | PartialMessage>) => void,
  ) {
    this._client.on("messageDeleteBulk", fn);
  }

  /**
   * Emitted once messages are deleted in bulk.
   * @returns Collection of messages that was deleted.
   * @internal
   */
  public onceMessageDeleteBulk() {
    return this._once<Collection<string, Message | PartialMessage>>("messageDeleteBulk");
  }

  /**
   * Emitted whenever a reaction is added to a message.
   * @param fn function to receive the added reaction and it's author.
   * @internal
   */
  public onMessageReactionAdd(
    fn: (addedReaction: MessageReaction, author: User | PartialUser) => void,
  ) {
    this._client.on("messageReactionAdd", fn);
  }

  /**
   * Emitted once a reaction is added to a message.
   * @returns Added reaction and it's author.
   * @internal
   */
  public onceMessageReactionAdd() {
    return this._once<[MessageReaction, User | PartialUser]>("messageReactionAdd");
  }

  /**
   * @param filter
   * @returns A list of relation of reactions added and the author.
   * @internal
   */
  public onceMessageReactionsAdd(filter: SearchMessageReactionsOptions) {
    return this._onceMessageReactionUpdate(filter, "onMessageReactionAdd");
  }

  /**
   * @param filter
   * @returns A list of relation of reactions removed and the author.
   * @internal
   */
  public onceMessageReactionsRemove(filter: SearchMessageReactionsOptions) {
    return this._onceMessageReactionUpdate(filter, "onMessageReactionRemove");
  }

  private _onceMessageReactionUpdate(
    filter: SearchMessageReactionsOptions,
    event: "onMessageReactionAdd" | "onMessageReactionRemove",
  ) {
    const { emojis, messageIdentifier, authorId, timeout } = filter;

    const validator = new Validator<[MessageReaction, User | PartialUser]>();

    if (emojis) {
      validator.add((reaction) =>
        emojis.some((e) => e.id === reaction.emoji.id || e.name === reaction.emoji.name),
      );
    }

    if (messageIdentifier) {
      validator.add(
        ({ message }) =>
          message.id === messageIdentifier.id || message.content === messageIdentifier.content,
      );
    }

    if (authorId) {
      validator.add((_, author) => author.id === authorId);
    }

    const response: [MessageReaction, User | PartialUser][] = [];
    return executePromiseWithTimeout<[MessageReaction, User | PartialUser][]>(
      (resolve) => {
        this[event]((reaction, author) => {
          if (validator.isValid(reaction, author)) {
            response.push([reaction, author]);
          }

          if (!emojis && !authorId && !messageIdentifier) {
            resolve(response);
          }

          if (response.length === emojis?.length) {
            resolve(response);
          }
        });
      },
      timeout,
      response,
    );
  }

  /**
   * Emitted whenever a reaction is removed from a message.
   * @param fn function to receive the removed reaction and the author
   * of the remotion.
   * @internal
   */
  public onMessageReactionRemove(
    fn: (removedReaction: MessageReaction, author: User | PartialUser) => void,
  ) {
    this._client.on("messageReactionRemove", fn);
  }

  /**
   * Emitted once a reaction is removed from a message.
   * @returns Removed reaction and the author of the remotion.
   * @internal
   */
  public onceMessageReactionRemove() {
    return this._once<[MessageReaction, User | PartialUser]>("messageReactionRemove");
  }

  /**
   * Emitted whenever all reactions are removed from a message.
   * @param fn function to receive the message who had it's reactions
   * removed.
   * @internal
   */
  public onMessageReactionRemoveAll(fn: (message: Message | PartialMessage) => void) {
    this._client.on("messageReactionRemoveAll", fn);
  }

  /**
   * Emitted whenever all reactions are removed from a message.
   * @param fn Message who had it's reactions removed.
   * @internal
   */
  public onceMessageReactionRemoveAll() {
    return this._once<Message | PartialMessage>("messageReactionRemoveAll");
  }

  /**
   * Emitted whenever a message is updated - e.g. embed or content change.
   * @param fn function to receive the old and new value of a message.
   * @internal
   */
  public onMessageUpdate(
    fn: (oldMessage: Message | PartialMessage, newMessage: Message | PartialMessage) => void,
  ) {
    this._client.on("messageUpdate", fn);
  }

  /**
   * Emitted once a message is updated - e.g. embed or content change.
   * @returns `Old` and `new` value of a message.
   * @internal
   */
  public onceMessageUpdate() {
    return this._once<[Message | PartialMessage, Message | PartialMessage]>("messageUpdate");
  }

  /**
   * Emitted once a message with `id` x or `content` y, or it's embed message has changed.
   *
   * @param messageIdentifier Identifier of the message
   * @param timeout time to wait for change
   * @returns A message who had his content changed
   * @internal
   */
  public onceMessageContentOrEmbedChange(messageIdentifier?: MessageIdentifier, timeout?: number) {
    const validator = new Validator<[Message | PartialMessage, Message | PartialMessage]>();
    validator.add(
      (oldMessage, newMessage) =>
        oldMessage.content != newMessage.content ||
        this.messagesHasDifferentsEmbeds(oldMessage, newMessage),
    );

    if (messageIdentifier) {
      validator.add(
        (oldMessage) =>
          oldMessage.id === messageIdentifier.id ||
          oldMessage.content === messageIdentifier.content,
      );
    }

    return executePromiseWithTimeout<Message | PartialMessage>((resolve) => {
      this.onMessageUpdate((oldMessage, newMessage) => {
        if (validator.isValid(oldMessage, newMessage)) {
          resolve(newMessage);
        }
      });
    }, timeout ?? runtime.timeOut);
  }

  private messagesHasDifferentsEmbeds(
    oldMessage: Message | PartialMessage,
    newMessage: Message | PartialMessage,
  ) {
    return !deepEqual(oldMessage.embeds, newMessage.embeds);
  }

  /**
   * Emitted whenever a guild member's presence changes, or they change one of their details.
   * @param fn function to receive the old and new presence values.
   * @internal
   */
  public onPresenceUpdate(fn: (oldMember: Presence, newMember: Presence) => void) {
    this._client.on("presenceUpdate", fn);
  }

  /**
   * Emitted once a guild member's presence changes, or they change one of their details.
   * @returns Old and new presence values.
   * @internal
   */
  public oncePresenceUpdate() {
    return this._once<[Presence, Presence]>("presenceUpdate");
  }

  /**
   * Emitted whenever a role is created.
   * @param fn function to receive the created role.
   * @internal
   */
  public onRoleCreate(fn: (createdRole: Role) => void) {
    this._client.on("roleCreate", fn);
  }

  /**
   * Emitted once a role is created.
   * @returns Created role.
   * @internal
   */
  public onceRoleCreate() {
    return this._once<Role>("roleCreate");
  }

  /**
   * Emitted whenever a guild role is updated.
   * @param fn function to receive the old and the new role value.
   * @internal
   */
  public onRoleUpdate(fn: (oldRole: Role, newRole: Role) => void) {
    this._client.on("roleUpdate", fn);
  }

  /**
   * Emitted once a guild role is updated.
   * @returns `old` and the `new` role value.
   * @internal
   */
  public onceRoleUpdate() {
    return this._once<[Role, Role]>("roleUpdate");
  }

  /**
   * @internal
   */
  public onceRoleRenamed(roleIdentifier?: RoleIdentifier, timeout?: number) {
    return this._onRoleUpdateWithTimeout(
      (oldRole, newRole) => oldRole.name !== newRole.name,
      timeout,
      roleIdentifier,
    );
  }

  /**
   * @internal
   */
  public onceRolePositionUpdate(roleIdentifier?: RoleIdentifier, timeout?: number) {
    return this._onRoleUpdateWithTimeout(
      (oldRole, newRole) => oldRole.position !== newRole.position,
      timeout,
      roleIdentifier,
    );
  }

  /**
   * @internal
   */
  public onceRoleUpdateColor(roleIdentifier?: RoleIdentifier, timeout?: number) {
    return this._onRoleUpdateWithTimeout(
      (oldRole, newRole) => oldRole.color !== newRole.color,
      timeout,
      roleIdentifier,
    );
  }

  /**
   * @internal
   */
  public onceRoleHoistUpdate(roleIdentifier?: RoleIdentifier, timeout?: number) {
    return this._onRoleUpdateWithTimeout(
      (oldRole, newRole) => oldRole.hoist !== newRole.hoist,
      timeout,
      roleIdentifier,
    );
  }

  /**
   * @internal
   */
  public onceRoleMentionableUpdate(roleIdentifier?: RoleIdentifier, timeout?: number) {
    return this._onRoleUpdateWithTimeout(
      (oldRole, newRole) => oldRole.mentionable !== newRole.mentionable,
      timeout,
      roleIdentifier,
    );
  }

  /**
   * Waits for changes in permission of a specific role.
   * @param roleIdentifier `id` or `name` to identify the role.
   * @returns Specified role that had his permissions updated.
   * @internal
   */
  public onceRolePermissionUpdate(roleIdentifier: RoleIdentifier, timeout = DEFAULT_TEST_TIMEOUT) {
    return new Promise<Role>((resolve, reject) => {
      setTimeout(() => {
        reject(new TimeoutError());
      }, timeout);

      this.onRoleUpdate((oldRole, newRole) => {
        if (
          this.roleMatchRoleData(roleIdentifier, newRole) &&
          !this.rolesPermissionsMatch(oldRole, newRole)
        ) {
          resolve(newRole);
        }
      });
    });
  }

  private roleMatchRoleData(roleIdentifier: RoleIdentifier, role: Role) {
    return role.id === roleIdentifier?.id || role.name === roleIdentifier?.name;
  }

  private rolesPermissionsMatch(oldRole: Role, newRole: Role) {
    return oldRole.permissions.equals(newRole.permissions);
  }

  /**
   * Emitted whenever a user starts typing in a channel.
   * @param fn function to receive the channel (where) and the user (who)
   * is typing.
   * @internal
   */
  public onTypingStart(
    fn: (channel: Channel | PartialDMChannel, user: User | PartialUser) => void,
  ) {
    this._client.on("typingStart", fn);
  }

  /**
   * Emitted once a user starts typing in a channel.
   * @returns `Channel` (where) and the `user` (who) is typing.
   * @internal
   */
  public onceTypingStart() {
    return this._once<[Channel | PartialDMChannel, User | PartialUser]>("typingStart");
  }

  /**
   * Emitted whenever a user's details (e.g. username) are changed.
   * @param fn function to receive the old and the new value of the user.
   * @internal
   */
  public onUserUpdate(fn: (oldUser: User | PartialUser, newUser: User) => void) {
    this._client.on("userUpdate", fn);
  }

  /**
   * Emitted once a user's details (e.g. username) are changed.
   * @returns `Old` and the `new` value of the user.
   * @internal
   */
  public onceUserUpdate() {
    return this._once<[User | PartialUser, User]>("userUpdate");
  }

  /**
   * Emitted whenever a user changes voice state - e.g. joins/leaves a channel, mutes/unmutes.
   * @param fn function to receive the old and the new voiceState value.
   * @internal
   */
  public onVoiceStateUpdate(fn: (oldMember: VoiceState, newMember: VoiceState) => void) {
    this._client.on("voiceStateUpdate", fn);
  }

  /**
   * Emitted once a user changes voice state - e.g. joins/leaves a channel, mutes/unmutes.
   * @returns `Old` and the `new` voiceState value.
   * @internal
   */
  public onceVoiceStateUpdate() {
    return this._once<[VoiceState, VoiceState]>("voiceStateUpdate");
  }

  /**
   * Execute an event `once` returning it's response.
   * @param event event's name.
   * @internal
   */
  private async _once<T extends any>(event: keyof ClientEvents): Promise<T> {
    const response = await once(this._client, event);

    if (response.length === 1) {
      return response[0];
    }
    return (response as unknown) as T;
  }

  private _onRoleUpdateWithTimeout(
    comparable: (oldRole: Role, newRole: Role) => boolean,
    timeout?: number,
    roleIdentifier?: RoleIdentifier,
  ) {
    return executePromiseWithTimeout<Role>((resolve) => {
      this.onRoleUpdate((oldRole, newRole) => {
        if (!roleIdentifier && comparable(oldRole, newRole)) {
          resolve(newRole);
        }

        if (this.roleMatchRoleData(roleIdentifier, newRole) && comparable(oldRole, newRole)) {
          resolve(newRole);
        }
      });
    }, timeout ?? runtime.timeOut);
  }
}
