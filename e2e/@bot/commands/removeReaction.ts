import { Message } from "discord.js";
import { fetchMessageById } from "../utils";

export const removeReaction = {
  action: async (msg: Message, msgId: string, reaction: string) => {
    const message = await fetchMessageById(msg, msgId);

    if (!message) {
      return;
    }

    const react = message.reactions.cache.get(reaction);

    if (react) {
      await react.remove();
    }
  },
};
