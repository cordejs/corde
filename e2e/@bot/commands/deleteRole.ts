import { Message } from "discord.js";
import { getRoleById } from "../utils";

module.exports = {
  name: "deleteRole",
  action: async (msg: Message, roleId: string) => {
    const role = getRoleById(msg, roleId);

    if (role && !role.deleted) {
      await role.delete();
    }
  },
};
