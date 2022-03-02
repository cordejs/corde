/// <reference types="../../lib/src/global" />

import { Role } from "discord.js";

let role: Role = null;
const roleName = "role-color";

it("should set some permissions for a role", async () => {
  role = corde.bot.getRole({ name: roleName });
  await command(`setRolePermission ${role.id} ADMINISTRATOR BAN_MEMBERS`).should.setRolePermission(
    role.id,
    "ADMINISTRATOR",
    "BAN_MEMBERS",
  );
});

afterAll(async () => {
  if (role) {
    await role.setPermissions([]);
  }
});
