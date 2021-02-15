// @ts-nocheck

import corde, { Colors } from "../../../lib";
import { bot } from "../../bot";

let role = null;
const roleName = "role-color";
let oldRoleColor = 0;

corde.test("", async () => {
  role = corde.getRole({ name: roleName });
  oldRoleColor = role.color;
  corde.expect(`changeRoleColor ${role.id} ${Colors.NAVY}`).toSetRoleColor(Colors.NAVY, role.id);
});

corde.afterAll(async () => {
  if (role) {
    await role.updateColor(oldRoleColor);
  }

  bot.destroy();
});
