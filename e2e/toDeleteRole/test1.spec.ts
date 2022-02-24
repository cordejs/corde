/* eslint-disable @typescript-eslint/ban-ts-comment */

/// <reference types="../../lib/src/global" />

let role = null;
const roleName = "role-to-delete";

beforeAll(async () => {
  role = corde.bot.getRole({ name: roleName });
  if (!role) {
    role = await corde.bot.createRole({
      name: roleName,
    });
  }
});

it("should delete a role", async () => {
  role = role || corde.bot.getRole({ name: roleName });

  if (!role) {
    throw new Error("Role not found");
  }

  command(`deleteRole ${role.id}`).should.deleteRole(role.id);
});

afterAll(async () => {
  await corde.bot.createRole({
    name: roleName,
  });
});
