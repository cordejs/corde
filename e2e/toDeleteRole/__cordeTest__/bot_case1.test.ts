// @ts-nocheck

import corde from "../../../lib";
import { login, getRole, bot, getRoleManager } from "../../bot";

let role = null;
const roleName = "role-to-delete";

corde.test("", async () => {
  await login();
  role = getRole(roleName);
  corde.expect(`deleteRole ${role.id}`).toDeleteRole(role.id);
});

corde.afterAll(async () => {
  await getRoleManager().create({
    data: {
      name: roleName,
    },
  });
  bot.destroy();
});
