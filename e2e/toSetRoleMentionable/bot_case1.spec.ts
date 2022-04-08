/// <reference types="../../src/global" />

import { Role } from "discord.js";

let role: Role = null;
const roleName = "role-color";

it("should set role mentionable", async () => {
  role = corde.bot.getRole({ name: roleName });
  await command(`setRoleMentionable ${role.id}`).should.setRoleMentionable(true, role.id);
});

afterAll(async () => {
  if (role) {
    await role.setMentionable(false);
  }
});
