import {
  APIRequest,
  ApplicationCommand,
  CacheType,
  Channel,
  Client,
  ClientEvents,
  Collection,
  DMChannel,
  Guild,
  GuildBan,
  GuildChannel,
  GuildEmoji,
  GuildMember,
  GuildScheduledEvent,
  Interaction,
  InvalidRequestWarningData,
  Invite,
  Message,
  NewsChannel,
  PartialDMChannel,
  PartialGuildMember,
  PartialMessage,
  PartialUser,
  Presence,
  RateLimitData,
  Role,
  StageInstance,
  Sticker,
  TextBasedChannel,
  TextChannel,
  ThreadChannel,
  ThreadMember,
  Typing,
  CloseEvent,
  User,
  VoiceState,
  MessageReaction,
} from "discord.js";
import { once } from "events";
import { ObjectLike, Optional } from "../types";
import { deepEqual } from "../utils/deepEqual";
import { executePromiseWithTimeout } from "../utils/executePromiseWithTimeout";
import { isNullOrUndefined } from "../utils/isNullOrUndefined";
import { Validator } from "../utils/validator";

// https://gist.github.com/koad/316b265a91d933fd1b62dddfcc3ff584

type AddPrefix<TPrefix extends string, TKey> = TKey extends string
  ? `${TPrefix}${Capitalize<TKey>}`
  : never;

type RemovePrefix<
  TPrefix extends string,
  TPrefixedKey extends string,
> = TPrefixedKey extends AddPrefix<TPrefix, infer TKey> ? TKey : "";

type PrefixedValue<
  TObject extends ObjectLike,
  TPrefixedKey extends string,
  TPrefix extends string,
> = TObject extends { [K in RemovePrefix<TPrefix, TPrefixedKey>]: infer TValue } ? TValue : never;

type ClientEventsFn = {
  [K in AddPrefix<"on", keyof ClientEvents>]: (
    ...args: PrefixedValue<ClientEvents, "on", K>
  ) => void;
};

/**
 * Encapsulation of Discord.js events.
 * @internal
 */
export class Events implements corde.IOnceEvents, ClientEventsFn {
  protected readonly _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  /**
   * Emitted when the client becomes ready to start working.
   * @param fn Operation to be executed after client becomes ready.
   * @internal
   */
  onReady(fn: () => void) {
    return this._client.on("ready", fn);
  }

  /**
   * @internal
   */
  onGuildMembersChunk(
    fn: (
      members: Collection<string, GuildMember>,
      guild: Guild,
      data: {
        count: number;
        index: number;
        nonce: string | undefined;
      },
    ) => void,
  ) {
    this._client.on("guildMembersChunk", fn);
  }

  /**
   * @internal
   */
  onShardDisconnect(fn: (closeEvent: CloseEvent, shardId: number) => void) {
    this._client.on("shardDisconnect", fn);
  }

  /**
   * @internal
   */
  onInteraction(fn: (interaction: Interaction<CacheType>) => void) {
    this._client.on("interaction", fn);
  }

  /**
   * @internal
   */
  onInteractionCreate(fn: (interaction: Interaction<CacheType>) => void) {
    this._client.on("interactionCreate", fn);
  }

  /**
   * @internal
   */
  onApiRequest(fn: (request: APIRequest) => void) {
    this._client.on("apiRequest", fn);
  }

  /**
   * @internal
   */
  onApiResponse(fn: (response: APIRequest) => void) {
    this._client.on("apiResponse", fn);
  }

  /**
   * @internal
   */
  onGuildBanAdd(fn: (ban: GuildBan) => void) {
    this._client.on("onGuildBanAdd", fn);
  }

  /**
   * @internal
   */
  onApplicationCommandCreate(fn: (command: ApplicationCommand<ObjectLike>) => void) {
    this._client.on("applicationCommandCreate", fn);
  }

  /**
   * @internal
   */
  onApplicationCommandDelete(fn: (command: ApplicationCommand<ObjectLike>) => void) {
    this._client.on("applicationCommandDelete", fn);
  }

  /**
   * @internal
   */
  onApplicationCommandUpdate(
    fn: (
      oldCommand: ApplicationCommand<ObjectLike> | null,
      newCommand: ApplicationCommand<ObjectLike>,
    ) => void,
  ) {
    this._client.on("applicationCommandUpdate", fn);
  }

  /**
   * @internal
   */
  onCacheSweep(fn: (message: string) => void) {
    this._client.on("cacheSweep", fn);
  }

  /**
   * @internal
   */
  onGuildScheduledEventCreate(
    fn: (guildScheduledEvent: GuildScheduledEvent<corde.GuildScheduleEventType>) => void,
  ) {
    this._client.on("guildScheduledEventCreate", fn);
  }

  /**
   * @internal
   */
  onGuildScheduledEventDelete(
    fn: (guildScheduledEvent: GuildScheduledEvent<corde.GuildScheduleEventType>) => void,
  ) {
    this._client.on("guildScheduledEventDelete", fn);
  }

  /**
   * @internal
   */
  onGuildScheduledEvent(
    fn: (guildScheduledEvent: GuildScheduledEvent<corde.GuildScheduleEventType>) => void,
  ) {
    this._client.on("guildScheduledEvent", fn);
  }

  /**
   * @internal
   */
  onGuildScheduledEventUpdate(
    fn: (guildScheduledEvent: GuildScheduledEvent<corde.GuildScheduleEventType>) => void,
  ) {
    this._client.on("guildScheduledEventUpdate", fn);
  }

