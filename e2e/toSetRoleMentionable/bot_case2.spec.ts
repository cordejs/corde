import corde from "../../lib";

corde.it("should fail when attempting to set role mentionable", async () => {
  const role = corde.bot.findRole({ name: "random-role" });
  corde.expect("setRoleMentionable 31").toSetRoleMentionable(true, role.id);
});
