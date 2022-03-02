import { Message } from "discord.js";

module.exports = {
  name: "emoji",
  action: async (msg: Message) => {
    await msg.react("😄");
  },
};
