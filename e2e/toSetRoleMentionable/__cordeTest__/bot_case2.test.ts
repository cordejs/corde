// @ts-nocheck

import corde from "../../../lib";

corde.test("", async () => {
  const role = corde.getRole({ name: "random-role" });
  corde.expect(`setRoleMentionable 31`).toSetRoleMentionable(true, role.id);
});
