import {
  CategoryChannel,
  DMChannel,
  Guild,
  Message,
  NewsChannel,
  Role,
  TextChannel,
  VoiceChannel,
} from "discord.js";
import { CordeClientError } from "../errors";
import { mapper } from "../mapper/messageMapper";
import {
  IChannelIdentifier,
  ICordeBot,
  ICreateChannelOptions,
  ICreateChannelOptionsSimple,
  IGuildCreateOptions,
  IGuildIdentifier,
  IMessageEmbed,
  IRoleData,
  IRoleIdentifier,
  Primitive,
} from "../types";
import { isPrimitiveValue } from "../utils";

export class Bot {
  private _bot: ICordeBot;

  /**
   * Gets the voice channel state that corde's bot is connected in, If it's connected.
   * This property is filled when `joinVoiceChannel()` connects to a channel
   * and is cleared when `leaveVoiceChannal()` is called.
   */
  get voiceState() {
    return this._bot.voiceConnection;
  }

  /**
   * Client of Discord.js
   */
  get client() {
    return this._bot.client;
  }

  /**
   * Same of `this.getChannel()`
   */
  get channel() {
    return this.getChannel();
  }

  /**
   * Get all channels in **cache** of the bot
   */
  get channels() {
    this._throwDefaultErrorIfNotLogged();
    return this._bot.client.channels.cache.array();
  }

  /**
   * Same of `this.getGuild()`
   */
  get guild() {
    return this.getGuild();
  }

  /**
   * Members of the guild defined in configs
   */
  get guildMembers() {
    this._throwDefaultErrorIfNotLogged();
    return this.guild.members.cache.array();
  }

  /**
   * Get all guilds in **cache** of the bot
   */
  get guilds() {
    this._throwDefaultErrorIfNotLogged();
    return this._bot.client.guilds.cache.array();
  }

  /**
   * Get all roles in **cache** of the guild
   * defined in configs.
   *
   * Shortcut for:
   *
   * ```typescript
   * this.getGuild().roles.cache.array()
   * ```
   */
  get roles() {
    this._throwDefaultErrorIfNotLogged();
    return this.getGuild().roles.cache.array();
  }

  /**
   * Checks if corde's bot is connected and ready.
   */
  get isLoggedIn() {
    return this._bot.isLoggedIn();
  }

  constructor(bot: ICordeBot) {
    this._bot = bot;
  }

  /**
   * Checks if a given message was sent by corde's bot
   * @param message Sent message
   * @returns If corde's bot is the author of the message
   */
  isMessageAuthor(message: Message) {
    return message.author.id === this._bot.id;
  }

  /**
   * Joins corde's bot to a voice channel.
   * @param channelId Voice channel to corde's bot connect
   * @returns Voice connection state. This property can be get from `bot.voiceState`
   */
  joinVoiceChannel(channelId: string) {
    if (!this.isLoggedIn) {
      throw new CordeClientError(
        "Can not join a voice channel while corde bot is not connected yet",
      );
    }

    return this._bot.joinVoiceChannel(channelId);
  }

  /**
   * Leaves a voice channel.
   */
  leaveVoiceChannel() {
    if (!this.isLoggedIn) {
      throw new CordeClientError("Can not leave a voice channel as corde bot is not connected yet");
    }

    this._bot.leaveVoiceChannel();
  }

  /**
   * From all channels in **cache**, get all that are of type text
   */
  getOnlyTextChannels() {
    return this.channels.filter((c) => c.isText()) as (TextChannel | DMChannel | NewsChannel)[];
  }

  /**
   * Checks if corde's bot is in a voice channel
   */
  isInVoiceChannel() {
    return this._bot.isInVoiceChannel();
  }

  /**
   * Makes a fetch of a channel based on it's `id`.
   * @param id Id of the channel
   * @returns Channel if it's found
   */
  fetchChannel(id: string) {
    this._throwDefaultErrorIfNotLogged();
    return this._bot.fetchChannel(id);
  }

  /**
   * Makes a fetch of a guild based on it's `id`.
   * @param id Id of the guild
   * @returns Guild if it's found
   */
  fetchGuild(id: string) {
    this._throwDefaultErrorIfNotLogged();
    return this._bot.fetchGuild(id);
  }

