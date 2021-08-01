import corde from "../../lib";

corde.it("should fail attempting to set role mentionable", async () => {
  const role = corde.bot.findRole({ name: "random-role" });
  corde.expect("setRoleHoist 312").toSetRoleHoist(true, role.id);
});
