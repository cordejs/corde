// @ts-nocheck

import corde from "../../../lib";
import { login, getRole, bot } from "../../bot";

let role = null;
const roleName = "role-color";

corde.test("", async () => {
  await login();
  role = getRole(roleName);
  corde
    .expect(`setRolePermission ${role.id} ADMINISTRATOR BAN_MEMBERS`)
    .toSetRolePermission("11", "ADMINISTRATOR", "BAN_MEMBERS");
});

corde.afterAll(async () => {
  if (role) {
    await role.setPermissions([]);
  }
  bot.destroy();
});
