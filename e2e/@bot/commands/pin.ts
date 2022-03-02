import { Message } from "discord.js";
import { fetchMessageById } from "../utils";

module.exports = {
  name: "pin",
  action: async (msg: Message, msgId: string) => {
    const messageToPin = await fetchMessageById(msg, msgId);
    if (messageToPin) {
      await messageToPin.pin();
    }
  },
};