  /**
   * Fetch for a role based on it's id, caching it after that.
   * @param roleId Id of the role.
   * @throws Error if corde's bot isn't connected yet.
   * @returns Fetched Role or undefined.
   */
  async fetchRole(roleId: string): Promise<Role | undefined>;
  /**
   * Fetch for a role based on it's id, and it's guild's id, caching it after that.
   *
   * @param roleId Id of the role.
   * @param guildId Id of the guild.
   * @param fetchGuild Define if the guild should be fetched or searched in cache.
   *
   * @throws Error if corde's bot isn't connected yet.
   *
   * @returns Fetched Role or undefined.
   */
  async fetchRole(roleId: string, guildId: string, fetchGuild?: boolean): Promise<Role | undefined>;
  async fetchRole(roleId: string, guildId?: string, fetchGuild = false): Promise<Role | undefined> {
    if (!this._bot.isLoggedIn()) {
      throw new CordeClientError("Could not create the guild while corde bot isn't connected yet");
    }

    if (guildId) {
      const guild = await this._getOrFetchGuild(guildId, fetchGuild);

      if (!guild) {
        return undefined;
      }

      return this._fetchRole(roleId, this.guild);
    }
    return this._fetchRole(roleId, this.guild);
  }

  private _getOrFetchGuild(guildId: string, fetchGuild = false) {
    if (fetchGuild) {
      return this._bot.client.guilds.fetch(guildId);
    } else {
      return this._bot.client.guilds.cache.get(guildId);
    }
  }

  /**
   * Gets the channel defined in `configs`
   */
  getChannel(): TextChannel;
  /**
   * Gets a channel from `client.channels.cache` based on the channel's id
   * @param id Channel Id
   * @return Channel searched by it's id or undefined.
   */
  getChannel(id: string): TextChannel | undefined;
  /**
   * Gets a channel from `client.channels.cache` based on the channel's id or name
   * @param identifier Channel's identifier
   * @return Channel searched or undefined.
   */
  getChannel(identifier: IChannelIdentifier): TextChannel | undefined;
  getChannel(identifier?: string | IChannelIdentifier) {
    if (!this._bot.isLoggedIn()) {
      throw new CordeClientError("Corde is not connected yet to fetch any data");
    }

    if (!identifier) {
      return this._bot.channel;
    }

    if (typeof identifier === "string") {
      return this._bot.client.channels.cache.find((c) => c.id === identifier);
    }

    return this._bot.client.channels.cache.find((c) => {
      if (c.id === identifier.id) {
        return true;
      }

      if (c.isText()) {
        return (c as TextChannel).name === identifier.name;
      }

      return false;
    });
  }

  /**
   * Gets the guild defined in `configs`
   */
  getGuild(): Guild;
  /**
   * Gets a guild from `client.channels.guild` based on the guild's id
   * @param id Guild Id
   * @return Guild searched by it's id or undefined.
   */
  getGuild(id: string): Guild | undefined;
  /**
   * Gets a guild from `client.guild.cache` based on the guild's id or name
   * @param identifier Guild's identifier
   * @return Guild searched or undefined.
   */
  getGuild(identifier: IGuildIdentifier): Guild | undefined;
  getGuild(identifier?: string | IGuildIdentifier) {
    if (!this._bot.isLoggedIn()) {
      throw new CordeClientError("Can not get any guild while corde bot is not connected yet");
    }

    if (!identifier) {
      return this._bot.guild;
    }

    if (typeof identifier === "string") {
      return this._bot.client.guilds.cache.find((c) => c.id === identifier);
    }

    return this._bot.client.guilds.cache.find(
      (c) => c.id === identifier.id || c.name === identifier.name,
    );
  }

