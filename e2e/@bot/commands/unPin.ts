import { Message } from "discord.js";
import { fetchMessageById } from "../utils";

export const unPin = {
  action: async (msg: Message, msgId: string) => {
    const messageToPin = await fetchMessageById(msg, msgId);
    if (messageToPin) {
      await messageToPin.unpin();
    }
  },
};
