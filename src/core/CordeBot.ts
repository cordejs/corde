import chalk from "chalk";
import {
  Channel,
  Client,
  Collection,
  Guild,
  GuildBasedChannel,
  Message,
  MessageOptions,
  MessagePayload,
  Role,
  TextChannel,
  VoiceChannel,
} from "discord.js";
import { ICordeBot, Primitive } from "../types";
import { isPrimitiveValue } from "../utils/isPrimitiveValue";
import { typeOf } from "../utils/typeOf";
import { Events } from "./Events";
import { joinVoiceChannel } from "@discordjs/voice";
import EventEmitter from "events";
import { errors } from "../const";
import runtime from "./runtime";

/**
 * Encapsulation of Discord Client with all specific
 * functions for corde test.
 */
export class CordeBot implements ICordeBot {
  public readonly events: Events;
  private readonly _prefix: string;
  private readonly _guildId: string;
  private readonly _channelId: string;
  private readonly _testBotId: string;
  private readonly _client: Client;
  private readonly _emitter: EventEmitter;
  private _voiceConnection?: corde.IVoiceChannelState;

  private _textChannel!: TextChannel;
  public _guild!: Guild;

  get guild() {
    return this._guild;
  }

  get textChannel() {
    return this._textChannel;
  }

  /**
   * Starts new instance of Discord client with its events.
   *
   * @param prefix Corde bot prefix.
   * @param guildId Guild id where corde bot is located in.
   * @param channelId Channel id where corde bot is located in.
   * @param testBotId id of testing bot.
   */
  constructor(
    prefix: string,
    guildId: string,
    channelId: string,
    testBotId: string,
    client: Client,
  ) {
    this.events = new Events(client);
    this._client = client;
    this._channelId = channelId;
    this._prefix = prefix;
    this._guildId = guildId;
    this._testBotId = testBotId;
    this._emitter = new EventEmitter();
  }

  get client() {
    return this._client;
  }

  get roleManager() {
    return this.guild.roles;
  }

  get channel() {
    return this.textChannel;
  }

  get testBotId() {
    return this._testBotId;
  }

  get voiceConnection() {
    return this._voiceConnection;
  }

  get id() {
    return this._client.user?.id;
  }

  /**
   * Authenticate Corde bot to the installed bot in Discord server.
   *
   * @param token Corde bot token
   *
   * @returns Promise resolve for success connection, or a promise
   * rejection with a formatted message if there was found a error in
   * connection attempt.
   */
  async login(token: string) {
    try {
      return await this._client.login(token);
    } catch (error) {
      throw new Error(this.buildLoginErrorMessage(token, error.message));
    }
  }

  async fetchChannel(id: string) {
    const channel = await this._client.channels.fetch(id, { cache: true });
    if (channel) {
      return channel;
    }
    return undefined;
  }

  fetchGuild(id: string): Promise<Guild | undefined> {
    return this._client.guilds.fetch(id);
  }

  /**
   * Destroy client connection.
   */
  logout() {
    this._client.destroy();
  }

  /**
   * Sends a pure message without prefix it.
   * @param message Data to be send to channel
   */
  sendMessage(message: Primitive | MessageOptions | MessagePayload) {
    if (isPrimitiveValue(message)) {
      return this.textChannel.send(message.toString());
    }
    return this.textChannel.send(message);
  }

  /**
   * Send a message to a channel defined in configs.
   *
   * @see Runtime
   *
   * @param message Message without prefix that will be sent to defined server's channel
   * @description The message is concatenated with the stored **prefix** and is sent to the channel.
   *
   * @return Promise rejection if a testing bot does not send any message in the timeout value set,
   * or a resolve for the promise with the message returned by the testing bot.
   */
  async sendTextMessage(message: Primitive, channelId?: string): Promise<Message> {
    this.throwIfMessageIsInvalid(message);

    const formattedMessage = this._prefix + message;

    if (channelId) {
      const channel = await this.findChannelById(channelId);
      this.throwIfChannelIsInvalid(channel, channelId);

      if (channel?.isText()) {
        return channel.send(formattedMessage);
      }

      throw new Error(errors.channel.cantSendMessageToNonTextChannel());
    }

    return this.textChannel.send(formattedMessage);
  }

  private async findChannelById(channelId: string) {
    const channel = this.guild.channels.cache.get(channelId);

    if (channel) {
      return channel;
    }

    return await this.guild.channels.fetch(channelId, { cache: true });
  }

  /**
   * Checks if corde bot is connected
   */
  isLoggedIn() {
    return !!this._client && !!this._client.readyAt;
  }

  async findMessage(filter: (message: Message) => boolean): Promise<Message | undefined>;
  async findMessage(data: corde.IMessageIdentifier): Promise<Message | undefined>;
  async findMessage(
    data: corde.IMessageIdentifier | ((message: Message) => boolean),
  ): Promise<Message | undefined> {
    const messageIdentifier: corde.IMessageIdentifier = data as corde.IMessageIdentifier;

    if (messageIdentifier && messageIdentifier.content) {
      return this._findMessage((m) => m.content === messageIdentifier.content);
    }

    if (messageIdentifier && messageIdentifier.id) {
      return this._findMessage((m) => m.id === messageIdentifier.id);
    }

    if (data) {
      return this._findMessage(data as (message: Message) => boolean);
    }

    return undefined;
  }

  fetchRole(id: string): Promise<Role | null> {
    return this.guild.roles.fetch(id, { cache: true });
  }