  /**
   * Sends a message to the connected textChannel.
   *
   * **This function does not work without a test case**
   *
   * @param message Message to send
   *
   * @example
   *
   * // Works
   * test("test 1", () => {
   *    const message = await corde.bot.send("msg");
   *    expect(`editMessage ${message.id}`).toEditMessage({ id: message.id }, "newValue");
   * });
   *
   * // Do not Works
   * group("test 1", () => {
   *    const message = await corde.bot.send("msg");
   * });
   *
   * @throws CordeClienteError - If bot is not connected yet.
   *
   * @returns null if message is empty, null or undefined.
   * Message if **message** is not empty and it was send to Discord.
   *
   * @since 2.0
   */
  send(message: string | number | boolean | bigint): Promise<Message>;
  send(message: IMessageEmbed): Promise<Message>;
  send(message: Primitive | IMessageEmbed): Promise<Message> {
    if (!message) {
      throw new Error("Can not send a empty message");
    }

    if (!this.isLoggedIn) {
      throw new CordeClientError(
        "Can not send a directly message to channel because the client is not connected yet",
      );
    }

    if (isPrimitiveValue(message)) {
      return this._bot.sendMessage(message);
    }

    const embed = mapper.embedInterfaceToMessageEmbed(message);
    return this._bot.sendMessage(embed);
  }

  /**
   * Creates a new role to the guild provided in configs.
   *
   * @param roleIdentifier Basic informations about the role.
   * @see https://cordejs.org/docs/configurations#guildid
   *
   * @throws CordeClientError if corde has not yet connect it's bot.
   * @returns A promise that return the created role.
   *
   * @since 2.1
   */
  async createRole(data: IRoleData) {
    if (!this.isLoggedIn) {
      throw new CordeClientError("Bot is not connected yet. Can not create a role");
    }

    try {
      return await this._bot.roleManager.create({ data });
    } catch (error) {
      throw Error("Could not create the role. " + error);
    }
  }

  /**
   * Creates a new `guild` in defined in configs.
   *
   * Shortcut for:
   *
   * ```typescript
   * this.client.guilds.create("nameExample");
   * ```
   *
   * @param name Name of the new guild.
   * @throws Error if corde's bot isn't connected yet.
   * @returns Created guild.
   */
  createGuild(name: string): Promise<Guild>;
  /**
   * Creates a new `guild` in defined in configs.
   *
   * Shortcut for:
   *
   * ```typescript
   * this.client.guilds.create("exampleName", { ... });
   * ```
   *
   * @param options Informations about the guild.
   * @throws Error if corde's bot isn't connected yet.
   * @returns Created guild.
   */
  createGuild(options: IGuildCreateOptions): Promise<Guild>;
  createGuild(options: string | IGuildCreateOptions) {
    if (!this.isLoggedIn) {
      throw new CordeClientError("Could not create the guild while corde bot isn't connected yet");
    }

    if (typeof options === "string") {
      return this._bot.client.guilds.create(options);
    }
    return this._bot.client.guilds.create(options.name, options);
  }

  /**
   * Creates a new channel in guild defined in configs.
   *
   * Shortcut for:
   *
   * ```typescript
   * this.client.channels.create("exampleName");
   * ```
   *
   * @param name Name of the new channel.
   * @throws Error if corde's bot isn't connected yet.
   * @returns Created channel.
   */
  createChannel(name: string): Promise<TextChannel>;
  /**
   * Creates a new channel in guild defined in configs.
   *
   * Shortcut for:
   *
   * ```typescript
   * this.client.channels.create("exampleName", { ... });
   * ```
   *
   * @param options Informations about the channel, including it's type.
   * @throws Error if corde's bot isn't connected yet.
   * @returns Created channel.
   */
  createChannel(
    channelOptions: ICreateChannelOptions,
  ): Promise<TextChannel | VoiceChannel | CategoryChannel>;
  createChannel(options: string | ICreateChannelOptions) {
    if (!this.isLoggedIn) {
      throw new CordeClientError(
        "Could not create the channel while corde bot isn't connected yet",
      );
    }

    if (typeof options === "string") {
      return this.guild.channels.create(options);
    }
    return this.guild.channels.create(options.name, options);
  }

  /**
   * Creates a new **voice** channel in guild defined in configs.
   *
   * Shortcut for:
   *
   * ```typescript
   * this.client.channels.create("exampleName", { type: "voice" });
   * ```
   *
   * @param name Name of the new channel.
   * @throws Error if corde's bot isn't connected yet.
   * @returns Created channel.
   */
  createVoiceChannel(name: string): Promise<VoiceChannel>;
  /**
   * Creates a new **voice** channel in guild defined in configs.
   *
   * Shortcut for:
   *
   * ```typescript
   * this.client.channels.create("exampleName", { ..., type: "voice" });
   * ```
   *
   * @param options Informations about the channel.
   * @throws Error if corde's bot isn't connected yet.
   * @returns Created channel.
   */
  createVoiceChannel(options: ICreateChannelOptionsSimple): Promise<VoiceChannel>;
  createVoiceChannel(options: string | ICreateChannelOptionsSimple) {
    return this._createChannel(options, "voice");
  }

