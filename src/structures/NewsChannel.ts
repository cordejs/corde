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

import { NewsChannel as DNewsChannel } from "discord.js";
import { INewsChannelSnapshot } from "../types/snapshot";
import { TextBasedChannel } from "./TextBasedChannel";

/**
 * Encapsulation of [Discord.js News Channel](https://discord.js.org/#/docs/main/master/class/NewsChannel)
 *
 */
export class NewsChannel
  extends TextBasedChannel<DNewsChannel, INewsChannelSnapshot>
  implements INewsChannelSnapshot
{
  constructor(channel: DNewsChannel) {
    super(channel);
  }

  /**
   * Whether the channel is viewable by the client user.
   */
  get isViewable() {
    return this._channel.viewable;
  }

  get nsfw() {
    return this._channel.nsfw;
  }

  get topic() {
    return this._channel.topic ?? undefined;
  }
}
