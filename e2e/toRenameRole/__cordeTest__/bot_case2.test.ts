// @ts-nocheck

import corde from "../../../lib";

corde.test("should fail when renaming a role", async () => {
  const role = corde.getRole({ name: "old-role-name" });
  corde.expect(`renameRole 321 baba`).toRenameRole("batata", role.id);
});
