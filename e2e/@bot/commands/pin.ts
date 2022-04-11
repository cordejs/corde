import { Message } from "discord.js";
import { fetchMessageById } from "../utils";

export const pin = {
  action: async (msg: Message, msgId: string) => {
    const messageToPin = await fetchMessageById(msg, msgId);
    if (messageToPin) {
      await messageToPin.pin();
    }
  },
};
