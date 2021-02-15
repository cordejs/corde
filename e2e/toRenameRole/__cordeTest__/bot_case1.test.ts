// @ts-nocheck

import corde from "../../../lib";

let role = null;
const newName = "testRole";
const oldName = "old-role-name";

corde.test("", async () => {
  role = corde.getRole({ name: oldName });
  corde.expect(`renameRole ${role.id} ${newName}`).toRenameRole(newName, role.id);
});

corde.afterAll(async () => {
  if (role) {
    await role.updateName(oldName);
  }
});
