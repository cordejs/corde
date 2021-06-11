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

import { DMChannel } from "discord.js";
import { CordeTextBasedChannel } from "./cordeTextBasedChannel";

/**
 * Encapsulation of [Discord.js DM Channel](https://discord.js.org/#/docs/main/master/class/DMChannel)
 *
 * @see https://discord.com/developers/docs/resources/guild
 */
export class CordeDMChannel extends CordeTextBasedChannel<DMChannel> {
  constructor(dmChannel: DMChannel) {
    if (!dmChannel.partial) {
      throw new Error("Can not load a partial channel");
    }
    super(dmChannel);
  }
}
