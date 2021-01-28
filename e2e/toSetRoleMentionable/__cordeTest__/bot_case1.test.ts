// @ts-nocheck

import corde from "../../../lib";
import { login, getRole, bot } from "../../bot";

let role = null;
const roleName = "role-color";

corde.test("", async () => {
  await login();
  role = getRole(roleName);
  corde.expect(`setRoleMentionable ${role.id}`).toSetRoleMentionable(true, role.id);
});

corde.afterAll(async () => {
  if (role) {
    await role.setMentionable(false);
  }

  bot.destroy();
});
