/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import corde from "../../lib";

let role = null;
const roleName = "role-to-delete";

corde.beforeStart(async () => {
  role = corde.getRole({ name: roleName });
  if (!role) {
    role = await corde.createRole({
      name: roleName,
    });
  }
});

corde.it("should delete a role", async () => {
  role = role || corde.getRole({ name: roleName });

  if (!role) {
    throw new Error("Role not found");
  }

  corde.expect(`deleteRole ${role.id}`).toDeleteRole(role.id);
});

corde.afterAll(async () => {
  await corde.createRole({
    name: roleName,
  });
});
