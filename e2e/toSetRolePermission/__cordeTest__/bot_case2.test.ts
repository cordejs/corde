// @ts-nocheck

import corde from "../../../lib";

corde.test("", async () => {
  const role = corde.getRole({ name: "random-role" });
  corde
    .expect(`setRolePermission 123 ADMINISTRATOR BAN_MEMBERS`)
    .toSetRolePermission(role.id, "ADMINISTRATOR", "BAN_MEMBERS");
});
