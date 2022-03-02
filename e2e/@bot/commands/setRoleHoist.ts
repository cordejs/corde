import { Message } from "discord.js";
import { getRoleById } from "../utils";

module.exports = {
  name: "setRoleHoist",
  action: async (msg: Message, roleId: string | undefined) => {
    const role = getRoleById(msg, roleId);
    if (role) {
      await role.setHoist(true);
    }
  },
};
