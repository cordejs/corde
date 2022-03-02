/// <reference types="../../lib/src/global" />

import { Role } from "discord.js";

let role: Role = null;
const roleName = "random-role";

it("should set role hoist", async () => {
  role = corde.bot.getRole({ name: roleName });
  command(`setRoleHoist ${role.id}`).should.setRoleHoist(true, role.id);
});

afterAll(async () => {
  if (role) {
    await role.setHoist(false);
  }
});
