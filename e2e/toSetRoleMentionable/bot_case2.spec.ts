/// <reference types="../../lib/src/global" />

it("should fail when attempting to set role mentionable", async () => {
  const role = corde.bot.getRole({ name: "random-role" });
  await command("setRoleMentionable 31").should.setRoleMentionable(true, role.id);
});
