import { Client, Message, MessageEmbed } from "discord.js";
import { runtime } from "../common";

/**
 * Provides functions to execute inside a testing bot.
 */
interface WithOption {
  /**
   * Login bot using data provided in **botTestToken** config.
   * Return after login succed and client emit *ready* event.
   *
   * @returns Self instance.
   */
  login(): Promise<WithOption>;

  /**
   * Sends a message to the channel provided in **channelId** config.
   * @param message Message to be send.
   *
   * @returns Sent message.
   */
  sendMessage(message: string | MessageEmbed): Promise<Message>;

  /**
   * Destroys bot connection.
   */
  logoff(): void;
}

class WithOptionImpl implements WithOption {
  private _client: Client;
  private _isReady = false;
  constructor(client: Client) {
    if (!client) {
      throw new Error("Client can not be undefined");
    }
    this._client = client;
  }

  async login() {
    if (this._isReady) {
      return this;
    }

    const readyPromise = new Promise<void>((resolve) => {
      this._client.on("ready", () => {
        resolve();
      });
    });
    await this._client.login(runtime.configs.botTestToken);
    await readyPromise;
    this._isReady = true;
    return this;
  }

  logoff() {
    if (this._isReady) {
      this._client.destroy();
    }
  }

  async sendMessage(message: string | MessageEmbed): Promise<Message> {
    if (!this._isReady) {
      throw new Error("Client not ready to send messages");
    }

    const channel = await this.findChannel(runtime.channelId);

    if (channel.isText()) {
      return await channel.send(message);
    }

    throw new Error("Can not send messages to a channel that is not Text");
  }

  private async findChannel(channelId: string) {
    let channel = this._client.channels.cache.get(runtime.channelId);
    if (channel) {
      return channel;
    }

    channel = await this._client.channels.fetch(channelId);

    if (channel) {
      return channel;
    }

    throw new Error("can not find channel in cache or fetch it");
  }
}

/**
 * Define actions to be done by the testing bot.
 * @param client Cliente instance to be used to execute actions.
 * @returns instance of actions for the client.
 */
export function withClient(client: Client): WithOption {
  return new WithOptionImpl(client);
}
