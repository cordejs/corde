/// <reference types="../../lib/src/global" />

it("should fail when renaming a role", async () => {
  const role = corde.bot.getRole({ name: "old-role-name" });
  await command("renameRole 321 baba").should.renameRole("batata", role.id);
});
