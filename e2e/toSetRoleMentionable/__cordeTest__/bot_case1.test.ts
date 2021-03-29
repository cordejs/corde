// @ts-nocheck

import corde from "../../../lib";

let role = null;
const roleName = "role-color";

corde.it("should set role mentionable", async () => {
  role = corde.getRole({ name: roleName });
  corde.expect(`setRoleMentionable ${role.id}`).toSetRoleMentionable(true, role.id);
});

corde.afterAll(async () => {
  if (role) {
    await role.updateMentionable(false);
  }
});
