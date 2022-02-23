import { Channel, GuildChannel } from "discord.js";

/**
 * Gets channel's name if it's a GuildChannel
 * @param channel Discord.js channel
 * @returns Channel's name or undefined
 * @internals
 */
export function getChannelName(channel: Channel) {
  if (channel instanceof GuildChannel) {
    return channel.name;
  }
  return undefined;
}
