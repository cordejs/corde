import { Message, Role } from "discord.js";
import { CordeClientError } from "../errors";
import { mapper } from "../mapper/messageMapper";
import { ICordeBot, IMessageEmbed, IRoleData, IRoleIdentifier, Primitive } from "../types";
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
  async joinVoiceChannel(channelId: string) {
    return await this._bot.joinVoiceChannel(channelId);
  }

  /**
   * Leaves a voice channel.
   */
  leaveVoiceChannel() {
    this._bot.leaveVoiceChannel();
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
  async fetchChannel(id: string) {
    return await this._bot.fetchChannel(id);
  }

  /**
   * Makes a fetch of a guild based on it's `id`.
   * @param id Id of the guild
   * @returns Guild if it's found
   */
  async fetchGuild(id: string) {
    return await this._bot.fetchGuild(id);
  }

  /**
   * Gets the channel defined in `configs`
   */
  getChannel() {
    return this._bot.channel;
  }

  /**
   * Gets the guild defined in `configs`
   */
  getGuild() {
    return this._bot.guild;
  }

  /**
   * Search for a guild in guild's cache, based on it's id
   * @param id id of the guild
   * @returns Guild if the id is valid and the guild is in the cache
   */
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
   * group("test 1", () => {
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

  // TODO: Rename "findRole" to "getRole"

  /**
   * Finds a role in config guild's cache, basing on it's **id**
   *
   * @param id Id of the role.
   * @throws CordeClientError if corde's bot is not connected.
   * @returns Role that matches the provided **id** or **name**
   */
  findRole(id: string): Role | undefined;
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
  findRole(data: IRoleIdentifier): Role | undefined;
  findRole(data: string | IRoleIdentifier) {
    if (!this._bot.isLoggedIn()) {
      throw new CordeClientError("Bot is not connected yet. No role can be searched");
    }

    return this._findRole(data);
  }

  private _findRole(data: string | IRoleIdentifier) {
    if (typeof data === "string") {
      return this._bot.getRoles().find((r) => r.id === data);
    }
    return this._bot.getRoles().find((r) => r.id === data.id || r.name === data.name);
  }
}
