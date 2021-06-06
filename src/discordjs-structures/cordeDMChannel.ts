/**
 * All references and documentation is from Discord.js
 * and Discord API documentations.
 *
 * @see https://discord.js.org/#/docs/main/stable/general/welcome
 * @see https://discord.com/developers/docs/intro
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
