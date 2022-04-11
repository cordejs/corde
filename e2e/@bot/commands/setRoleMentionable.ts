import { Message } from "discord.js";
import { getRoleById } from "../utils";

export const setRoleMentionable = {
  action: async (msg: Message, roleId: string | undefined) => {
    const role = getRoleById(msg, roleId);
    if (role) {
      await role.setMentionable(true);
    }
  },
};
