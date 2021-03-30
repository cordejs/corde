// @ts-nocheck

import corde from "../../../lib";

corde.it("should fail in delete a role", async () => {
  const role = corde.getRole({ name: "role-to-delete" });
  corde.expect(`deleteRole 1231`).toDeleteRole(role.id);
});
