import { Message } from "discord.js";
import { getRoleById } from "../utils";

export const renameRole = {
  action: async (msg: Message, roleId: string, newName: string | undefined) => {
    if (!newName) {
      return;
    }

    const role = getRoleById(msg, roleId);
    if (role) {
      await role.setName(newName);
    }
  },
};
