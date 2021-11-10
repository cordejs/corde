import {
  Channel,
  Client,
  ClientEvents,
  ClientPresenceStatusData,
  Collection,
  Guild,
  GuildChannel,
  GuildEmoji,
  GuildMember,
  Message,
  MessageReaction,
  PartialDMChannel,
  PartialGuildMember,
  PartialMessage,
  PartialUser,
  Presence,
  PresenceStatus,
  Role,
  Speaking,
  User,
  VoiceState,
} from "discord.js";
import { once } from "events";
import { DEFAULT_TEST_TIMEOUT } from "../consts";
import { deepEqual, executePromiseWithTimeout, isNullOrUndefined } from "../utils";
import { Validator } from "../utils";
import { getChannelName } from "../utils/getChannelName";

// https://gist.github.com/koad/316b265a91d933fd1b62dddfcc3ff584

/**
 * Encapsulation of Discord.js events.
 * @internal
 */
export class Events implements corde.IOnceEvents {
  protected readonly _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  /**
   * Emitted when the client becomes ready to start working.
   * @param fn Operation to be executed after client becomes ready.
   * @internal
   */
  onReady(fn: () => void): void {
    this._client.on("ready", fn);
  }

  onceReady(): Promise<void> {
    return this._once<void>("ready");
  }

  onMessageReactionRemoveEmoji(fn: (reaction: MessageReaction) => void): void {
    this._client.on("messageReactionRemoveEmoji", fn);
  }

  onceMessageReactionRemoveEmoji(
    options?: corde.IMessageReactionRemoveOptions,
  ): Promise<MessageReaction> {
    const validator = new Validator<[MessageReaction]>();

    if (options?.emojis) {
      validator.add(
        (message) =>
          options.emojis?.name === message.emoji.name || options.emojis?.id === message.emoji.id,
      );
    }

    if (options?.messageIdentifier) {
      validator.add(
        (messageReaction) =>
          messageReaction.message.id === options.messageIdentifier?.id ||
          messageReaction.message.content === options.messageIdentifier?.content,
      );
    }

    if (options?.channelId) {
      validator.add((messageReaction) => messageReaction.message.channel.id === options.channelId);
    }

    return executePromiseWithTimeout((resolve) => {
      this.onMessageReactionRemoveEmoji((message) => {
        if (validator.isValid(message)) {
          resolve(message);
        }
      });
    }, options?.timeout);
  }

  onChannelCreate(fn: (channel: Channel) => void): void {
    this._client.on("channelCreate", fn);
  }

  onceChannelCreate(options?: corde.ICreateChannelFilter): Promise<Channel> {
    const validator = new Validator<[Channel]>();

    if (options?.name) {
      validator.add(
        (channel) => channel.isText() && (channel as GuildChannel).name === options.name,
      );
    }

    if (!isNullOrUndefined(options?.isText)) {
      validator.add((channel) => channel.isText() === options?.isText);
    }

    return executePromiseWithTimeout((resolve) => {
      this.onChannelCreate((channel) => {
        if (validator.isValid(channel)) {
          resolve(channel);
        }
      });
    }, options?.timeout);
  }

  onChannelDelete(fn: (deletedChannel: Channel) => void): void {
    this._client.on("channelDelete", fn);
  }

  onceChannelDelete(options?: corde.IChannelDeleteOptions): Promise<Channel> {
    const validator = new Validator<[Channel]>();

    if (options?.channelIdentifier) {
      validator.add(
        (channel) =>
          channel.id === options.channelIdentifier?.id ||
          options.channelIdentifier?.name === getChannelName(channel),
      );
    }

    return executePromiseWithTimeout((resolve) => {
      this.onChannelDelete((channel) => {
        if (validator.isValid(channel)) {
          resolve(channel);
        }
      });
    }, options?.timeout);
  }

  onChannelPinsUpdate(fn: (channel: Channel, updateTime: Date) => void): void {
    this._client.on("channelPinsUpdate", fn);
  }

  onceChannelPinsUpdate(options?: corde.IChannelPinsUpdateOptions): Promise<[Channel, Date]> {
    const validator = new Validator<[Channel]>();

    if (options?.channelIdentifier) {
      validator.add(
        (channel) =>
          channel.id === options.channelIdentifier?.id ||
          options.channelIdentifier?.name === getChannelName(channel),
      );
    }

    return executePromiseWithTimeout((resolve) => {
      this.onChannelPinsUpdate((channel, updateDate) => {
        if (validator.isValid(channel)) {
          resolve([channel, updateDate]);
        }
      });
    }, options?.timeout);
  }

  onChannelUpdate(fn: (oldChannel: Channel, newChannel: Channel) => void) {
    this._client.on("channelUpdate", fn);
  }

