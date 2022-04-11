import { ColorResolvable, Message } from "discord.js";
import { ICommand } from "../types";
import { getRoleById } from "../utils";

export const changeRoleColor: ICommand = {
  action: async (msg: Message, roleId: string, newColor: ColorResolvable | undefined) => {
    if (!newColor) {
      return;
    }
    const role = getRoleById(msg, roleId);
    if (role) {
      await role.setColor(newColor);
    }
  },
};
