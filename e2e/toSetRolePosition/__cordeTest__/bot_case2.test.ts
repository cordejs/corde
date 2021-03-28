// @ts-nocheck

import corde from "../../../lib";

corde.test("should fail when increase role position", async () => {
  const role = corde.getRole({ name: "random-role" });
  corde.expect(`increaseRolePosition 123`).toSetRolePosition(role.position + 1, role.id);
});
