/**
 * All references and documentation are from Discord.js
 * and Discord API documentations.
 *
 * Thanks Discord.js for the rich documentation that helped so much ❤️
 *
 * @see https://discord.js.org/#/docs/main/stable/general/welcome
 * @see https://discord.com/developers/docs/intro
 * @see https://discordjs.guide/
 * @see https://github.com/discordjs/guide
 */

import { Channel, DMChannel, NewsChannel, TextChannel } from "discord.js";
import { CordeClientError } from "../errors";
import { mapper } from "../mapper/messageMapper";
import {
  CordeDMChannel,
  CordeGuild,
  CordeMessage,
  CordeNewsChannel,
  CordeRole,
  CordeTextChannel,
} from "../structures";
import { ICordeBot, IMessageEmbed, IRoleData, IRoleIdentifier, Primitive } from "../types";
import { isPrimitiveValue } from "../utils";
import { VoiceChannel } from "./voiceChannel";

export class Bot {
  private _bot: ICordeBot;
  private _voiceChannel: VoiceChannel | undefined;

  get voiceChannel() {
    return this._voiceChannel;
  }

  constructor(bot: ICordeBot) {
    this._bot = bot;
  }

  async joinVoiceChannel(channelId: string) {
    await this._bot.joinVoiceChannel(channelId);
    this._voiceChannel = new VoiceChannel(this._bot);
    return this._voiceChannel;
  }

  leaveVoiceChannel() {
    this._bot.leaveVoiceConnection();
    this._voiceChannel = undefined;
  }

  isInVoiceChannel() {
    return this._bot.isInVoiceChannel();
  }

  async fetchChannel(id: string) {
    const channel = await this._bot.fetchChannel(id);

    if (channel) {
      return this.mapToCordeInheratedChannel(channel);
    }
    return undefined;
  }

  async fetchGuild(id: string) {
    const guild = await this._bot.fetchGuild(id);

    if (guild) {
      return new CordeGuild(guild);
    }

    return undefined;
  }

  /**
   * Gets the channel defined in `configs`
   */
  async getChannel() {
    return new CordeTextChannel(this._bot.channel);
  }

  /**
   * Gets the guild defined in `configs`
   */
  getGuild() {
    return new CordeGuild(this._bot.guild);
  }

  fingGuild(id: string) {
    const guild = this._bot.findGuild(id);
    return new CordeGuild(guild);
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
   *    const message = await sendMessage("msg");
   *    expect(`editMessage ${message.id}`).toEditMessage({ id: message.id }, "newValue");
   * });
   *
   * // Do not Works
   * test("test 1", () => {
   *    const message = await sendMessage("msg");
   * });
   *
   * @throws CordeClienteError - If bot is not connected yet.
   *
   * @returns null if message is empty, null or undefined.
   * Message if **message** is not empty and it was send to Discord.
   *
   * @since 2.0
   */
  async send(message: string | number | boolean | bigint): Promise<CordeMessage>;
  async send(message: IMessageEmbed): Promise<CordeMessage>;
  async send(message: Primitive | IMessageEmbed): Promise<CordeMessage> {
    if (!message) {
      throw new Error("Can not send a empty message");
    }

    if (!this._bot.isLoggedIn()) {
      throw new CordeClientError(
        "Can not send a directly message to channel because the client is not connected yet",
      );
    }

    if (isPrimitiveValue(message)) {
      const msg = await this._bot.sendMessage(message);
      return new CordeMessage(msg);
    }

    const embed = mapper.embedInterfaceToMessageEmbed(message);
    const msg = await this._bot.sendMessage(embed);
    return new CordeMessage(msg);
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
    if (!this._bot.isLoggedIn()) {
      throw new CordeClientError("Bot is not connected yet. Can not create a role");
    }

    try {
      const createdRole = await this._bot.roleManager.create({ data });
      return new CordeRole(createdRole);
    } catch (error) {
      throw Error("Could not create the role. " + error);
    }
  }

  /**
   * Finds a role in config guild's cache, basing on it's **id**
   *
   * @param id Id of the role.
   * @throws CordeClientError if corde's bot is not connected.
   * @returns Role that matches the provided **id** or **name**
   */
  getRole(id: string): CordeRole | undefined;
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
  getRole(data: IRoleIdentifier): CordeRole | undefined;
  getRole(data: string | IRoleIdentifier) {
    if (!this._bot.isLoggedIn()) {
      throw new CordeClientError("Bot is not connected yet. No role can be searched");
    }

    const _role = this._getRole(data);
    if (_role) {
      return new CordeRole(_role);
    }
    return undefined;
  }

  private _getRole(data: string | IRoleIdentifier) {
    if (typeof data === "string") {
      return this._bot.getRoles().find((r) => r.id === data);
    }
    return this._bot.getRoles().find((r) => r.id === data.id || r.name === data.name);
  }

  private mapToCordeInheratedChannel(channel: Channel) {
    if (channel instanceof TextChannel) {
      return new CordeTextChannel(channel);
    }

    if (channel instanceof NewsChannel) {
      return new CordeNewsChannel(channel);
    }

    if (channel instanceof DMChannel) {
      return new CordeDMChannel(channel);
    }

    // TODO: Create VM Channel
    throw new Error(`Channel '${channel.constructor.name}' not mapped`);
  }
}