  onceChannelUpdate(options?: corde.IChannelUpdateOptions): Promise<[Channel, Channel]> {
    const validator = new Validator<[Channel]>();

    if (options?.channelIdentifier) {
      validator.add(
        (channel) =>
          channel.id === options.channelIdentifier?.id ||
          options.channelIdentifier?.name === getChannelName(channel),
      );
    }

    return executePromiseWithTimeout((resolve) => {
      this.onChannelUpdate((oldChannel, newChannel) => {
        if (validator.isValid(newChannel)) {
          resolve([oldChannel, newChannel]);
        }
      });
    }, options?.timeout);
  }

  onDebug(fn: (arg: string) => void) {
    this._client.on("debug", fn);
  }

  onceDebug(): Promise<string> {
    return this._once<string>("debug");
  }

  onRoleDelete(fn: (role: Role) => void): void {
    this._client.on("roleDelete", fn);
  }

  onceRoleDelete(options?: corde.IRoleEventOptions): Promise<Role> {
    const validator = new Validator<[Role]>();

    if (options?.roleIdentifier) {
      validator.add((role) => this.roleMatchRoleData(options?.roleIdentifier, role));
    }

    if (options?.guildId) {
      validator.add((role) => role.guild.id === options?.guildId);
    }

    return executePromiseWithTimeout((resolve) => {
      this.onRoleDelete((deletedRole) => {
        if (validator.isValid(deletedRole)) {
          resolve(deletedRole);
        }
      });
    }, options?.timeout);
  }

  /**
   * Emitted whenever the client's WebSocket disconnects and will no longer attempt to reconnect.
   * @param fn function to receive the event.
   * @internal
   */
  onDisconnect(fn: (closeEvent: CloseEvent, code: number) => void): void {
    this._client.on("disconnect", fn);
  }

  /**
   * Emitted once the client's WebSocket disconnects and will no longer attempt to reconnect.
   * @returns Close event.
   * @internal
   */
  onceDisconnect(): Promise<[CloseEvent, number]> {
    return this._once<[CloseEvent, number]>("disconnect");
  }

  onEmojiCreate(fn: (createdEmoji: GuildEmoji) => void): void {
    this._client.on("emojiCreate", fn);
  }

  onceEmojiCreate(options?: corde.IEmojiCreateOptions): Promise<GuildEmoji> {
    const validator = new Validator<[GuildEmoji]>();

    if (options?.emojiIdentifier) {
      validator.add(
        (emoji) =>
          emoji.name === options.emojiIdentifier.name || emoji.id === options.emojiIdentifier.id,
      );
    }

    return executePromiseWithTimeout((resolve) => {
      this.onEmojiCreate((emoji) => {
        if (validator.isValid(emoji)) {
          resolve(emoji);
        }
      });
    }, options?.timeout);
  }

  onEmojiDelete(fn: (emojiDeleted: GuildEmoji) => void): void {
    this._client.on("emojiDelete", fn);
  }

  onceEmojiDelete(options?: corde.IEmojiDeleteOptions): Promise<GuildEmoji> {
    const validator = new Validator<[GuildEmoji]>();

    if (options?.emojiIdentifier) {
      validator.add(
        (emoji) =>
          emoji.name === options.emojiIdentifier.name || emoji.id === options.emojiIdentifier.id,
      );
    }

    return executePromiseWithTimeout((resolve) => {
      this.onEmojiDelete((emoji) => {
        if (validator.isValid(emoji)) {
          resolve(emoji);
        }
      });
    }, options?.timeout);
  }

  onEmojiUpdate(fn: (oldEmoji: GuildEmoji, newEmoji: GuildEmoji) => void): void {
    this._client.on("emojiUpdate", fn);
  }

  onceEmojiUpdate(options?: corde.IEmojiDeleteOptions): Promise<[GuildEmoji, GuildEmoji]> {
    const validator = new Validator<[GuildEmoji]>();

    if (options?.emojiIdentifier) {
      validator.add(
        (emoji) =>
          emoji.name === options.emojiIdentifier.name || emoji.id === options.emojiIdentifier.id,
      );
    }

    return executePromiseWithTimeout((resolve) => {
      this.onEmojiUpdate((old, newEmoji) => {
        if (validator.isValid(newEmoji)) {
          resolve([old, newEmoji]);
        }
      });
    }, options?.timeout);
  }

  onError(fn: (error: Error) => void): void {
    this._client.on("error", fn);
  }

  onceError(): Promise<Error> {
    return this._once<Error>("error");
  }

  onGuildBan(fn: (guild: Guild, user: User) => void) {
    this._client.on("guildBanAdd", fn);
  }

