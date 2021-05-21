// @ts-nocheck

import corde from "../../../lib";

let role = null;
const roleName = "random-role";

corde.it("should set role hoist", async () => {
  role = corde.getRole({ name: roleName });
  corde.expect(`setRoleHoist ${role.id}`).toSetRoleHoist(true, role.id);
});

corde.afterAll(async () => {
  if (role) {
    await role.updateHoist(false);
  }
});
