/// <reference types="../../lib/src/global" />

import { Colors } from "../../lib";

it("should fail when setting role color", async () => {
  const role = corde.bot.getRole({ name: "random-role" });
  await command(`changeRoleColor 321 ${Colors.NAVY}`).should.setRoleColor(Colors.NAVY, role.id);
});
