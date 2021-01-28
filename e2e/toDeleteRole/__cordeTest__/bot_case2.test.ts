// @ts-nocheck

import corde from "../../../lib";
import { login, getRole, bot } from "../../bot";

let role = null;
const roleName = "role-to-delete";

corde.test("", async () => {
  await login();
  role = getRole(roleName);
  corde.expect(`deleteRole abc`).toDeleteRole(role.id);
});

corde.afterAll(async () => {
  bot.destroy();
});
