import { Message } from "discord.js";
import { ICommand } from "../types";

export const emoji: ICommand = {
  action: async (msg: Message) => {
    await msg.react("😄");
  },
};