  /**
   * @internal
   */
  onGuildScheduledEventUserAdd(
    fn: (guildScheduledEvent: GuildScheduledEvent<corde.GuildScheduleEventType>) => void,
  ) {
    this._client.on("guildScheduledEventUserAdd", fn);
  }

  /**
   * @internal
   */
  onGuildScheduledEventUserRemove(
    fn: (guildScheduledEvent: GuildScheduledEvent<corde.GuildScheduleEventType>) => void,
  ) {
    this._client.on("guildScheduledEventUserRemove", fn);
  }

  /**
   * @internal
   */
  onGuildIntegrationsUpdate(fn: (guild: Guild) => void) {
    this._client.on("guildIntegrationsUpdate", fn);
  }

  /**
   * @internal
   */
  onRateLimit(fn: (rateLimitData: RateLimitData) => void) {
    this._client.on("rateLimit", fn);
  }

  /**
   * @internal
   */
  onInviteCreate(fn: (invite: Invite) => void) {
    this._client.on("inviteCreate", fn);
  }

  /**
   * @internal
   */
  onInviteDelete(fn: (invite: Invite) => void) {
    this._client.on("inviteDelete", fn);
  }

  /**
   * @internal
   */
  onInvalidated(fn: () => void) {
    this._client.on("invalidated", fn);
  }

  /**
   * @internal
   */
  onInvalidRequestWarning(fn: (invalidRequestWarningData: InvalidRequestWarningData) => void) {
    this._client.on("invalidRequestWarning", fn);
  }

  /**
   * @internal
   */
  onWarn(fn: (message: string) => void) {
    this._client.on("warn", fn);
  }

  /**
   * @internal
   */
  onMessageCreate(fn: (message: Message<boolean>) => void) {
    this._client.on("messageCreate", fn);
  }

  onceMessageCreate(options?: corde.IMessageContentEvent) {
    const validator = new Validator<[Message]>();

    if (options?.author) {
      validator.add(
        (mgs) =>
          mgs.author.username === options?.author?.username ||
          mgs.author.id === options?.author?.id ||
          mgs.author.bot === options.author?.isBot,
      );
    }

    if (options?.message) {
      validator.add((msg) => this.getMessageIdentifierValidation(msg, options.message));
    }

    if (options?.channel) {
      validator.add((mgs) => this.getChannelIdentifierValidation(mgs.channel, options.channel));
    }

    return executePromiseWithTimeout<Message>((resolve) => {
      this.onMessageCreate((message) => {
        if (validator.isValid(message)) {
          resolve(message);
        }
      });
    }, options?.timeout);
  }

  /**
   * @internal
   */
  onThreadCreate(fn: (thread: ThreadChannel) => void) {
    this._client.on("threadCreate", fn);
  }

  /**
   * @internal
   */
  onThreadDelete(fn: (thread: ThreadChannel) => void) {
    this._client.on("threadDelete", fn);
  }

  /**
   * @internal
   */
  onThreadListSync(fn: (threads: Collection<string, ThreadChannel>) => void) {
    this._client.on("threadListSync", fn);
  }

  /**
   * @internal
   */
  onThreadMemberUpdate(fn: (oldMember: ThreadMember, newMember: ThreadMember) => void) {
    this._client.on("threadMemberUpdate", fn);
  }

  /**
   * @internal
   */
  onThreadMembersUpdate(
    fn: (
      oldMembers: Collection<string, ThreadMember>,
      newMembers: Collection<string, ThreadMember>,
    ) => void,
  ) {
    this._client.on("threadMembersUpdate", fn);
  }

  /**
   * @internal
   */
  onThreadUpdate(fn: (oldThread: ThreadChannel, newThread: ThreadChannel) => void) {
    this._client.on("threadUpdate", fn);
  }

  /**
   * @internal
   */
  onStickerCreate(fn: (sticker: Sticker) => void) {
    this._client.on("stickerCreate", fn);
  }

  /**
   * @internal
   */
  onStickerDelete(fn: (sticker: Sticker) => void) {
    this._client.on("stickerDelete", fn);
  }

  /**
   * @internal
   */
  onStickerUpdate(fn: (sticker: Sticker) => void) {
    this._client.on("stickerUpdate", fn);
  }

  /**
   * @internal
   */
  onVoiceServerUpdate(fn: (...args: any[]) => void) {
    this._client.on("voiceServerUpdate", fn);
  }

  /**
   * @internal
   */
  onWebhookUpdate(fn: (channel: TextChannel | NewsChannel) => void) {
    this._client.on("webhookUpdate", fn);
  }

  /**
   * @internal
   */
  onShardError(fn: (error: Error, shardId: number) => void) {
    this._client.on("shardError", fn);
  }

  /**
   * @internal
   */
  onShardReconnecting(fn: (shardId: number) => void) {
    this._client.on("shardReconnecting", fn);
  }

  /**
   * @internal
   */
  onShardReady(fn: (shardId: number, unavailableGuilds: Set<string> | undefined) => void) {
    this._client.on("shardReady", fn);
  }

  /**
   * @internal
   */
  onShardResume(fn: (shardId: number, replayedEvents: number) => void) {
    this._client.on("shardResume", fn);
  }

  /**
   * @internal
   */
  onRaw(fn: (...args: any[]) => void) {
    this._client.on("raw", fn);
  }

  /**
   * @internal
   */
  onStageInstanceCreate(fn: (stageInstance: StageInstance) => void) {
    this._client.on("stageInstanceCreate", fn);
  }

