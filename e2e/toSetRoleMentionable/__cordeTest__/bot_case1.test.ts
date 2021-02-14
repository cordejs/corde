// @ts-nocheck

import corde from "../../../lib";
import { bot } from "../../bot";

let role = null;
const roleName = "role-color";

corde.test("", async () => {
  role = corde.getRole({ name: roleName });
  corde.expect(`setRoleMentionable ${role.id}`).toSetRoleMentionable(true, role.id);
});

corde.afterAll(async () => {
  if (role) {
    await role.updateMentionable(false);
  }
});
