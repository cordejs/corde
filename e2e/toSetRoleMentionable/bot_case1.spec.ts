import { Role } from "discord.js";
import corde from "../../lib";

let role: Role = null;
const roleName = "role-color";

corde.it("should set role mentionable", async () => {
  role = corde.bot.findRole({ name: roleName });
  corde.expect(`setRoleMentionable ${role.id}`).toSetRoleMentionable(true, role.id);
});

corde.afterAll(async () => {
  if (role) {
    await role.setMentionable(false);
  }
});
