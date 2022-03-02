import { Message } from "discord.js";

module.exports = {
  name: "edit",
  action: async (msg: Message) => {
    if (msg) {
      await msg.edit("newValue");
    }
  },
};
