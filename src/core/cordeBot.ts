import chalk from "chalk";
import {
  Channel,
  Client,
  Collection,
  Guild,
  GuildChannel,
  Message,
  MessageEmbed,
  Role,
  TextChannel,
  VoiceChannel,
} from "discord.js";
import { CordeClientError } from "../errors";
import { ICordeBot, IVoiceChannelState, Primitive } from "../types";
import { typeOf } from "../utils";
import { Events } from "./Events";

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
  private _voiceConnection?: IVoiceChannelState;

  private textChannel!: TextChannel;
  private _isReady: boolean;

  /**
   * Starts new instance of Discord client with its events.
   *
   * @param prefix Corde bot prefix.
   * @param guildId Guild id where corde bot is located in.
   * @param channelId Channel id where corde bot is located in.
   * @param waitTimeOut Timeout for message wait.
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
      return this._client.login(token);
    } catch (error) {
      throw new CordeClientError(this.buildLoginErrorMessage(token, error.message));
    }
  }

  fetchChannel(id: string): Promise<Channel | undefined> {
    return this._client.channels.fetch(id, true);
  }

  fetchGuild(id: string): Promise<Guild | undefined> {
    return this._client.guilds.fetch(id, true);
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
  async sendMessage(message: Primitive | MessageEmbed) {
    return await this.textChannel.send(message);
  }

  /**
   * Send a message to a channel defined in configs.
   *
   * @see Runtime
   *
   * @param message Message without prefix that will be sent to defined server's channel
   * @description The message is concatenated with the stored **prefix** and is sent to the channel.
   *
   * @return Promise rejection if a testing bot does not send any message in the timeout value setted,
   * or a resolve for the promise with the message returned by the testing bot.
   */
  async sendTextMessage(message: Primitive, channelId?: string): Promise<Message> {
    this.validateMessageAndChannel(message);
    const formattedMessage = this._prefix + message;

    if (channelId) {
      const channel = await this.findChannelById(channelId);

      if (!channel) {
        throw new Error(`Channel ${channelId} was not found`);
      }

      if (channel.isText()) {
        const returnedMessage = await channel.send(formattedMessage);
        return returnedMessage;
      }

      throw new Error("Can not send a message to a non text channel");
    }

    const returnedMessage = await this.textChannel.send(formattedMessage);
    return returnedMessage;
  }

  private async findChannelById(channelId: string) {
    const channel = this._client.channels.cache.get(channelId);

    if (channel) {
      return channel;
    }

    return await this._client.channels.fetch(channelId, true);
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
    return this.guild.roles.fetch(id, false, true);
  }

  fetchRoles() {
    return this.guild.roles.fetch();
  }

  async hasRole(roleIdentifier: corde.IRoleIdentifier) {
    return !!(await this.findRole(roleIdentifier));
  }

  async findRole(roleIdentifier: corde.IRoleIdentifier) {
    const cache = (await this.guild.roles.fetch())?.cache;
    if (roleIdentifier.id) {
      return cache.find((r) => r.id === roleIdentifier.id);
    } else if (roleIdentifier.name) {
      return cache.find((r) => r.name === roleIdentifier.name);
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
      throw new CordeClientError("Could not load channel " + this._channelId);
    }
    this.textChannel = this.convertToTextChannel(channel);
  }

  private loadClientEvents() {
    this.events.onReady(() => {
      this._isReady = true;
      this.loadChannel();
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

  private validateMessageAndChannel(message: Primitive) {
    if (!message || message.toString().trim() === "") {
      throw new CordeClientError("command to be sent can not be empty");
    }

    if (!this.textChannel) {
      throw new CordeClientError("text channel not defined");
    }
  }

  findGuild(guildId: string) {
    if (!this._client.guilds) {
      throw new CordeClientError(
        `corde bot isn't added in a guild. Please add it to the guild: ${guildId}`,
      );
    } else if (!this._client.guilds.cache.has(guildId)) {
      throw new CordeClientError(
        `Guild ${guildId} doesn't belong to corde bot. change the guild id ` +
          " in corde.config or add the bot to a valid guild",
      );
    } else {
      const guild = this._client.guilds.cache.find((_guild) => _guild.id === guildId);

      if (guild) {
        return guild;
      }

      const availableGuildsIds = this._client.guilds.cache.map(
        (guildAvailable) => guildAvailable.id,
      );
      throw new CordeClientError(
        `Could not find the guild ${guildId}.` +
          ` this client has connections with the following guilds: ${availableGuildsIds}`,
      );
    }
  }

  findChannel(channelId: string): GuildChannel | undefined;
  findChannel(guild: Guild, channelId: string): GuildChannel | undefined;
  findChannel(channelIdOrGuild: Guild | string, channelId?: string): GuildChannel | undefined {
    if (typeof channelIdOrGuild === "string") {
      return this.guild.channels.cache.get(channelIdOrGuild);
    }

    const guild = channelIdOrGuild;

    if (!channelId) {
      throw new CordeClientError("no channel id provided");
    }

    if (!guild.channels) {
      throw new CordeClientError(`Guild '${guild.name}' do not have any channel.`);
    } else if (!guild.channels.cache.has(channelId)) {
      throw new CordeClientError(
        `channel ${channelId} doesn't appear to be a channel of guild ${guild.name}`,
      );
    } else {
      const channel = guild.channels.cache.find((ch) => ch.id === channelId);

      if (channel === undefined) {
        throw new CordeClientError("There is no informed channel to start tests");
      }

      return channel;
    }
  }

  async joinVoiceChannel(channelId: string) {
    const channel = this._client.channels.cache.get(channelId);

    if (!channel) {
      throw new CordeClientError(`channel ${channelId} not found`);
    }

    if (channel.isText()) {
      throw new CordeClientError("can not join a text channel");
    }

    if (channel instanceof VoiceChannel) {
      this._voiceConnection = {
        channel: channel,
        connection: await channel.join(),
      };
      return this._voiceConnection;
    }

    throw new CordeClientError("channel is not a voice channel to connect");
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
    this._voiceConnection?.channel.leave();
    this._voiceConnection = undefined;
  }

  private convertToTextChannel(channel: Channel): TextChannel {
    return channel as TextChannel;
  }
}