  onceGuildBan(options?: corde.IGuildBanOptions) {
    const validator = new Validator<[Guild, User]>();

    if (options?.guildIdentifier) {
      validator.add((guild) => this.getGuildIdentifierValidation(guild, options.guildIdentifier));
    }

    if (options?.guildIdentifier) {
      validator.add((guild) => this.getGuildIdentifierValidation(guild, options.guildIdentifier));
    }

    if (options?.userIdentifier) {
      validator.add((_, user) => this.getUserIdentifierValidation(user, options?.userIdentifier));
    }

    return executePromiseWithTimeout<[Guild, User]>((resolve) => {
      this.onGuildBan((guild, user) => {
        if (validator.isValid(guild, user)) {
          resolve([guild, user]);
        }
      });
    }, options?.timeout);
  }

  onGuildBanRemove(fn: (guild: Guild, user: User) => void) {
    this._client.on("guildBanRemove", fn);
  }

  onceGuildBanRemove(options?: corde.IGuildBanRemoveOptions) {
    const validator = new Validator<[Guild, User]>();

    if (options?.guildIdentifier) {
      validator.add((guild) => this.getGuildIdentifierValidation(guild, options.guildIdentifier));
    }

    if (options?.guildIdentifier) {
      validator.add((guild) => this.getGuildIdentifierValidation(guild, options.guildIdentifier));
    }

    if (options?.userIdentifier) {
      validator.add((_, user) => this.getUserIdentifierValidation(user, options?.userIdentifier));
    }

    return executePromiseWithTimeout<[Guild, User]>((resolve) => {
      this.onGuildBanRemove((guild, user) => {
        if (validator.isValid(guild, user)) {
          resolve([guild, user]);
        }
      });
    }, options?.timeout);
  }

  onGuildCreate(fn: (createdGuild: Guild) => void) {
    this._client.on("guildCreate", fn);
  }

  onceGuildCreate(options?: corde.IGuildCreateFilterOptions) {
    const validator = new Validator<[Guild]>();

    if (options?.name) {
      validator.add((guild) => guild.name === options.name);
    }

    return executePromiseWithTimeout<Guild>((resolve) => {
      this.onGuildCreate((guild) => {
        if (validator.isValid(guild)) {
          resolve(guild);
        }
      });
    }, options?.timeout);
  }

  onGuildDelete(fn: (deletedGuild: Guild) => void) {
    this._client.on("guildDelete", fn);
  }

  onceGuildDelete(options?: corde.IGuildDeleteOptions) {
    const validator = new Validator<[Guild]>();

    if (options?.name || options?.id) {
      validator.add((guild) =>
        this.getGuildIdentifierValidation(guild, { id: options.id, name: options.name }),
      );
    }

    return executePromiseWithTimeout<Guild>((resolve) => {
      this.onGuildDelete((guild) => {
        if (validator.isValid(guild)) {
          resolve(guild);
        }
      });
    }, options?.timeout);
  }

  onGuildMemberAdd(fn: (member: GuildMember) => void) {
    this._client.on("guildMemberAdd", fn);
  }

  onceGuildMemberAdd(options?: corde.IGuildMemberAddOptions) {
    const validator = new Validator<[GuildMember]>();
    if (options?.member) {
      validator.add((member) => this.getGuildMemberIdentifierValidation(member, options.member));
    }

    if (options?.guild) {
      validator.add((member) => this.getGuildIdentifierValidation(member.guild, options.guild));
    }

    if (options?.user) {
      validator.add((member) => this.getUserIdentifierValidation(member.user, options?.user));
    }

    return executePromiseWithTimeout<GuildMember>((resolve) => {
      this.onGuildMemberAdd((guildMember) => {
        if (validator.isValid(guildMember)) {
          resolve(guildMember);
        }
      });
    }, options?.timeout);
  }

  onGuildMemberAvailable(fn: (member: GuildMember | PartialGuildMember) => void) {
    this._client.on("guildMemberAvailable", fn);
  }

  onceGuildMemberAvailable(options?: corde.IGuildMemberAvailableOptions) {
    const validator = new Validator<[GuildMember | PartialGuildMember]>();

    if (options?.member) {
      validator.add((member) => this.getGuildMemberIdentifierValidation(member, options.member));
    }

    return executePromiseWithTimeout<GuildMember | PartialGuildMember>((resolve) => {
      this.onGuildMemberAvailable((guildMember) => {
        if (validator.isValid(guildMember)) {
          resolve(guildMember);
        }
      });
    }, options?.timeout);
  }

  onGuildMemberRemove(fn: (member: GuildMember | PartialGuildMember) => void) {
    this._client.on("guildMemberRemove", fn);
  }

  onceGuildMemberRemove(options?: corde.IGuildMemberRemoveOptions) {
    const validator = new Validator<[GuildMember | PartialGuildMember]>();

    if (options?.member) {
      validator.add((member) => this.getGuildMemberIdentifierValidation(member, options.member));
    }

    return executePromiseWithTimeout<GuildMember | PartialGuildMember>((resolve) => {
      this.onGuildMemberRemove((guildMember) => {
        if (validator.isValid(guildMember)) {
          resolve(guildMember);
        }
      });
    }, options?.timeout);
  }

