import { Role } from "discord.js";
import corde from "../../lib";

let role: Role = null;
const roleName = "role-color";

corde.it("should set some permitions for a role", async () => {
  role = corde.bot.findRole({ name: roleName });
  corde
    .expect(`setRolePermission ${role.id} ADMINISTRATOR BAN_MEMBERS`)
    .toSetRolePermission(role.id, "ADMINISTRATOR", "BAN_MEMBERS");
});

corde.afterAll(async () => {
  if (role) {
    await role.setPermissions([]);
  }
});
