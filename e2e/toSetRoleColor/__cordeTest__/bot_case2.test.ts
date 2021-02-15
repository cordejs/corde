// @ts-nocheck

import corde, { Colors } from "../../../lib";

corde.test("", async () => {
  const role = corde.getRole({ name: "random-role" });
  corde.expect(`changeRoleColor 321 ${Colors.NAVY}`).toSetRoleColor(Colors.NAVY, role.id);
});