  async fetchRoles() {
    const roles = await this.guild.roles.fetch();
    return roles.map((u) => u);
  }

  async hasRole(roleIdentifier: corde.IRoleIdentifier) {
    return !!(await this.findRole(roleIdentifier));
  }

  async findRole(roleIdentifier: corde.IRoleIdentifier) {
    const roles = await this.fetchRoles();
    if (roleIdentifier.id) {
      return roles.find((r) => r.id === roleIdentifier.id);
    } else if (roleIdentifier.name) {
      return roles.find((r) => r.name === roleIdentifier.name);
    }
    return undefined;
  }

  getRoles() {
    return this.guild.roles.cache;
  }

  /**
   * Search for messages based in a filter query.
   */
  private async _findMessage(
    fn: (value: Message, key: string, collection: Collection<string, Message>) => boolean,
  ) {
    const collection = await this.textChannel.messages.fetch();
    if (collection) {
      return collection.find(fn);
    }
    return undefined;
  }

  /**
   * Get a channel based in the id stored in configs.
   */
  async loadGuildAndChannel() {
    this._guild = this.findGuild(this._guildId);
    const channel = await this.findChannel(this._channelId);
    this._textChannel = this.convertToTextChannel(channel);
  }

  // Don't use `object` as a type. The `object` type is currently hard to use
  // ([see this issue](https://github.com/microsoft/TypeScript/issues/21732)).
  // Consider using `Record<string, unknown>` instead, as it allows you to more easily inspect and use the keys

  private buildLoginErrorMessage(token: string, error: string) {
    if (!token) {
      return `Error trying to login with ${chalk.bold(typeOf(token))} token`;
    }
    return errors.client.loginError(token, runtime.configs.intents, error);
  }

  private throwIfMessageIsInvalid(message: Primitive) {
    if (!message || message.toString().trim() === "") {
      throw new Error(errors.emptyCommand);
    }
  }

  private throwIfChannelIsInvalid(
    channel: Channel | any,
    channelId: string,
  ): channel is Channel | never {
    if (!channel) {
      let errorMessage = errors.channel.notFound(channelId);
      const channels = this.guild.channels.cache.map((c) => c.id);
      if (channels.length) {
        errorMessage += `Available channels: `;
        errorMessage += channels.toString();
      } else {
        errorMessage += `No channel is available for guid: ${this._guildId}`;
      }
      throw new Error(errorMessage);
    }
    return typeof channel === "object";
  }

  findGuild(guildId: string) {
    if (!guildId) {
      throw new Error(errors.guild.invalidId(guildId));
    }

    if (!this._client.guilds) {
      throw new Error(errors.cordeBotWithoutGuilds(guildId));
    }

    if (!this._client.guilds.cache.has(guildId)) {
      throw new Error(errors.cordeBotDontBelongToGuild(guildId));
    }

    const guild = this._client.guilds.cache.find((_guild) => _guild.id === guildId);

    if (guild) {
      return guild;
    }

    const availableGuildsIds = this._client.guilds.cache.map((guildAvailable) => guildAvailable.id);
    throw new Error(errors.guild.notFound(guildId, availableGuildsIds));
  }

  async findChannel(channelId: string): Promise<GuildBasedChannel>;
  async findChannel(guild: Guild, channelId: string): Promise<GuildBasedChannel>;
  async findChannel(
    channelIdOrGuild: Guild | string,
    channelId?: string,
  ): Promise<GuildBasedChannel> {
    if (typeof channelIdOrGuild === "string") {
      let channel = this.guild.channels.cache.get(channelIdOrGuild);
      if (!channel) {
        channel = (await this.guild.channels.fetch(channelIdOrGuild)) as GuildBasedChannel;
      }
      this.throwIfChannelIsInvalid(channel, channelIdOrGuild);
      return channel as GuildBasedChannel;
    }
    const guild = channelIdOrGuild;

    if (!channelId) {
      throw new Error(errors.channel.invalidChannelId());
    }

    if (!guild.channels) {
      throw new Error(errors.guild.withoutChannel(guild.name));
    }
    if (!guild.channels.cache.has(channelId)) {
      throw new Error(errors.guildDoNotContainInformedChannel(guild, channelId));
    }

    const channel = guild.channels.cache.find((ch) => ch.id === channelId);
    this.throwIfChannelIsInvalid(channel, channelId);

    return channel as GuildBasedChannel;
  }

  async joinVoiceChannel(channelId: string) {
    const channel = this._client.channels.cache.get(channelId);

    if (!channel) {
      throw new Error(errors.channel.notFound(channelId));
    }

    if (channel instanceof VoiceChannel) {
      this._voiceConnection = {
        channel: channel,
        connection: joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guildId,
          adapterCreator: channel.guild.voiceAdapterCreator,
        }),
      };
      return this._voiceConnection;
    }

    throw new Error(errors.channel.isNotVoice(channelId));
  }

  isInVoiceChannel() {
    return !!this._voiceConnection;
  }

  isStreamingInVoiceChannel() {
    return !!this._voiceConnection?.connection;
  }

  stopStream() {
    this._voiceConnection?.connection?.disconnect();
  }

  leaveVoiceChannel() {
    this._voiceConnection?.connection?.destroy();
    this._voiceConnection = undefined;
  }

  private convertToTextChannel(channel: Channel): TextChannel {
    return channel as TextChannel;
  }
}
