// @ts-nocheck

import corde from "../../../lib";

corde.it("should fail attempting to set role mentionable", async () => {
  const role = corde.getRole({ name: "random-role" });
  corde.expect(`setRoleHoist 312`).toSetRoleHoist(true, role.id);
});
