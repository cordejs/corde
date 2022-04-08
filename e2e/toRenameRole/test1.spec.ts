/// <reference types="../../src/global" />

import { Role } from "discord.js";

let role: Role = null;
const newName = "testRole";
const oldName = "old-role-name";

it("should rename a role", async () => {
  role = corde.bot.getRole({ name: oldName });
  await command(`renameRole ${role.id} ${newName}`).should.renameRole(newName, role.id);
});

afterAll(async () => {
  if (role) {
    await role.setName(oldName);
  }
});
