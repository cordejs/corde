/// <reference types="../../lib/src/global" />

import { Role } from "discord.js";
import { bot } from "../bot";
import { Colors } from "../../lib";

let role: Role;
const roleName = "role-color";
let oldRoleColor = 0;

it("should set role color", async () => {
  role = corde.bot.getRole({ name: roleName });
  oldRoleColor = role.color;
  await command(`changeRoleColor ${role.id} ${Colors.NAVY}`).should.setRoleColor(
    Colors.NAVY,
    role.id,
  );
});

afterAll(async () => {
  if (role) {
    await role.setColor(oldRoleColor);
  }

  bot.destroy();
});