  /**
   * @internal
   */
  onStageInstanceUpdate(
    fn: (oldStageInstance: StageInstance | null, newStageInstance: StageInstance) => void,
  ) {
    this._client.on("stageInstanceUpdate", fn);
  }

  /**
   * @internal
   */
  onStageInstanceDelete(fn: (stageInstance: StageInstance) => void) {
    this._client.on("stageInstanceDelete", fn);
  }

  /**
   * @internal
   */
  onceReady() {
    return this._once<Client<true>>("ready");
  }

  /**
   * @internal
   */
  onMessageReactionRemoveEmoji(fn: (reaction: corde.PartialOrMessageReaction) => void): void {
    this._client.on("messageReactionRemoveEmoji", fn);
  }

  /**
   * @internal
   */
  onceMessageReactionRemoveEmoji(options?: corde.IMessageReactionRemoveEmojiFilter) {
    const validator = new Validator<[corde.PartialOrMessageReaction]>();

    if (options?.emoji) {
      validator.add(
        (message) =>
          options.emoji?.name === message.emoji.name || options.emoji?.id === message.emoji.id,
      );
    }

    if (options?.message) {
      validator.add((messageReaction) =>
        this.getMessageIdentifierValidation(messageReaction.message, options.message),
      );
    }

    if (options?.channel) {
      validator.add((messageReaction) =>
        this.getChannelIdentifierValidation(messageReaction.message.channel, options.channel),
      );
    }

    return executePromiseWithTimeout<corde.PartialOrMessageReaction>((resolve) => {
      this.onMessageReactionRemoveEmoji((message) => {
        if (validator.isValid(message)) {
          resolve(message);
        }
      });
    }, options?.timeout);
  }

  /**
   * @internal
   */
  onChannelCreate(fn: (channel: Channel) => void): void {
    this._client.on("channelCreate", fn);
  }

  /**
   * @internal
   */
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

  /**
   * @internal
   */
  onChannelDelete(fn: (deletedChannel: Channel) => void): void {
    this._client.on("channelDelete", fn);
  }

  /**
   * @internal
   */
  onceChannelDelete(options?: corde.IChannelDeleteFilter): Promise<Channel> {
    const validator = new Validator<[Channel]>();

    if (options?.channel) {
      validator.add((channel) => this.getChannelIdentifierValidation(channel, options.channel));
    }

    return executePromiseWithTimeout((resolve) => {
      this.onChannelDelete((channel) => {
        if (validator.isValid(channel)) {
          resolve(channel);
        }
      });
    }, options?.timeout);
  }

  /**
   * @internal
   */
  onChannelPinsUpdate(fn: (channel: TextBasedChannel, updateTime: Date) => void): void {
    this._client.on("channelPinsUpdate", fn);
  }

  /**
   * @internal
   */
  onceChannelPinsUpdate(options?: corde.IChannelPinsUpdateFilter) {
    const validator = new Validator<[TextBasedChannel]>();

    if (options?.channel) {
      validator.add((channel) => this.getChannelIdentifierValidation(channel, options.channel));
    }

    return executePromiseWithTimeout<[TextBasedChannel, Date]>((resolve) => {
      this.onChannelPinsUpdate((channel, updateDate) => {
        if (validator.isValid(channel)) {
          resolve([channel, updateDate]);
        }
      });
    }, options?.timeout);
  }

  /**
   * @internal
   */
  onChannelUpdate(fn: (oldChannel: Channel, newChannel: Channel) => void) {
    this._client.on("channelUpdate", fn);
  }

  /**
   * @internal
   */
  onceChannelUpdate(options?: corde.IChannelUpdateFilter): Promise<[Channel, Channel]> {
    const validator = new Validator<[Channel]>();

    if (options?.channel) {
      validator.add((channel) => this.getChannelIdentifierValidation(channel, options.channel));
    }

    return executePromiseWithTimeout((resolve) => {
      this.onChannelUpdate((oldChannel, newChannel) => {
        if (validator.isValid(newChannel)) {
          resolve([oldChannel, newChannel]);
        }
      });
    }, options?.timeout);
  }

  /**
   * @internal
   */
  onDebug(fn: (arg: string) => void) {
    this._client.on("debug", fn);
  }

  /**
   * @internal
   */
  onceDebug(): Promise<string> {
    return this._once<string>("debug");
  }

  /**
   * @internal
   */
  onRoleDelete(fn: (role: Role) => void): void {
    this._client.on("roleDelete", fn);
  }