  /**
   * Creates a new **text** channel in guild defined in configs.
   *
   * Shortcut for:
   *
   * ```typescript
   * this.client.channels.create("exampleName", { type: "text" });
   * ```
   *
   * @param name Name of the new channel.
   * @throws Error if corde's bot isn't connected yet.
   * @returns Created channel.
   */
  createTextChannel(name: string): Promise<TextChannel>;
  /**
   * Creates a new **text** channel in guild defined in configs.
   *
   * Shortcut for:
   *
   * ```typescript
   * this.client.channels.create("exampleName", { ..., type: "text" });
   * ```
   *
   * @param options Informations about the channel.
   * @throws Error if corde's bot isn't connected yet.
   * @returns Created channel.
   */
  createTextChannel(options: ICreateChannelOptionsSimple): Promise<TextChannel>;
  createTextChannel(options: string | ICreateChannelOptionsSimple) {
    return this._createChannel(options, "text");
  }

  /**
   * Creates a new **category** channel in guild defined in configs.
   *
   * Shortcut for:
   *
   * ```typescript
   * this.client.channels.create("exampleName", { type: "category" });
   * ```
   *
   * @param name Name of the new channel.
   * @throws Error if corde's bot isn't connected yet.
   * @returns Created channel.
   */
  createCategoryChannel(name: string): Promise<CategoryChannel>;
  /**
   * Creates a new **category** channel in guild defined in configs.
   *
   * Shortcut for:
   *
   * ```typescript
   * this.client.channels.create("exampleName", { ..., type: "category" });
   * ```
   *
   * @param options Informations about the channel.
   * @throws Error if corde's bot isn't connected yet.
   * @returns Created channel.
   */
  createCategoryChannel(options: ICreateChannelOptionsSimple): Promise<CategoryChannel>;
  createCategoryChannel(options: string | ICreateChannelOptionsSimple) {
    return this._createChannel(options, "category");
  }

  /**
   * Finds a role in config guild's cache, basing on it's **id**
   *
   * @param id Id of the role.
   * @throws CordeClientError if corde's bot is not connected.
   * @returns Role that matches the provided **id** or **name**
   */
  getRole(id: string): Role | undefined;
  /**
   * Finds a role in config guild's cache, basing on it's **id** or **name**.
   *
   * @param data Data of the role. It can be it's **name** or **id**.
   *
   * if both informations be provided, and they are from two differents
   * roles, the result will correspond to the role that matchs with the parameter
   * **id**.
   *
   * @throws CordeClientError if corde's bot is not connected.
   * @returns Role that matches the provided **id** or **name**
   */
  getRole(data: IRoleIdentifier): Role | undefined;
  getRole(data: string | IRoleIdentifier) {
    if (!this._bot.isLoggedIn()) {
      throw new CordeClientError("Bot is not connected yet. No role can be searched");
    }

    return this._getRole(data);
  }

  private async _fetchRole(roleId: string, guild: Guild) {
    const role = await guild.roles.fetch(roleId, true);
    if (role) {
      return role;
    }
    return undefined;
  }

  private _getRole(data: string | IRoleIdentifier) {
    if (typeof data === "string") {
      return this._bot.getRoles().find((r) => r.id === data);
    }
    return this._bot.getRoles().find((r) => r.id === data.id || r.name === data.name);
  }

  private _createChannel(
    options: string | ICreateChannelOptionsSimple,
    type?: ICreateChannelOptions["type"],
  ) {
    if (!this.isLoggedIn) {
      throw new CordeClientError(
        "Could not create the channel while corde bot isn't connected yet",
      );
    }

    if (typeof options === "string") {
      return this.guild.channels.create(options, { type });
    }
    return this.guild.channels.create(options.name, options);
  }

  private _throwDefaultErrorIfNotLogged() {
    if (!this.isLoggedIn) {
      throw new CordeClientError("Corde is not connected yet to fetch any data");
    }
  }
}
