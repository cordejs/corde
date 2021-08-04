import { Role } from "discord.js";
import corde from "../../lib";

let role: Role = null;
const newName = "testRole";
const oldName = "old-role-name";

corde.it("should rename a role", async () => {
  role = corde.bot.findRole({ name: oldName });
  corde.expect(`renameRole ${role.id} ${newName}`).toRenameRole(newName, role.id);
});

corde.afterAll(async () => {
  if (role) {
    await role.setName(oldName);
  }
});
