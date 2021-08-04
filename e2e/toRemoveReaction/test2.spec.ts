import corde from "../../lib";

corde.it("should fail when trying to remove a reaction from a role", async () => {
  corde.expect("removeReaction 321 😄").toRemoveReaction(["😄"], { id: "12321" });
});
