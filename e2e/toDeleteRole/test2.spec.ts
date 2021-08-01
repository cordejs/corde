import corde from "../../lib";

corde.it("should fail in delete a role", async () => {
  const role = corde.bot.findRole({ name: "role-to-delete" });
  corde.expect("deleteRole 1231").toDeleteRole(role.id);
});
