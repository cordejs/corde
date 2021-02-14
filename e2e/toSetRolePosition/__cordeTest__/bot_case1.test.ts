// @ts-nocheck

import corde from "../../../lib";
import { bot } from "../../bot";

let role = null;
const roleName = "role-color";

corde.test("", async () => {
  role = corde.getRole({ name: roleName });
  corde.expect(`increaseRolePosition ${role.id}`).toSetRolePosition(role.position + 1, role.id);
});

corde.afterAll(async () => {
  if (role) {
    await role.updatePosition(role.position - 1);
  }

  bot.destroy();
});
