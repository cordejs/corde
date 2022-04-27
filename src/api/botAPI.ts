import {
  CategoryChannel,
  CreateRoleOptions,
  DMChannel,
  Guild,
  Message,
  MessageOptions,
  NewsChannel,
  Role,
  TextChannel,
  VoiceChannel,
} from "discord.js";
import { CordeClientError } from "../errors";
import { ICordeBot, Primitive } from "../types";
import { collectionToArray } from "../utils/collectionToArray";

export class BotAPI implements corde.IBot {
  private _bot: ICordeBot;

  get voiceState() {
    return this._bot.voiceConnection;
  }

  get client() {
    return this._bot.client;
  }

  get channel() {
    return this.getChannel();
  }

  get channels() {
    this._throwErrorIfNotLogged();
    return collectionToArray(this._bot.client.channels.cache);
  }

  get guild() {
    return this.getGuild();
  }

  get guildMembers() {
    this._throwErrorIfNotLogged();
    return collectionToArray(this.guild.members.cache);
  }

  get guilds() {
    this._throwErrorIfNotLogged();
    return collectionToArray(this._bot.client.guilds.cache);
  }

  get roles() {
    this._throwErrorIfNotLogged();
    return collectionToArray(this.getGuild().roles.cache);
  }

  get isLoggedIn() {
    return this._bot.isLoggedIn();
  }

  constructor(bot: ICordeBot) {
    this._bot = bot;
  }

  isMessageAuthor(message: Message) {
    return message.author.id === this._bot.id;
  }

  joinVoiceChannel(channelId: string) {
    this._throwErrorIfNotLogged(
      "Can not join a voice channel while corde bot is not connected yet",
    );
    return this._bot.joinVoiceChannel(channelId);
  }

  leaveVoiceChannel() {
    this._throwErrorIfNotLogged("Can not leave a voice channel as corde bot is not connected yet");
    this._bot.leaveVoiceChannel();
  }

  getOnlyTextChannels() {
    this._throwErrorIfNotLogged();
    return this.channels.filter((c) => c.isText()) as (TextChannel | DMChannel | NewsChannel)[];
  }

  isInVoiceChannel() {
    return this._bot.isInVoiceChannel();
  }

  fetchChannel(id: string) {
    this._throwErrorIfNotLogged();
    return this._bot.fetchChannel(id);
  }

  fetchGuild(id: string) {
    this._throwErrorIfNotLogged();
    return this._bot.fetchGuild(id);
  }

