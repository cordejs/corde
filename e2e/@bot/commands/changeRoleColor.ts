import { ColorResolvable, Message } from "discord.js";
import { getRoleById } from "../utils";

module.exports = {
  name: "changeRoleColor",
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
