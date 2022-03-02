import { Message } from "discord.js";
import { getRoleById } from "../utils";

module.exports = {
  name: "increaseRolePosition",
  action: async (msg: Message, roleId: string | undefined) => {
    const role = getRoleById(msg, roleId);
    if (role) {
      await role.setPosition(role.position + 1);
    }
  },
};
