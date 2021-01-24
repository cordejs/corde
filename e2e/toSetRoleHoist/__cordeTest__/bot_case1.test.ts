// @ts-nocheck

import corde from "../../../lib";
import { login, getRole, bot } from "../../bot";

let role = null;
const roleName = "role-color";

corde.test("", async () => {
  await login();
  role = getRole(roleName);
  corde.expect(`setRoleHoist ${role.id}`).toSetRoleHoist(true, role.id);
});

corde.afterAll(async () => {
  if (role) {
    await role.setHoist(false);
  }

  bot.destroy();
});
