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

import { Channel as DChannel } from "discord.js";
import { IChannelSnapshot } from "../types/snapshot";
import { AbstractEntity } from "./SnapshotlyEntity";

export class Channel<T extends DChannel, S extends IChannelSnapshot>
  extends AbstractEntity<S>
  implements IChannelSnapshot
{
  protected _channel: T;

  constructor(channel: T) {
    super();
    this._channel = channel;
  }

  get id() {
    return this._channel.id;
  }

  get createdAt() {
    return this._channel.createdAt;
  }

  get isDeleted() {
    return this._channel.deleted;
  }

  get type() {
    return this._channel.type;
  }

  /**
   * Deletes this channel if it's not already deleted (`this.isDeleted`).
   */
  async delete() {
    if (!this.isDeleted) {
      await this.executeWithErrorOverride(() => this._channel.delete());
    }
    return this;
  }
}
