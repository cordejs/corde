/// <reference types="../../lib/src/global" />

it("should fail attempting to set role mentionable", async () => {
  const role = corde.bot.getRole({ name: "random-role" });
  await command("setRoleHoist 312").should.setRoleHoist(true, role.id);
});
