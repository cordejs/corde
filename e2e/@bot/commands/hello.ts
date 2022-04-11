import { Message } from "discord.js";

export const hello = {
  action: async (msg: Message) => {
    await msg.channel.send("Hello!!");
  },
};
