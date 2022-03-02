import { Message } from "discord.js";

module.exports = {
  name: "hello",
  action: async (msg: Message) => {
    await msg.channel.send("Hello!!");
  },
};