  onGuildMemberChunk(
    fn: (
      members: Collection<string, GuildMember>,
      guild: Guild,
      eventResume: corde.IEventResume,
    ) => void,
  ) {
    this._client.on("guildMembersChunk", fn);
  }

  onceGuildMemberChunk(options?: corde.IGuildMemberChunkOptions) {
    const validator = new Validator<[Collection<string, GuildMember>, Guild]>();

    if (options?.guild) {
      validator.add((_, guild) => this.getGuildIdentifierValidation(guild, options.guild));
    }

    if (options?.guildMembers && options.guildMembers.length > 0) {
      validator.add((col) =>
        options.guildMembers.every((optionsMember) =>
          col.some((colMember) =>
            this.getGuildMemberIdentifierValidation(colMember, optionsMember),
          ),
        ),
      );
    }

    return executePromiseWithTimeout<[Collection<string, GuildMember>, Guild]>((resolve) => {
      this.onGuildMemberChunk((guildMembers, guild) => {
        if (validator.isValid(guildMembers, guild)) {
          resolve([guildMembers, guild]);
        }
      });
    }, options?.timeout);
  }

  onGuildMemberSpeaking(
    fn: (member: GuildMember | PartialGuildMember, speaking: Readonly<Speaking>) => void,
  ): void {
    this._client.on("guildMemberSpeaking", fn);
  }

  onceGuildMemberSpeaking(options?: corde.IGuildMemberSpeakingOptions) {
    const validator = new Validator<[GuildMember | PartialGuildMember]>();

    if (options?.id || options?.nickname) {
      validator.add((member) =>
        this.getGuildMemberIdentifierValidation(member, {
          id: options.id,
          nickname: options.nickname,
        }),
      );
    }

    return executePromiseWithTimeout<GuildMember | PartialGuildMember>((resolve) => {
      this.onGuildMemberSpeaking((guildMember) => {
        if (validator.isValid(guildMember)) {
          resolve(guildMember);
        }
      });
    }, options?.timeout);
  }

  onGuildMemberUpdate(
    fn: (oldMember: GuildMember | PartialGuildMember, newMember: GuildMember) => void,
  ) {
    this._client.on("guildMemberUpdate", fn);
  }

  onceGuildMemberUpdate(options?: corde.IGuildMemberUpdateOptions) {
    const validator = new Validator<[GuildMember | PartialGuildMember, GuildMember]>();

    if (options?.id || options?.nickname) {
      validator.add((old) =>
        this.getGuildMemberIdentifierValidation(old, {
          id: options.id,
          nickname: options.nickname,
        }),
      );
    }

    return executePromiseWithTimeout<[GuildMember | PartialGuildMember, GuildMember]>((resolve) => {
      this.onGuildMemberUpdate((oldGuildMember, newGuildMember) => {
        if (validator.isValid(oldGuildMember, newGuildMember)) {
          resolve([oldGuildMember, newGuildMember]);
        }
      });
    }, options?.timeout);
  }

  onGuildUnavailable(fn: (guild: Guild) => void) {
    this._client.on("guildUnavailable", fn);
  }

  onceGuildUnavailable(options?: corde.IGuildUnvailableOptions) {
    const validator = new Validator<[Guild]>();

    if (options?.id || options?.name) {
      validator.add((guild) =>
        this.getGuildIdentifierValidation(guild, { id: options.id, name: options.name }),
      );
    }
    return executePromiseWithTimeout<Guild>((resolve) => {
      this.onGuildUnavailable((guild) => {
        if (validator.isValid(guild)) {
          resolve(guild);
        }
      });
    }, options?.timeout);
  }

  onGuildUpdate(fn: (oldGuild: Guild, newGuild: Guild) => void) {
    this._client.on("guildUpdate", fn);
  }

  onceGuildUpdate(options?: corde.IGuildUnvailableOptions) {
    const validator = new Validator<[Guild, Guild]>();

    if (options?.id || options?.name) {
      validator.add((guild) =>
        this.getGuildIdentifierValidation(guild, { id: options.id, name: options.name }),
      );
    }
    return executePromiseWithTimeout<[Guild, Guild]>((resolve) => {
      this.onGuildUpdate((oldGuild, newGuild) => {
        if (validator.isValid(oldGuild, newGuild)) {
          resolve([oldGuild, newGuild]);
        }
      });
    }, options?.timeout);
  }

  onMessage(fn: (message: Message) => void) {
    this._client.on("message", fn);
  }

  // TODO: Refact once message to accept message content

