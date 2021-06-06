import { RoleData } from "discord.js";
import { CordeClientError } from "../errors";
import { mapper } from "../mapper/messageMapper";
import { CordeRole } from "../discordjs-structures/cordeRole";
import { IBot, ICordeBot, IMessageEmbed, IRoleIdentifier } from "../types";
import { isPrimitiveValue } from "../utils";

export class Bot implements IBot {
  private _bot: ICordeBot;
  constructor(bot: ICordeBot) {
    this._bot = bot;
  }

  async joinVoiceChannel(channelId: string) {
    this._bot.joinVoiceChannel(channelId);
  }

  leaveVoiceChannel() {
    this._bot.leaveVoiceConnection();
  }

  isInVoiceChannel() {
    return this._bot.isInVoiceChannel();
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
  send(message: string | number | IMessageEmbed) {
    if (!message) {
      throw new Error("Can not send a empty message");
    }

    if (!this._bot.isLoggedIn()) {
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
  async createRole(data: RoleData) {
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

  _getRole(data: string | IRoleIdentifier) {
    if (typeof data === "string") {
      return this._bot.getRoles().find((r) => r.id === data);
    }
    return this._bot.getRoles().find((r) => r.id === data.id || r.name === data.name);
  }
}
