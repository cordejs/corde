import { Message } from "discord.js";
import { getRoleById } from "../utils";

module.exports = {
  name: "setRolePermission",
  action: async (msg: Message, roleId: string | undefined, permissions: any) => {
    const role = getRoleById(msg, roleId);
    if (role) {
      await role.setPermissions(permissions);
    }
  },
};
