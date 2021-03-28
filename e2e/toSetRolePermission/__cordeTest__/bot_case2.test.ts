// @ts-nocheck

import corde from "../../../lib";

corde.test("should fail when attempting to set some permitions to a role", async () => {
  const role = corde.getRole({ name: "random-role" });
  corde
    .expect(`setRolePermission 123 ADMINISTRATOR BAN_MEMBERS`)
    .toSetRolePermission(role.id, "ADMINISTRATOR", "BAN_MEMBERS");
});
