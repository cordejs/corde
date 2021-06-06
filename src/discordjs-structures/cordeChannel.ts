/**
 * All references and documentation is from Discord.js
 * and Discord API documentations.
 *
 * @see https://discord.js.org/#/docs/main/stable/general/welcome
 * @see https://discord.com/developers/docs/intro
 */

import { Channel } from "discord.js";

export class CordeChannel<T extends Channel> {
  protected _channel: T;

  constructor(channel: T) {
    this._channel = channel;
  }

  /**
   * The unique ID of the channel.
   */
  get id() {
    return this._channel.id;
  }

  /**
   *
   */
  get createdAt() {
    return this._channel.createdAt;
  }

  /**
   * Whether the channel has been deleted.
   */
  get isDeleted() {
    return this._channel.deleted;
  }

  /**
   * The type of the channel, either:
   *
   * * `dm` - a DM channel
   * * `text` - a guild text channel
   * * `voice` - a guild voice channel
   * * `category` - a guild category channel
   * * `news` - a guild news channel
   * * `store` - a guild store channel
   * * `stage` - a guild stage channel
   * * `unknown` - a generic channel of unknown type, could be Channel or GuildChannel
   *
   */
  get type() {
    return this._channel.type;
  }

  /**
   * Deletes this channel.
   */
  async delete() {
    if (!this.isDeleted) {
      await this._channel.delete();
    }
    return this;
  }

  isText() {
    return this._channel.isText();
  }
}
