import { Message } from "discord.js";
import { ICommand } from "../types";
import { getRoleById } from "../utils";

export const deleteRole: ICommand = {
  action: async (msg: Message, roleId: string) => {
    const role = getRoleById(msg, roleId);

    if (role) {
      await role.delete();
    }
  },
};
