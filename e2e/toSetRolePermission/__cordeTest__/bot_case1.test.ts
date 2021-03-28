// @ts-nocheck

import corde from "../../../lib";

let role = null;
const roleName = "role-color";

corde.test("should set some permitions for a role", async () => {
  role = corde.getRole({ name: roleName });
  corde
    .expect(`setRolePermission ${role.id} ADMINISTRATOR BAN_MEMBERS`)
    .toSetRolePermission(role.id, "ADMINISTRATOR", "BAN_MEMBERS");
});

corde.afterAll(async () => {
  if (role) {
    await role.updatePermissions([]);
  }
});
