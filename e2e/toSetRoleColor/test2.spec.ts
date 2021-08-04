import corde, { Colors } from "../../lib";

corde.it("should fail when setting role color", async () => {
  const role = corde.bot.findRole({ name: "random-role" });
  corde.expect(`changeRoleColor 321 ${Colors.NAVY}`).toSetRoleColor(Colors.NAVY, role.id);
});
