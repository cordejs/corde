import { Message, Role } from "discord.js";
import { CordeClientError } from "../errors";
import { mapper } from "../mapper/messageMapper";
import { ICordeBot, IMessageEmbed, IRoleData, IRoleIdentifier, Primitive } from "../types";
import { isPrimitiveValue } from "../utils";

export class Bot {
  private _bot: ICordeBot;

  get voiceChannel() {
    return this._bot.voiceConnection?.channel;
  }

  constructor(bot: ICordeBot) {
    this._bot = bot;
  }

  async joinVoiceChannel(channelId: string) {
    return await this._bot.joinVoiceChannel(channelId);
  }

  leaveVoiceChannel() {
    this._bot.leaveVoiceChannel();
  }

  isInVoiceChannel() {
    return this._bot.isInVoiceChannel();
  }

  async fetchChannel(id: string) {
    return await this._bot.fetchChannel(id);
  }

  async fetchGuild(id: string) {
    const guild = await this._bot.fetchGuild(id);
    return guild;
  }

  /**
   * Gets the channel defined in `configs`
   */
  async getChannel() {
    return this._bot.channel;
  }

  /**
   * Gets the guild defined in `configs`
   */
  getGuild() {
    return this._bot.guild;
  }

  findGuild(id: string) {
    return this._bot.findGuild(id);
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
  async send(message: string | number | boolean | bigint): Promise<Message>;
  async send(message: IMessageEmbed): Promise<Message>;
  async send(message: Primitive | IMessageEmbed): Promise<Message> {
    if (!message) {
      throw new Error("Can not send a empty message");
    }

    if (!this._bot.isLoggedIn()) {
      throw new CordeClientError(
        "Can not send a directly message to channel because the client is not connected yet",
      );
    }

    if (isPrimitiveValue(message)) {
      return await this._bot.sendMessage(message);
    }

    const embed = mapper.embedInterfaceToMessageEmbed(message);
    return await this._bot.sendMessage(embed);
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
      return await this._bot.roleManager.create({ data });
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

  private _getRole(data: string | IRoleIdentifier) {
    if (typeof data === "string") {
      return this._bot.getRoles().find((r) => r.id === data);
    }
    return this._bot.getRoles().find((r) => r.id === data.id || r.name === data.name);
  }
}
