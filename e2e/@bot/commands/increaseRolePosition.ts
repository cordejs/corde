import { Message } from "discord.js";
import { getRoleById } from "../utils";

export const increaseRolePosition = {
  action: async (msg: Message, roleId: string | undefined) => {
    const role = getRoleById(msg, roleId);
    if (role) {
      await role.setPosition(role.position + 1);
    }
  },
};
