// @ts-nocheck

import corde from "../../../lib";
import { login, getRole, bot } from "../../bot";

let role = null;
const roleName = "role-color";

corde.test("", async () => {
  await login();
  role = getRole(roleName);
  corde.expect(`increaseRolePosition ${role.id}`).toSetRolePosition(role.position + 1, role.id);
});

corde.afterAll(async () => {
  if (role) {
    await role.setPosition(role.position - 1);
  }

  bot.destroy();
});
