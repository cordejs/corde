import { Role } from "discord.js";
import corde from "../../lib";

let role: Role = null;
const roleName = "random-role";

corde.it("should set role hoist", async () => {
  role = corde.bot.findRole({ name: roleName });
  corde.expect(`setRoleHoist ${role.id}`).toSetRoleHoist(true, role.id);
});

corde.afterAll(async () => {
  if (role) {
    await role.setHoist(false);
  }
});
