/// <reference types="../../src/global" />

it("should fail when attempting to set some permissions to a role", async () => {
  const role = corde.bot.getRole({ name: "random-role" });
  await command("setRolePermission 123 ADMINISTRATOR BAN_MEMBERS").should.setRolePermission(
    role.id,
    "ADMINISTRATOR",
    "BAN_MEMBERS",
  );
});