  onceMessage(options?: corde.IMessageContentEvent) {
    const validator = new Validator<[Message]>();

    if (options?.authorId) {
      validator.add((mgs) => mgs.author.id === options?.authorId);
    }

    if (options?.channelId) {
      validator.add((mgs) => mgs.channel.id === options?.channelId);
    }

    return executePromiseWithTimeout<Message>((resolve) => {
      this.onMessage((message) => {
        if (validator.isValid(message)) {
          resolve(message);
        }
      });
    }, options?.timeout);
  }

  onMessageDelete(fn: (deletedMessage: Message | PartialMessage) => void) {
    this._client.on("messageDelete", fn);
  }

  onceMessageDelete(options?: corde.IMessageDeleteOptions) {
    const validator = new Validator<[Message | PartialMessage]>();

    if (options?.authorId) {
      validator.add((mgs) => mgs.author?.id === options?.authorId);
    }

    if (options?.channelId) {
      validator.add((mgs) => mgs.channel.id === options?.channelId);
    }

    return executePromiseWithTimeout<Message | PartialMessage>((resolve) => {
      this.onMessageDelete((message) => {
        if (validator.isValid(message)) {
          resolve(message);
        }
      });
    }, options?.timeout);
  }

  onMessageDeleteBulk(fn: (deletedMessages: Collection<string, Message | PartialMessage>) => void) {
    this._client.on("messageDeleteBulk", fn);
  }

  onceMessageDeleteBulk(options?: corde.IMessageDeleteBulkOptions) {
    const validator = new Validator<[Collection<string, Message | PartialMessage>]>();

    const _options = this.getIMessageDeleteOptionsArray(options);

    for (const option of _options) {
      if (option?.authorId) {
        validator.add((mgs) => mgs.some((m) => m.author?.id === option?.authorId));
      }

      if (option?.channelId) {
        validator.add((mgs) => mgs.some((m) => m.channel.id === option?.channelId));
      }

      if (option?.messageIdentifier) {
        validator.add((mgs) =>
          mgs.some((m) => this.getMessageIdentifierValidation(m, option.messageIdentifier)),
        );
      }
    }

    return executePromiseWithTimeout<Collection<string, Message | PartialMessage>>((resolve) => {
      this.onMessageDeleteBulk((messages) => {
        if (validator.isValid(messages)) {
          resolve(messages);
        }
      });
    }, options?.timeout);
  }

  private getIMessageDeleteOptionsArray(deleteOptions?: corde.IMessageDeleteBulkOptions) {
    if (!deleteOptions?.options) {
      return [];
    }

    if (Array.isArray(deleteOptions.options)) {
      return deleteOptions.options;
    }

    return [deleteOptions.options];
  }

  onMessageReactionAdd(fn: (addedReaction: MessageReaction, author: User | PartialUser) => void) {
    this._client.on("messageReactionAdd", fn);
  }

  onceMessageReactionAdd(options?: corde.IMessageReactionAddOptions) {
    const validator = new Validator<[MessageReaction, User | PartialUser]>();

    if (options?.authorId) {
      validator.add((_, user) => user.id === options.authorId);
    }

    if (options?.messageIdentifier) {
      validator.add((reaction) =>
        this.getMessageIdentifierValidation(reaction.message, options.messageIdentifier),
      );
    }

    if (options?.emojis) {
      validator.add(
        (reaction) =>
          options.emojis?.id === reaction.emoji.id || options.emojis?.name === reaction.emoji.name,
      );
    }

    if (options?.channelId) {
      validator.add((reaction) => reaction.message.channel.id === options?.channelId);
    }

    return executePromiseWithTimeout<[MessageReaction, User | PartialUser]>((resolve) => {
      this.onMessageReactionAdd((reaction, user) => {
        if (validator.isValid(reaction, user)) {
          resolve([reaction, user]);
        }
      });
    }, options?.timeout);
  }

  onceMessageReactionsAdd(filter?: corde.ISearchMessageReactionsOptions) {
    return this._onceMessageReactionUpdate("onMessageReactionAdd", filter);
  }

  onceMessageReactionsRemove(filter?: corde.ISearchMessageReactionsOptions) {
    return this._onceMessageReactionUpdate("onMessageReactionRemoveEmoji", filter);
  }

