import { Message } from "discord.js";
import { fetchMessageById } from "../utils";

module.exports = {
  name: "editMessage",
  action: async (msg: Message, msgId: string, reaction: string) => {
    const message = await fetchMessageById(msg, msgId);
    if (message) {
      await message.react(reaction);
    }
  },
};
