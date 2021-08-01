import { Role } from "discord.js";
import corde, { Colors } from "../../lib";
import { bot } from "../bot";

let role: Role;
const roleName = "role-color";
let oldRoleColor = 0;

corde.it("should set role color", async () => {
  role = corde.bot.findRole({ name: roleName });
  oldRoleColor = role.color;
  corde.expect(`changeRoleColor ${role.id} ${Colors.NAVY}`).toSetRoleColor(Colors.NAVY, role.id);
});

corde.afterAll(async () => {
  if (role) {
    await role.setColor(oldRoleColor);
  }

  bot.destroy();
});
