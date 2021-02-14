// @ts-nocheck

import corde from "../../../lib";

corde.test("", async () => {
  const role = corde.getRole({ name: "random-role" });
  corde.expect(`setRoleHoist 312`).toSetRoleHoist(true, role.id);
});
