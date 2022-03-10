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
import { once } from "events";

enum InternalEvent {
  InternallyReady = "internally_ready",
}

interface InternallyReadyResponse {
  ok: boolean;
  error?: string;
}

/**
 * Encapsulation of Discord Client with all specific
 * functions for corde test.
 */
export class CordeBot implements ICordeBot {
  readonly events: Events;
  private readonly _prefix: string;
  private readonly _guildId: string;
  private readonly _channelId: string;
  private readonly _testBotId: string;
  private readonly _client: Client;
  private readonly _emitter: EventEmitter;
  private _voiceConnection?: corde.IVoiceChannelState;

  private textChannel!: TextChannel;
  private _isReady: boolean;

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
    this.loadClientEvents();
    this._isReady = false;
    this._emitter = new EventEmitter();
  }

  get client() {
    return this._client;
  }

  get guild() {
    return this.textChannel.guild;
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

  async onceInternallyReady() {
    const [r] = await once(this._emitter, InternalEvent.InternallyReady);
    const response: InternallyReadyResponse = r;
    if (!response.ok) {
      throw new Error(response.error);
    }
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
    this.throwIfChannelIsInvalid();

    const formattedMessage = this._prefix + message;

    if (channelId) {
      const channel = await this.findChannelById(channelId);

      if (!channel) {
        throw new Error(`Channel ${channelId} was not found`);
      }

      if (channel.isText()) {
        return channel.send(formattedMessage);
      }

      throw new Error("Can not send a message to a non text channel");
    }

    return this.textChannel.send(formattedMessage);
  }

  private async findChannelById(channelId: string) {
    const channel = this._client.channels.cache.get(channelId);

    if (channel) {
      return channel;
    }

    return await this._client.channels.fetch(channelId, { cache: true });
  }

  /**
   * Checks if corde bot is connected
   */
  isLoggedIn() {
    return !!this._client && !!this._client.readyAt && this._isReady;
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
   *
   * @see Runtime
   */
  private loadChannel() {
    const guild = this.findGuild(this._guildId);
    const channel = this.findChannel(guild, this._channelId);
    if (!channel) {
      throw new Error("Could not load channel " + this._channelId);
    }
    this.textChannel = this.convertToTextChannel(channel);
  }

  private loadClientEvents() {
    this.events.onReady(() => {
      try {
        this.loadChannel();
        this._isReady = true;
        this._emitter.emit(InternalEvent.InternallyReady, { ok: true });
      } catch (error) {
        this._isReady = false;
        this._emitter.emit(InternalEvent.InternallyReady, { ok: false, error: error.message });
      }
    });
  }

  // Don't use `object` as a type. The `object` type is currently hard to use
  // ([see this issue](https://github.com/microsoft/TypeScript/issues/21732)).
  // Consider using `Record<string, unknown>` instead, as it allows you to more easily inspect and use the keys

  private buildLoginErrorMessage(token: string, error: string) {
    if (!token) {
      return `Error trying to login with ${chalk.bold(typeOf(token))} token`;
    }
    return `Error trying to login with token ${chalk.bold(token)}. \n` + error;
  }

  private throwIfMessageIsInvalid(message: Primitive) {
    if (!message || message.toString().trim() === "") {
      throw new Error("command to be sent can not be empty");
    }
  }

  private throwIfChannelIsInvalid() {
    if (!this.textChannel) {
      throw new Error("text channel not defined");
    }
  }

  findGuild(guildId: string) {
    if (!this._client.guilds) {
      throw new Error(`corde bot isn't added in a guild. Please add it to the guild: ${guildId}`);
    } else if (!this._client.guilds.cache.has(guildId)) {
      throw new Error(
        `\nGuild ${guildId} doesn't belong to corde bot. change the guild id ` +
          "in corde.config or add the bot to a valid guild\n",
      );
    } else {
      const guild = this._client.guilds.cache.find((_guild) => _guild.id === guildId);

      if (guild) {
        return guild;
      }

      const availableGuildsIds = this._client.guilds.cache.map(
        (guildAvailable) => guildAvailable.id,
      );
      throw new Error(
        `Could not find the guild ${guildId}.` +
          ` this client has connections with the following guilds: ${availableGuildsIds}`,
      );
    }
  }

  findChannel(channelId: string): GuildBasedChannel | undefined;
  findChannel(guild: Guild, channelId: string): GuildBasedChannel | undefined;
  findChannel(channelIdOrGuild: Guild | string, channelId?: string): GuildBasedChannel | undefined {
    if (typeof channelIdOrGuild === "string") {
      return this.guild.channels.cache.get(channelIdOrGuild);
    }

    const guild = channelIdOrGuild;

    if (!channelId) {
      throw new Error("no channel id provided");
    }

    if (!guild.channels) {
      throw new Error(`Guild '${guild.name}' do not have any channel.`);
    } else if (!guild.channels.cache.has(channelId)) {
      throw new Error(`channel ${channelId} doesn't appear to be a channel of guild ${guild.name}`);
    } else {
      const channel = guild.channels.cache.find((ch) => ch.id === channelId);

      if (channel === undefined) {
        throw new Error("There is no informed channel to start tests");
      }

      return channel;
    }
  }

  async joinVoiceChannel(channelId: string) {
    const channel = this._client.channels.cache.get(channelId);

    if (!channel) {
      throw new Error(`channel ${channelId} not found`);
    }

    if (channel.isText()) {
      throw new Error("can not join a text channel");
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

    throw new Error("channel is not a voice channel to connect");
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
