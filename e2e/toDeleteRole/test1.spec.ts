/* eslint-disable @typescript-eslint/ban-ts-comment */

import corde from "../../lib";

let role = null;
const roleName = "role-to-delete";

corde.beforeAll(async () => {
  role = corde.bot.getRole({ name: roleName });
  if (!role) {
    role = await corde.bot.createRole({
      name: roleName,
    });
  }
});

corde.it("should delete a role", async () => {
  role = role || corde.bot.getRole({ name: roleName });

  if (!role) {
    throw new Error("Role not found");
  }

  corde.expect(`deleteRole ${role.id}`).toDeleteRole(role.id);
});

corde.afterAll(async () => {
  await corde.bot.createRole({
    name: roleName,
  });
});
