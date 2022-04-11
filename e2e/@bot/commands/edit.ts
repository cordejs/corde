import { Message } from "discord.js";
import { ICommand } from "../types";

export const edit: ICommand = {
  action: async (msg: Message) => {
    if (msg) {
      await msg.edit("newValue");
    }
  },
};
