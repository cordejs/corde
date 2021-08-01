import corde from "../../lib";

corde.it("should fail when renaming a role", async () => {
  const role = corde.bot.findRole({ name: "old-role-name" });
  corde.expect("renameRole 321 baba").toRenameRole("batata", role.id);
});