  async fetchRole(roleId: string): Promise<Role | undefined>;
  async fetchRole(roleId: string, guildId: string, fetchGuild?: boolean): Promise<Role | undefined>;
  async fetchRole(roleId: string, guildId?: string, fetchGuild = false): Promise<Role | undefined> {
    this._throwErrorIfNotLogged("Could not create the guild while corde bot isn't connected yet");

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

  getChannel(): TextChannel;
  getChannel(id: string): TextChannel | undefined;
  getChannel(identifier: corde.IChannelIdentifier): TextChannel | undefined;
  getChannel(identifier?: string | corde.IChannelIdentifier) {
    this._throwErrorIfNotLogged("Corde is not connected yet to fetch any data");

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

  getGuild(): Guild;
  getGuild(id: string): Guild | undefined;
  getGuild(identifier: corde.IGuildIdentifier): Guild | undefined;
  getGuild(identifier?: string | corde.IGuildIdentifier) {
    this._throwErrorIfNotLogged("Can not get any guild while corde bot is not connected yet");

    if (!identifier) {
      return this._bot.guild;
    }

    if (typeof identifier === "string") {
      return this.guilds.find((c) => c.id === identifier);
    }

    return this.guilds.find((c) => c.id === identifier.id || c.name === identifier.name);
  }

  send(message: string | number | boolean | bigint): Promise<Message>;
  send(message: MessageOptions): Promise<Message>;
  send(message: Primitive | MessageOptions): Promise<Message> {
    if (!message) {
      throw new Error("Can not send a empty message");
    }

    this._throwErrorIfNotLogged(
      "Can not send a directly message to channel because the client is not connected yet",
    );

    return this._bot.sendMessage(message);
  }

  createRole(name?: string): Promise<Role>;
  createRole(data: CreateRoleOptions): Promise<Role>;
  createRole(data?: string | CreateRoleOptions) {
    this._throwErrorIfNotLogged("Bot is not connected yet. Can not create a role");
    if (typeof data === "string") {
      return this._bot.roleManager.create({ name: data });
    }
    return this._bot.roleManager.create(data);
  }

  private _throwErrorIfInvalidName(name: string, errorMessage: string) {
    if (!name || typeof name !== "string" || !name.trim()) {
      throw new Error(errorMessage);
    }
  }

  createGuild(name: string): Promise<Guild>;
  createGuild(options: corde.IGuildCreateOptions): Promise<Guild>;
  createGuild(options: string | corde.IGuildCreateOptions) {
    this._throwErrorIfNotLogged("Could not create the guild while corde bot isn't connected yet");

    const errorMessage = "Could not create a guild with an invalid name";
    if (typeof options === "string") {
      this._throwErrorIfInvalidName(options, errorMessage);
      return this._bot.client.guilds.create(options);
    }

    this._throwErrorIfInvalidName(options.name, errorMessage);
    return this._bot.client.guilds.create(options.name, options);
  }

  createChannel(name: string): Promise<TextChannel>;

  createChannel(
    channelOptions: corde.ICreateChannelOptions,
  ): Promise<TextChannel | VoiceChannel | CategoryChannel>;
  createChannel(options: string | corde.ICreateChannelOptions) {
    this._throwErrorIfNotLogged("Could not create the channel while corde bot isn't connected yet");

    if (typeof options === "string") {
      return this.guild.channels.create(options, {});
    }
    return this.guild.channels.create(options.name, options);
  }

  createVoiceChannel(name: string): Promise<VoiceChannel>;
  createVoiceChannel(options: corde.ICreateChannelOptionsSimple): Promise<VoiceChannel>;
  createVoiceChannel(options: string | corde.ICreateChannelOptionsSimple) {
    return this._createChannel(options, "GUILD_VOICE");
  }

  createTextChannel(name: string): Promise<TextChannel>;
  createTextChannel(options: corde.ICreateChannelOptionsSimple): Promise<TextChannel>;
  createTextChannel(options: string | corde.ICreateChannelOptionsSimple) {
    return this._createChannel(options, "GUILD_TEXT");
  }

  createCategoryChannel(name: string): Promise<CategoryChannel>;
  createCategoryChannel(options: corde.ICreateChannelOptionsSimple): Promise<CategoryChannel>;
  createCategoryChannel(options: string | corde.ICreateChannelOptionsSimple) {
    return this._createChannel(options, "GUILD_CATEGORY");
  }

  getRole(id: string): Role | undefined;
  getRole(data: corde.IRoleIdentifier): Role | undefined;
  getRole(data: string | corde.IRoleIdentifier) {
    this._throwErrorIfNotLogged("Bot is not connected yet. No role can be searched");
    return this._getRole(data);
  }

  private async _fetchRole(roleId: string, guild: Guild) {
    const role = await guild.roles.fetch(roleId, { cache: true });
    if (role) {
      return role;
    }
    return undefined;
  }

  private _getRole(data: string | corde.IRoleIdentifier) {
    if (typeof data === "string") {
      return this._bot.getRoles().find((r) => r.id === data);
    }
    return this._bot.getRoles().find((r) => r.id === data.id || r.name === data.name);
  }

  private _createChannel(
    options: string | corde.ICreateChannelOptionsSimple,
    type?: corde.ICreateChannelOptions["type"],
  ) {
    this._throwErrorIfNotLogged("Could not create the channel while corde bot isn't connected yet");

    if (typeof options === "string") {
      return this.guild.channels.create(options, { type });
    }
    return this.guild.channels.create(options.name, { ...options, type });
  }

  private _throwErrorIfNotLogged(message = "Corde is not connected yet to fetch any data") {
    if (!this.isLoggedIn) {
      throw new CordeClientError(message);
    }
  }
}
