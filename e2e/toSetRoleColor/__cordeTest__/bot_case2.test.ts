// @ts-nocheck

import corde, { Colors } from "../../../lib";
import { login, getRole, bot } from "../../bot";

let role = null;
const roleName = "role-color";
let oldRoleColor = 0;

corde.test("", async () => {
  await login();
  role = getRole(roleName);
  oldRoleColor = role.color;
  corde.expect(`changeRoleColor ${role.id} ${Colors.NAVY}`).toSetRoleColor(Colors.PURPLE, role.id);
});

corde.afterAll(async () => {
  if (role) {
    await role.setColor(oldRoleColor);
  }

  bot.destroy();
});
