// @ts-nocheck

import corde from "../../../lib";
import { login, getRole, bot } from "../../bot";

let role = null;
const newName = "testRole";
const oldName = "old-role-name";

corde.test("", async () => {
  await login();
  role = getRole(oldName);
  corde.expect(`renameRole ${role.id} ${newName}`).toRenameRole("batata", role.id);
});

corde.afterAll(async () => {
  if (role) {
    await role.setName(oldName);
  }

  bot.destroy();
});