  /**
   * @internal
   */
  onceRoleDelete(options?: corde.IRoleEventFilter): Promise<Role> {
    const validator = new Validator<[Role]>();

    if (options?.id || options?.name) {
      validator.add((role) => this.roleMatchRoleData({ id: options.id, name: options.name }, role));
    }

    if (options?.guild) {
      validator.add((role) => this.getGuildValidation(role.guild, options.guild));
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
  onDisconnect(fn: () => void): void {
    this._client.on("disconnect", fn);
  }

  /**
   * Emitted when a shard's WebSocket disconnects and will no longer reconnect.
   * @returns Close event.
   * @internal
   */
  onceDisconnect(): Promise<[CloseEvent, number]> {
    return this._once<[CloseEvent, number]>("shardDisconnect");
  }

  /**
   * @internal
   */
  onEmojiCreate(fn: (createdEmoji: GuildEmoji) => void): void {
    this._client.on("emojiCreate", fn);
  }

  /**
   * @internal
   */
  onceEmojiCreate(options?: corde.IEmojiCreateFilter): Promise<GuildEmoji> {
    const validator = new Validator<[GuildEmoji]>();

    if (options?.emoji) {
      validator.add(
        (emoji) => emoji.name === options.emoji?.name || emoji.id === options.emoji?.id,
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

  /**
   * @internal
   */
  onEmojiDelete(fn: (emojiDeleted: GuildEmoji) => void): void {
    this._client.on("emojiDelete", fn);
  }

  /**
   * @internal
   */
  onceEmojiDelete(options?: corde.IEmojiDeleteFilter): Promise<GuildEmoji> {
    const validator = new Validator<[GuildEmoji]>();

    if (options?.emoji) {
      validator.add(
        (emoji) => emoji.name === options.emoji?.name || emoji.id === options.emoji?.id,
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

  /**
   * @internal
   */
  onEmojiUpdate(fn: (oldEmoji: GuildEmoji, newEmoji: GuildEmoji) => void): void {
    this._client.on("emojiUpdate", fn);
  }

  /**
   * @internal
   */
  onceEmojiUpdate(options?: corde.IEmojiDeleteFilter): Promise<[GuildEmoji, GuildEmoji]> {
    const validator = new Validator<[GuildEmoji]>();

    if (options?.emoji) {
      validator.add(
        (emoji) => emoji.name === options.emoji?.name || emoji.id === options.emoji?.id,
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

  /**
   * @internal
   */
  onError(fn: (error: Error) => void): void {
    this._client.on("error", fn);
  }

  /**
   * @internal
   */
  onceError(): Promise<Error> {
    return this._once<Error>("error");
  }

  /**
   * @internal
   */
  onGuildBan(fn: (guildBan: GuildBan) => void) {
    this._client.on("guildBanAdd", fn);
  }

  /**
   * @internal
   */
  onceGuildBan(options?: corde.IGuildBanFilter) {
    const validator = new Validator<[GuildBan]>();

    if (options?.guild) {
      validator.add((guildBan) => this.getGuildValidation(guildBan.guild, options.guild));
    }

    if (options?.user) {
      validator.add((guildBan) => this.getUserIdentifierValidation(guildBan.user, options?.user));
    }

    return executePromiseWithTimeout<GuildBan>((resolve) => {
      this.onGuildBan((guildBan) => {
        if (validator.isValid(guildBan)) {
          resolve(guildBan);
        }
      });
    }, options?.timeout);
  }

  /**
   * @internal
   */
  onGuildBanRemove(fn: (guild: GuildBan) => void) {
    this._client.on("guildBanRemove", fn);
  }

  /**
   * @internal
   */
  onceGuildBanRemove(options?: corde.IGuildBanRemoveFilter) {
    const validator = new Validator<[GuildBan]>();

    if (options?.guild) {
      validator.add((guildBan) => this.getGuildValidation(guildBan.guild, options.guild));
    }

    if (options?.user) {
      validator.add((guildBan) => this.getUserIdentifierValidation(guildBan.user, options?.user));
    }

    return executePromiseWithTimeout<GuildBan>((resolve) => {
      this.onGuildBanRemove((guildBan) => {
        if (validator.isValid(guildBan)) {
          resolve(guildBan);
        }
      });
    }, options?.timeout);
  }

  /**
   * @internal
   */
  onGuildCreate(fn: (createdGuild: Guild) => void) {
    this._client.on("guildCreate", fn);
  }

  /**
   * @internal
   */
  onceGuildCreate(options?: corde.IGuildCreateFilter) {
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

  /**
   * @internal
   */
  onGuildDelete(fn: (deletedGuild: Guild) => void) {
    this._client.on("guildDelete", fn);
  }

  /**
   * @internal
   */
  onceGuildDelete(options?: corde.IGuildDeleteFilter) {
    const validator = new Validator<[Guild]>();

    if (options?.name || options?.id) {
      validator.add((guild) =>
        this.getGuildValidation(guild, { id: options.id, name: options.name }),
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

  /**
   * @internal
   */
  onGuildMemberAdd(fn: (member: GuildMember) => void) {
    this._client.on("guildMemberAdd", fn);
  }

  /**
   * @internal
   */
  onceGuildMemberAdd(options?: corde.IGuildMemberAddFilter) {
    const validator = new Validator<[GuildMember]>();
    if (options?.member) {
      validator.add((member) => this.getGuildMemberIdentifierValidation(member, options.member));
    }

    if (options?.guild) {
      validator.add((member) => this.getGuildValidation(member.guild, options.guild));
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

  /**
   * @internal
   */
  onGuildMemberAvailable(fn: (member: GuildMember | PartialGuildMember) => void) {
    this._client.on("guildMemberAvailable", fn);
  }

  /**
   * @internal
   */
  onceGuildMemberAvailable(options?: corde.IGuildMemberAvailableFilter) {
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

  /**
   * @internal
   */
  onGuildMemberRemove(fn: (member: GuildMember | PartialGuildMember) => void) {
    this._client.on("guildMemberRemove", fn);
  }

  /**
   * @internal
   */
  onceGuildMemberRemove(options?: corde.IGuildMemberRemoveFilter) {
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

  /**
   * @internal
   */
  onGuildMemberChunk(
    fn: (
      members: Collection<string, GuildMember>,
      guild: Guild,
      eventResume: corde.IEventResume,
    ) => void,
  ) {
    this._client.on("guildMembersChunk", fn);
  }

  /**
   * @internal
   */
  onceGuildMemberChunk(options?: corde.IGuildMemberChunkFilter) {
    const validator = new Validator<[Collection<string, GuildMember>, Guild]>();

    if (options?.guild) {
      validator.add((_, guild) => this.getGuildValidation(guild, options.guild));
    }

    if (options?.guildMembers && options.guildMembers.length > 0) {
      validator.add((col) =>
        options.guildMembers?.every((optionsMember) =>
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

  /**
   * @internal
   */
  onGuildMemberUpdate(
    fn: (oldMember: GuildMember | PartialGuildMember, newMember: GuildMember) => void,
  ) {
    this._client.on("guildMemberUpdate", fn);
  }

  /**
   * @internal
   */
  onceGuildMemberUpdate(options?: corde.IGuildMemberUpdateFilter) {
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

  /**
   * @internal
   */
  onGuildUnavailable(fn: (guild: Guild) => void) {
    this._client.on("guildUnavailable", fn);
  }

  /**
   * @internal
   */
  onceGuildUnavailable(options?: corde.IGuildUnavailableFilter) {
    const validator = new Validator<[Guild]>();

    if (options?.id || options?.name) {
      validator.add((guild) =>
        this.getGuildValidation(guild, { id: options.id, name: options.name }),
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

  /**
   * @internal
   */
  onGuildUpdate(fn: (oldGuild: Guild, newGuild: Guild) => void) {
    this._client.on("guildUpdate", fn);
  }

  /**
   * @internal
   */
  onceGuildUpdate(options?: corde.IGuildUnavailableFilter) {
    const validator = new Validator<[Guild, Guild]>();

    if (options?.id || options?.name) {
      validator.add((guild) =>
        this.getGuildValidation(guild, { id: options.id, name: options.name }),
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

  /**
   * @internal
   * @deprecated Use onMessageCreated instead
   */
  onMessage(fn: (message: Message) => void) {
    this._client.on("message", fn);
  }

  // TODO: Refact once message to accept message content

  /**
   * @internal
   * @deprecated Use onceMessageCreated instead
   */
  onceMessage(options?: corde.IMessageContentEvent) {
    const validator = new Validator<[Message]>();

    if (options?.author) {
      validator.add(
        (mgs) =>
          mgs.author.username === options?.author?.username ||
          mgs.author.id === options?.author?.id ||
          mgs.author.bot === options.author?.isBot,
      );
    }

    if (options?.message) {
      validator.add((msg) => this.getMessageIdentifierValidation(msg, options.message));
    }

    if (options?.channel) {
      validator.add((mgs) => this.getChannelIdentifierValidation(mgs.channel, options.channel));
    }

    return executePromiseWithTimeout<Message>((resolve) => {
      this.onMessage((message) => {
        if (validator.isValid(message)) {
          resolve(message);
        }
      });
    }, options?.timeout);
  }

  /**
   * @internal
   */
  onMessageDelete(fn: (deletedMessage: Message | PartialMessage) => void) {
    this._client.on("messageDelete", fn);
  }

  /**
   * @internal
   */
  onceMessageDelete(options?: corde.IMessageDeleteFilter) {
    const validator = new Validator<[Message | PartialMessage]>();

    if (options?.author) {
      validator.add((mgs) => this.getUserIdentifierValidation(mgs.author, options.author));
    }

    if (options?.channel) {
      validator.add((mgs) => this.getChannelIdentifierValidation(mgs.channel, options?.channel));
    }

    return executePromiseWithTimeout<Message | PartialMessage>((resolve) => {
      this.onMessageDelete((message) => {
        if (validator.isValid(message)) {
          resolve(message);
        }
      });
    }, options?.timeout);
  }

  /**
   * @internal
   */
  onMessageDeleteBulk(fn: (deletedMessages: Collection<string, Message | PartialMessage>) => void) {
    this._client.on("messageDeleteBulk", fn);
  }

  /**
   * @internal
   */
  onceMessageDeleteBulk(options?: corde.IMessageDeleteBulkFilter) {
    const validator = new Validator<[Collection<string, Message | PartialMessage>]>();

    const _options = this.getIMessageDeleteFilterArray(options);

    for (const option of _options) {
      if (option?.author) {
        validator.add((mgs) =>
          mgs.some((m) => this.getUserIdentifierValidation(m.author, option?.author)),
        );
      }

      if (option?.channel) {
        validator.add((mgs) =>
          mgs.some((m) => this.getChannelIdentifierValidation(m.channel, option?.channel)),
        );
      }

      if (option?.message) {
        validator.add((mgs) =>
          mgs.some((m) => this.getMessageIdentifierValidation(m, option.message)),
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

  private getIMessageDeleteFilterArray(deleteOptions?: corde.IMessageDeleteBulkFilter) {
    if (!deleteOptions?.options) {
      return [];
    }

    if (Array.isArray(deleteOptions.options)) {
      return deleteOptions.options;
    }

    return [deleteOptions.options];
  }

  /**
   * @internal
   */
  onMessageReactionAdd(
    fn: (reaction: corde.PartialOrMessageReaction, user: User | PartialUser) => void,
  ) {
    this._client.on("messageReactionAdd", fn);
  }

  /**
   * @internal
   */
  onceMessageReactionAdd(options?: corde.IMessageReactionAddFilter) {
    const validator = new Validator<[corde.PartialOrMessageReaction, User | PartialUser]>();

    if (options?.author) {
      validator.add((_, user) => this.getUserIdentifierValidation(user, options.author));
    }

    if (options?.message) {
      validator.add((reaction) =>
        this.getMessageIdentifierValidation(reaction.message, options.message),
      );
    }

    if (options?.emoji) {
      validator.add(
        (reaction) =>
          options.emoji?.id === reaction.emoji.id || options.emoji?.name === reaction.emoji.name,
      );
    }

    if (options?.channel) {
      validator.add((reaction) =>
        this.getChannelIdentifierValidation(reaction.message.channel, options?.channel),
      );
    }

    return executePromiseWithTimeout<[corde.PartialOrMessageReaction, User | PartialUser]>(
      (resolve) => {
        this.onMessageReactionAdd((reaction, user) => {
          if (validator.isValid(reaction, user)) {
            resolve([reaction, user]);
          }
        });
      },
      options?.timeout,
    );
  }

  /**
   * @internal
   */
  onceMessageReactionsAdd(filter?: corde.ISearchMessageReactionsFilter) {
    return this._onceMessageReactionUpdate("onMessageReactionAdd", filter);
  }

  /**
   * @internal
   */
  onceMessageReactionsRemove(filter?: corde.ISearchMessageReactionsFilter) {
    return this._onceMessageReactionUpdate("onMessageReactionRemoveEmoji", filter);
  }

  private _onceMessageReactionUpdate(
    event: "onMessageReactionAdd" | "onMessageReactionRemoveEmoji",
    filter?: corde.ISearchMessageReactionsFilter,
  ) {
    const validator = new Validator<[corde.PartialOrMessageReaction, User | PartialUser | void]>();

    if (filter?.emojis) {
      validator.add((reaction) =>
        filter?.emojis?.some((e) => e.id === reaction.emoji.id || e.name === reaction.emoji.name),
      );
    }

    if (filter?.channel) {
      validator.add((reaction) =>
        this.getChannelIdentifierValidation(reaction.message.channel, filter?.channel),
      );
    }

    if (filter?.message) {
      validator.add((reaction) =>
        this.getMessageIdentifierValidation(reaction.message, filter?.message),
      );
    }

    if (filter?.author) {
      validator.add((_, author) => this.getUserIdentifierValidation(author, filter?.author));
    }

    const response: [corde.PartialOrMessageReaction, User | PartialUser | void][] = [];
    return executePromiseWithTimeout<[corde.PartialOrMessageReaction, User | PartialUser | void][]>(
      (resolve) => {
        this[event](
          (reaction: corde.PartialOrMessageReaction, author: User | PartialUser | void) => {
            if (validator.isValid(reaction, author)) {
              response.push([reaction, author]);
            }

            if (!filter?.emojis && !filter?.author && !filter?.message) {
              resolve(response);
            }

            if (response.length === filter?.emojis?.length) {
              resolve(response);
            }
          },
        );
      },
      filter?.timeout,
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
    fn: (removedReaction: corde.PartialOrMessageReaction, author: User | PartialUser) => void,
  ) {
    this._client.on("messageReactionRemove", fn);
  }

  /**
   * @internal
   */
  onceMessageReactionRemove(options?: corde.IMessageReactionRemoveFilter) {
    const validator = new Validator<[corde.PartialOrMessageReaction, User | PartialUser]>();

    if (options?.author) {
      validator.add((_, user) => this.getUserIdentifierValidation(user, options.author));
    }

    if (options?.message) {
      validator.add((reaction) =>
        this.getMessageIdentifierValidation(reaction.message, options.message),
      );
    }

    if (options?.emoji) {
      validator.add(
        (reaction) =>
          options.emoji?.id === reaction.emoji.id || options.emoji?.name === reaction.emoji.name,
      );
    }

    if (options?.channel) {
      validator.add((reaction) =>
        this.getChannelIdentifierValidation(reaction.message.channel, options?.channel),
      );
    }

    return executePromiseWithTimeout<[corde.PartialOrMessageReaction, User | PartialUser]>(
      (resolve) => {
        this.onMessageReactionRemove((reaction, user) => {
          if (validator.isValid(reaction, user)) {
            resolve([reaction, user]);
          }
        });
      },
      options?.timeout,
    );
  }

  /**
   * Emitted whenever all reactions are removed from a message.
   * @param fn function to receive the message who had it's reactions
   * removed.
   * @internal
   */
  onMessageReactionRemoveAll(
    fn: (message: Message | PartialMessage, reactions: Collection<string, MessageReaction>) => void,
  ) {
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

  /**
   * @internal
   */
  onceMessageUpdate(options?: corde.IMessageUpdateFilter) {
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

  /**
   * @internal
   */
  onceMessagePinned(options?: corde.IMessageEventFilter) {
    return this._onceMessageSetPinneble(
      (oldMessage, newMessage) => !(oldMessage.pinned as boolean) && (newMessage.pinned as boolean),
      options,
    );
  }

  /**
   * @internal
   */
  onceMessageUnPinned(options?: corde.IMessageEventFilter) {
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
    options?: corde.IMessageEventFilter,
  ) {
    const validator = new Validator<[Message | PartialMessage, Message | PartialMessage]>();
    validator.add(validation);

    if (options?.message) {
      validator.add((oldMessage) =>
        this.getMessageIdentifierValidation(oldMessage, options?.message),
      );
    }

    if (options?.channel) {
      validator.add((message) =>
        this.getChannelIdentifierValidation(message.channel, options?.channel),
      );
    }

    return executePromiseWithTimeout<Message | PartialMessage>((resolve) => {
      this.onMessageUpdate((oldMessage, newMessage) => {
        if (validator.isValid(oldMessage, newMessage)) {
          resolve(newMessage);
        }
      });
    }, options?.timeout);
  }

  /**
   * @internal
   */
  onceMessageContentOrEmbedChange(options?: corde.IMessageEventFilter) {
    const validator = new Validator<[Message | PartialMessage, Message | PartialMessage]>();
    validator.add(
      (oldMessage, newMessage) =>
        oldMessage.content != newMessage.content ||
        this.messagesHasDifferentEmbeds(oldMessage, newMessage),
    );

    if (options?.message) {
      validator.add((oldMessage) =>
        this.getMessageIdentifierValidation(oldMessage, options?.message),
      );
    }

    if (options?.channel) {
      validator.add((message) =>
        this.getChannelIdentifierValidation(message.channel, options?.channel),
      );
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

  private messagesHasDifferentEmbeds(
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
  onPresenceUpdate(fn: (oldMember: Presence | null, newMember: Presence) => void) {
    this._client.on("presenceUpdate", fn);
  }

  /**
   * @internal
   */
  oncePresenceUpdate(options?: corde.IPresenceUpdateFilter) {
    const validator = new Validator<[Presence]>();

    if (options?.guild) {
      validator.add(({ guild }) => this.getGuildValidation(guild, options.guild));
    }

    if (options?.clientPresence?.desktop) {
      validator.add(
        ({ clientStatus }) => clientStatus?.desktop === options.clientPresence?.desktop,
      );
    }

    if (options?.clientPresence?.mobile) {
      validator.add(({ clientStatus }) => clientStatus?.mobile === options.clientPresence?.mobile);
    }

    if (options?.clientPresence?.web) {
      validator.add(({ clientStatus }) => clientStatus?.web === options.clientPresence?.web);
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

  /**
   * @internal
   */
  onceRoleCreate(options?: corde.IRoleCreateEventFilter) {
    const validator = new Validator<[Role]>();

    if (options?.name) {
      validator.add((r) => r.name === options.name);
    }

    if (options?.guild) {
      validator.add(({ guild }) => this.getGuildValidation(guild, options.guild));
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

  /**
   * @internal
   */
  onceRoleUpdate(options?: corde.IRoleUpdateEventFilter) {
    const validator = new Validator<[Role, Role]>();

    if (options?.id || options?.name) {
      validator.add((role) => this.getRoleValidation(role, { id: options.id, name: options.name }));
    }

    return executePromiseWithTimeout<[Role, Role]>((resolve) => {
      this.onRoleUpdate((newRole, oldRole) => {
        if (validator.isValid(newRole, oldRole)) {
          resolve([newRole, oldRole]);
        }
      });
    }, options?.timeout);
  }

  /**
   * @internal
   */
  onceRoleRenamed(options?: corde.IRoleRenamedEventOptions) {
    return this._onRoleUpdateWithTimeout(
      (oldRole, newRole) => oldRole.name !== newRole.name,
      options,
    );
  }

  /**
   * @internal
   */
  onceRolePositionUpdate(options?: corde.IRoleEventFilter) {
    return this._onRoleUpdateWithTimeout(
      (oldRole, newRole) => oldRole.rawPosition !== newRole.rawPosition,
      options,
    );
  }

  /**
   * @internal
   */
  onceRoleUpdateColor(options?: corde.IRoleEventFilter) {
    return this._onRoleUpdateWithTimeout(
      (oldRole, newRole) => oldRole.color !== newRole.color,
      options,
    );
  }

  /**
   * @internal
   */
  onceRoleHoistUpdate(options?: corde.IRoleEventFilter) {
    return this._onRoleUpdateWithTimeout(
      (oldRole, newRole) => oldRole.hoist !== newRole.hoist,
      options,
    );
  }

  /**
   * @internal
   */
  onceRoleMentionableUpdate(options?: corde.IRoleEventFilter) {
    return this._onRoleUpdateWithTimeout(
      (oldRole, newRole) => oldRole.mentionable !== newRole.mentionable,
      options,
    );
  }

  /**
   * @internal
   */
  onceRolePermissionUpdate(options?: corde.IRolePermissionUpdateFilter) {
    const validator = new Validator<[Role, Role]>();

    if (options?.id || options?.name) {
      validator.add((_, newRole) =>
        this.roleMatchRoleData({ id: options.id, name: options.name }, newRole),
      );
    }

    if (options?.guild) {
      validator.add((newRole) => this.getGuildValidation(newRole.guild, options?.guild));
    }

    return executePromiseWithTimeout<Role>((resolve) => {
      this.onRoleUpdate((oldRole, newRole) => {
        if (validator.isValid(oldRole, newRole)) {
          resolve(newRole);
        }
      });
    }, options?.timeout);
  }

  private roleMatchRoleData(roleIdentifier: corde.IRoleIdentifier | undefined, role: Role) {
    return roleIdentifier?.id === role?.id || roleIdentifier?.name === role?.name;
  }

  /**
   * Emitted whenever a user starts typing in a channel.
   * @param fn function to receive the channel (where) and the user (who)
   * is typing.
   * @internal
   */
  onTypingStart(fn: (typing: Typing) => void) {
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

  /**
   * @internal
   */
  onUserUpdate(fn: (oldUser: User | PartialUser, newUser: User) => void) {
    this._client.on("userUpdate", fn);
  }

  /**
   * @internal
   */
  onceUserUpdate(options?: corde.IUserUpdateFilter) {
    const validator = new Validator<[User | PartialUser, User]>();

    if (options?.user) {
      validator.add((_, user) => this.getUserIdentifierValidation(user, options.user));
    }

    return executePromiseWithTimeout<[User | PartialUser, User]>((resolve) => {
      this.onUserUpdate((oldUser, newUser) => {
        if (validator.isValid(oldUser, newUser)) {
          resolve([oldUser, newUser]);
        }
      });
    }, options?.timeout);
  }

  /**
   * Emitted whenever a user changes voice state - e.g. joins/leaves a channel, mutes/unmutes.
   * @param fn function to receive the old and the new voiceState value.
   * @internal
   */
  onVoiceStateUpdate(fn: (oldMember: VoiceState, newMember: VoiceState) => void) {
    this._client.on("voiceStateUpdate", fn);
  }

  /**
   * @internal
   */
  onceVoiceStateUpdate(options?: corde.IVoiceStateUpdateFilter) {
    const validator = new Validator<[VoiceState, VoiceState]>();

    if (!isNullOrUndefined(options?.channel)) {
      validator.add((_, state) =>
        this.getChannelIdentifierValidation(state.channel, options?.channel),
      );
    }

    if (!isNullOrUndefined(options?.guild)) {
      validator.add((_, state) => this.getGuildValidation(state.guild, options?.guild));
    }

    if (!isNullOrUndefined(options?.id)) {
      validator.add((_, state) => state.id === options?.id);
    }

    if (!isNullOrUndefined(options?.selfDeaf)) {
      validator.add((_, state) => state.selfDeaf === options?.selfDeaf);
    }

    if (!isNullOrUndefined(options?.selfMute)) {
      validator.add((_, state) => state.selfMute === options?.selfMute);
    }

    if (!isNullOrUndefined(options?.selfVideo)) {
      validator.add((_, state) => state.selfVideo === options?.selfVideo);
    }

    if (!isNullOrUndefined(options?.serverDeaf)) {
      validator.add((_, state) => state.serverDeaf === options?.serverDeaf);
    }

    if (!isNullOrUndefined(options?.serverMute)) {
      validator.add((_, state) => state.serverMute === options?.serverMute);
    }

    if (!isNullOrUndefined(options?.sessionID)) {
      validator.add((_, state) => state.sessionId === options?.sessionID);
    }

    if (!isNullOrUndefined(options?.streaming)) {
      validator.add((_, state) => state.streaming === options?.streaming);
    }

    return executePromiseWithTimeout<[VoiceState, VoiceState]>((resolve) => {
      this.onVoiceStateUpdate((oldState, newState) => {
        if (validator.isValid(oldState, newState)) {
          resolve([oldState, newState]);
        }
      });
    }, options?.timeout);
  }

  /**
   * Execute an event `once` returning it's response.
   * @param event event's name.
   * @internal
   */
  private async _once<T>(event: keyof ClientEvents): Promise<T> {
    const response = await once(this._client, event);

    if (response.length === 1) {
      return response[0];
    }
    return response as unknown as T;
  }

  private _onRoleUpdateWithTimeout(
    comparable: (oldRole: Role, newRole: Role) => boolean,
    options?: corde.IRoleEventFilter,
  ) {
    const validator = new Validator<[Role, Role]>();

    validator.add((oldRole, newRole) => comparable(oldRole, newRole));

    if (options?.id || options?.name) {
      validator.add((_, newRole) =>
        this.roleMatchRoleData({ id: options?.id, name: options?.name }, newRole),
      );
    }

    if (options?.guild) {
      validator.add((role) => this.getRoleValidation(role, options.guild));
    }

    return executePromiseWithTimeout<Role>((resolve) => {
      this.onRoleUpdate((oldRole, newRole) => {
        if (validator.isValid(oldRole, newRole)) {
          resolve(newRole);
        }
      });
    }, options?.timeout);
  }

  private getRoleValidation(role: Optional<Role>, identifier: Optional<corde.IRoleIdentifier>) {
    return role?.name === identifier?.name || role?.id === identifier?.id;
  }

  private getChannelIdentifierValidation(
    channel: Optional<
      TextChannel | DMChannel | NewsChannel | PartialDMChannel | ThreadChannel | Channel
    >,
    identifier: Optional<corde.IChannelIdentifier>,
  ) {
    if (channel instanceof DMChannel) {
      return channel?.id === identifier?.id;
    }

    if (channel?.isText()) {
      return channel?.id === identifier?.id;
    }

    if (channel instanceof ThreadChannel) {
      return channel?.name === identifier?.name || channel?.id === identifier?.id;
    }

    return channel?.id === identifier?.id;
  }

  private getGuildValidation(guild: Optional<Guild>, identifier: Optional<corde.IGuildIdentifier>) {
    return guild?.name === identifier?.name || guild?.id === identifier?.id;
  }

  private getMessageIdentifierValidation(
    message: Optional<Message | PartialMessage>,
    identifier: Optional<corde.IMessageIdentifier>,
  ) {
    return message?.id === identifier?.id || message?.content === identifier?.content;
  }

  private getGuildMemberIdentifierValidation(
    member: Optional<GuildMember | PartialGuildMember>,
    identifier: Optional<corde.IGuildMemberIdentifier>,
  ) {
    return member?.nickname === identifier?.nickname || member?.id === identifier?.id;
  }

  private getUserIdentifierValidation(
    user: void | Optional<User | PartialUser>,
    identifier: Optional<corde.IUserIdentifier>,
  ) {
    return user?.id === identifier?.id || user?.username === identifier?.name;
  }
}
