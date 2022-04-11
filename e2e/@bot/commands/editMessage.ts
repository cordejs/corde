import { Message } from "discord.js";
import { ICommand } from "../types";
import { fetchMessageById } from "../utils";

export const editMessage: ICommand = {
  action: async (msg: Message, msgId: string, reaction: string) => {
    const message = await fetchMessageById(msg, msgId);
    if (message) {
      await message.react(reaction);
    }
  },
};