  private _onceMessageReactionUpdate(
    event: "onMessageReactionAdd" | "onMessageReactionRemoveEmoji",
    filter?: corde.ISearchMessageReactionsOptions,
  ) {
    const { emojis, messageIdentifier, authorId, timeout, channelId } = filter ?? {};

    const validator = new Validator<[MessageReaction, User | PartialUser | void]>();

    if (emojis) {
      validator.add((reaction) =>
        emojis.some((e) => e.id === reaction.emoji.id || e.name === reaction.emoji.name),
      );
    }

    if (channelId) {
      validator.add((reaction) => reaction.message.channel.id === channelId);
    }

    if (messageIdentifier) {
      validator.add(
        ({ message }) =>
          message.id === messageIdentifier.id || message.content === messageIdentifier.content,
      );
    }

    if (authorId) {
      validator.add((_, author) => !author || author.id === authorId);
    }

    const response: [MessageReaction, User | PartialUser | void][] = [];
    return executePromiseWithTimeout<[MessageReaction, User | PartialUser | void][]>(
      (resolve) => {
        this[event]((reaction: MessageReaction, author: User | PartialUser | void) => {
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
   * Emitted whenever a **user** remove a reaction from a message
   * @param fn function to receive the removed reaction and the author
   * of the remotion.
   * @internal
   */
  onMessageReactionRemove(
    fn: (removedReaction: MessageReaction, author: User | PartialUser) => void,
  ) {
    this._client.on("messageReactionRemove", fn);
  }

  onceMessageReactionRemove(options?: corde.IMessageReactionRemoveOptions) {
    const validator = new Validator<[MessageReaction, User | PartialUser]>();

    if (options?.authorId) {
      validator.add((_, user) => user.id === options.authorId);
    }

    if (options?.messageIdentifier) {
      validator.add((reaction) =>
        this.getMessageIdentifierValidation(reaction.message, options.messageIdentifier),
      );
    }

    if (options?.emojis) {
      validator.add(
        (reaction) =>
          options.emojis?.id === reaction.emoji.id || options.emojis?.name === reaction.emoji.name,
      );
    }

    if (options?.channelId) {
      validator.add((reaction) => reaction.message.channel.id === options?.channelId);
    }

    return executePromiseWithTimeout<[MessageReaction, User | PartialUser]>((resolve) => {
      this.onMessageReactionRemove((reaction, user) => {
        if (validator.isValid(reaction, user)) {
          resolve([reaction, user]);
        }
      });
    }, options?.timeout);
  }

  /**
   * Emitted whenever all reactions are removed from a message.
   * @param fn function to receive the message who had it's reactions
   * removed.
   * @internal
   */
  onMessageReactionRemoveAll(fn: (message: Message | PartialMessage) => void) {
    this._client.on("messageReactionRemoveAll", fn);
  }

  onceMessageReactionRemoveAll(options?: corde.IMessageReactionRemoveAllOptions) {
    const validator = new Validator<[Message | PartialMessage]>();

    if (options?.id || options?.content) {
      validator.add((message) =>
        this.getMessageIdentifierValidation(message, { content: options.content, id: options.id }),
      );
    }

    return executePromiseWithTimeout<Message | PartialMessage>((resolve) => {
      this.onMessageReactionRemoveAll((message) => {
        if (validator.isValid(message)) {
          resolve(message);
        }
      });
    }, options?.timeout);
  }

  /**
   * Emitted whenever a message is updated - e.g. embed or content change.
   * @param fn function to receive the old and new value of a message.
   * @internal
   */
  onMessageUpdate(
    fn: (oldMessage: Message | PartialMessage, newMessage: Message | PartialMessage) => void,
  ) {
    this._client.on("messageUpdate", fn);
  }

  onceMessageUpdate(options?: corde.IMessageUpdateOptions) {
    const validator = new Validator<[Message | PartialMessage, Message | PartialMessage]>();

    if (options?.id || options?.content) {
      validator.add((_, newMessage) =>
        this.getMessageIdentifierValidation(newMessage, {
          content: options.content,
          id: options.id,
        }),
      );
    }

    return executePromiseWithTimeout<[Message | PartialMessage, Message | PartialMessage]>(
      (resolve) => {
        this.onMessageUpdate((oldMessage, newMessage) => {
          if (validator.isValid(oldMessage, newMessage)) {
            resolve([oldMessage, newMessage]);
          }
        });
      },
      options?.timeout,
    );
  }

  onceMessagePinned(options?: corde.IMessageEventOptions) {
    return this._onceMessageSetPinneble(
      (oldMessage, newMessage) => !(oldMessage.pinned as boolean) && (newMessage.pinned as boolean),
      options,
    );
  }

  onceMessageUnPinned(options?: corde.IMessageEventOptions) {
    return this._onceMessageSetPinneble(
      (oldMessage, newMessage) => (oldMessage.pinned as boolean) && !(newMessage.pinned as boolean),
      options,
    );
  }

  private _onceMessageSetPinneble(
    validation: (
      oldMessage: Message | PartialMessage,
      newMessage: Message | PartialMessage,
    ) => boolean,
    options?: corde.IMessageEventOptions,
  ) {
    const validator = new Validator<[Message | PartialMessage, Message | PartialMessage]>();
    validator.add(validation);

    if (options?.messageIdentifier) {
      validator.add(
        (oldMessage) =>
          oldMessage.id === options?.messageIdentifier?.id ||
          oldMessage.content === options?.messageIdentifier?.content,
      );
    }

    if (options?.channelId) {
      validator.add((message) => message.channel.id === options?.channelId);
    }

    return executePromiseWithTimeout<Message | PartialMessage>((resolve) => {
      this.onMessageUpdate((oldMessage, newMessage) => {
        if (validator.isValid(oldMessage, newMessage)) {
          resolve(newMessage);
        }
      });
    }, options?.timeout);
  }

  onceMessageContentOrEmbedChange(options?: corde.IMessageEventOptions) {
    const validator = new Validator<[Message | PartialMessage, Message | PartialMessage]>();
    validator.add(
      (oldMessage, newMessage) =>
        oldMessage.content != newMessage.content ||
        this.messagesHasDifferentsEmbeds(oldMessage, newMessage),
    );

    if (options?.messageIdentifier) {
      validator.add(
        (oldMessage) =>
          oldMessage.id === options?.messageIdentifier?.id ||
          oldMessage.content === options?.messageIdentifier?.content,
      );
    }

    if (options?.channelId) {
      validator.add((message) => message.channel.id === options?.channelId);
    }

    return executePromiseWithTimeout<Message>((resolve) => {
      this.onMessageUpdate(async (oldMessage, newMessage) => {
        if (validator.isValid(oldMessage, newMessage)) {
          const fullMessage = newMessage.partial ? await newMessage.fetch() : newMessage;
          resolve(fullMessage);
        }
      });
    }, options?.timeout);
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
  onPresenceUpdate(fn: (oldMember: Presence | undefined, newMember: Presence) => void) {
    this._client.on("presenceUpdate", fn);
  }

  oncePresenceUpdate(options?: {
    timeout?: number;
    user?: corde.IUserIdentifier;
    presenceStatus?: PresenceStatus;
    guild?: corde.IGuildIdentifier;
    clientePresence?: ClientPresenceStatusData;
  }) {
    const validator = new Validator<[Presence]>();

    if (options?.guild) {
      validator.add(({ guild }) => this.getGuildIdentifierValidation(guild, options.guild));
    }

    if (options?.clientePresence?.desktop) {
      validator.add(
        ({ clientStatus }) => clientStatus?.desktop === options.clientePresence?.desktop,
      );
    }

    if (options?.clientePresence?.mobile) {
      validator.add(({ clientStatus }) => clientStatus?.mobile === options.clientePresence?.mobile);
    }

    if (options?.clientePresence?.web) {
      validator.add(({ clientStatus }) => clientStatus?.web === options.clientePresence?.web);
    }

    if (options?.presenceStatus) {
      validator.add(({ status }) => status === options.presenceStatus);
    }

    if (options?.user) {
      validator.add(({ user }) => this.getUserIdentifierValidation(user, options.user));
    }

    return executePromiseWithTimeout<Presence>((resolve) => {
      this.onPresenceUpdate((_, newPresence) => {
        if (validator.isValid(newPresence)) {
          resolve(newPresence);
        }
      });
    }, options?.timeout);
  }

  /**
   * Emitted whenever a role is created.
   * @param fn function to receive the created role.
   * @internal
   */
  onRoleCreate(fn: (createdRole: Role) => void) {
    this._client.on("roleCreate", fn);
  }

  onceRoleCreate(options?: corde.IRoleCreateEventOptions) {
    const validator = new Validator<[Role]>();

    if (options?.name) {
      validator.add((r) => r.name === options.name);
    }

    if (options?.guild) {
      validator.add(({ guild }) => this.getGuildIdentifierValidation(guild, options.guild));
    }

    return executePromiseWithTimeout<Role>((resolve) => {
      this.onRoleCreate((role) => {
        if (validator.isValid(role)) {
          resolve(role);
        }
      });
    }, options?.timeout);
  }

  /**
   * Emitted whenever a guild role is updated.
   * @param fn function to receive the old and the new role value.
   * @internal
   */
  onRoleUpdate(fn: (oldRole: Role, newRole: Role) => void) {
    this._client.on("roleUpdate", fn);
  }

  onceRoleUpdate(options?: corde.IRoleUpdateEventOptions) {
    const validator = new Validator<[Role, Role]>();

    if (options?.id || options?.name) {
      validator.add((role) =>
        this.getRoleIdentifierValidation(role, { id: options.id, name: options.name }),
      );
    }

    return executePromiseWithTimeout<[Role, Role]>((resolve) => {
      this.onRoleUpdate((newRole, oldRole) => {
        if (validator.isValid(newRole, oldRole)) {
          resolve([newRole, oldRole]);
        }
      });
    }, options?.timeout);
  }

  onceRoleRenamed(options?: corde.IRoleRenamedEventOptions) {
    return this._onRoleUpdateWithTimeout(
      (oldRole, newRole) => oldRole.name !== newRole.name,
      options,
    );
  }

  onceRolePositionUpdate(options?: corde.IRoleEventOptions) {
    return this._onRoleUpdateWithTimeout(
      (oldRole, newRole) => oldRole.rawPosition !== newRole.rawPosition,
      options,
    );
  }

  onceRoleUpdateColor(options?: corde.IRoleEventOptions) {
    return this._onRoleUpdateWithTimeout(
      (oldRole, newRole) => oldRole.color !== newRole.color,
      options,
    );
  }

  onceRoleHoistUpdate(options?: corde.IRoleEventOptions) {
    return this._onRoleUpdateWithTimeout(
      (oldRole, newRole) => oldRole.hoist !== newRole.hoist,
      options,
    );
  }

  onceRoleMentionableUpdate(options?: corde.IRoleEventOptions) {
    return this._onRoleUpdateWithTimeout(
      (oldRole, newRole) => oldRole.mentionable !== newRole.mentionable,
      options,
    );
  }

  onceRolePermissionUpdate(
    roleIdentifier: corde.IRoleIdentifier,
    timeout = DEFAULT_TEST_TIMEOUT,
    guildId?: string,
  ) {
    const validator = new Validator<[Role, Role]>();

    validator.add((_, newRole) => this.roleMatchRoleData(roleIdentifier, newRole));

    if (guildId) {
      validator.add((newRole) => newRole.guild.id === guildId);
    }

    return executePromiseWithTimeout<Role>((resolve) => {
      this.onRoleUpdate((oldRole, newRole) => {
        if (validator.isValid(oldRole, newRole)) {
          resolve(newRole);
        }
      });
    }, timeout);
  }

  private roleMatchRoleData(roleIdentifier: corde.IRoleIdentifier | undefined, role: Role) {
    return role.id === roleIdentifier?.id || role.name === roleIdentifier?.name;
  }

  /**
   * Emitted whenever a user starts typing in a channel.
   * @param fn function to receive the channel (where) and the user (who)
   * is typing.
   * @internal
   */
  onTypingStart(fn: (channel: Channel | PartialDMChannel, user: User | PartialUser) => void) {
    this._client.on("typingStart", fn);
  }

  /**
   * Emitted once a user starts typing in a channel.
   * @returns `Channel` (where) and the `user` (who) is typing.
   * @internal
   */
  onceTypingStart() {
    return this._once<[Channel | PartialDMChannel, User | PartialUser]>("typingStart");
  }

  onUserUpdate(fn: (oldUser: User | PartialUser, newUser: User) => void) {
    this._client.on("userUpdate", fn);
  }

  onceUserUpdate() {
    return this._once<[User | PartialUser, User]>("userUpdate");
  }

  /**
   * Emitted whenever a user changes voice state - e.g. joins/leaves a channel, mutes/unmutes.
   * @param fn function to receive the old and the new voiceState value.
   * @internal
   */
  onVoiceStateUpdate(fn: (oldMember: VoiceState, newMember: VoiceState) => void) {
    this._client.on("voiceStateUpdate", fn);
  }

  onceVoiceStateUpdate() {
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
    return response as unknown as T;
  }

  private _onRoleUpdateWithTimeout(
    comparable: (oldRole: Role, newRole: Role) => boolean,
    options?: corde.IRoleEventOptions,
  ) {
    const validator = new Validator<[Role, Role]>();

    validator.add((oldRole, newRole) => comparable(oldRole, newRole));

    if (options?.roleIdentifier) {
      validator.add((_, newRole) => this.roleMatchRoleData(options?.roleIdentifier, newRole));
    }

    if (options?.guildId) {
      validator.add((role) => role.guild.id === options?.guildId);
    }

    return executePromiseWithTimeout<Role>((resolve) => {
      this.onRoleUpdate((oldRole, newRole) => {
        if (validator.isValid(oldRole, newRole)) {
          resolve(newRole);
        }
      });
    }, options?.timeout);
  }

  private getRoleIdentifierValidation(role?: Role, identifier?: corde.IRoleIdentifier) {
    return role?.name === identifier?.name || role?.id === identifier?.id;
  }

  private getGuildIdentifierValidation(guild?: Guild | null, identifier?: corde.IGuildIdentifier) {
    return guild?.name === identifier?.name || guild?.id === identifier?.id;
  }

  private getMessageIdentifierValidation(
    message: Message | PartialMessage,
    identifier?: corde.IMessageIdentifier,
  ) {
    return message.id === identifier?.id || message.content === identifier?.content;
  }

  private getGuildMemberIdentifierValidation(
    member: GuildMember | PartialGuildMember,
    identifier?: corde.IGuildMemberIdentifier,
  ) {
    return member.nickname === identifier?.nickname || member.id === identifier?.id;
  }

  private getUserIdentifierValidation(
    user?: User | PartialUser | null,
    identifier?: corde.IUserIdentifier,
  ) {
    return user?.id === identifier?.id || user?.username === identifier?.name;
  }
}
