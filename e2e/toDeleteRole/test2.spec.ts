/// <reference types="../../src/global" />

it("should fail in delete a role", async () => {
  const role = corde.bot.getRole({ name: "role-to-delete" });
  if (!role) {
    return corde.fail();
  }
  await command("deleteRole 1231").should.deleteRole(role.id);
});
