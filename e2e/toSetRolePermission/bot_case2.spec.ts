import corde from "../../lib";

corde.it("should fail when attempting to set some permitions to a role", async () => {
  const role = corde.bot.findRole({ name: "random-role" });
  corde
    .expect("setRolePermission 123 ADMINISTRATOR BAN_MEMBERS")
    .toSetRolePermission(role.id, "ADMINISTRATOR", "BAN_MEMBERS");
});
