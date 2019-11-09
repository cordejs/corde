import * as Discord from "discord.js";

export class ChannelUtil {
    static convertToTextChannel(channel: Discord.Channel): Discord.TextChannel {
        return channel as Discord.TextChannel;
    }

    static isTextChannel(channel: Discord.Channel): boolean {
        return !((channel): channel is Discord.TextChannel => channel.type === "text")(
            channel
        )
    }
}