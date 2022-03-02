import { Message } from "discord.js";

module.exports = {
  name: "sendMultiple",
  action: async (msg: Message, channelId: string) => {
    await msg.channel.send("hello");

    if (msg.guild) {
      const channel = msg.guild.channels.cache.get(channelId);
      if (channel && channel.isText()) {
        await channel.send("hello2");
      }
    }
  },
};
