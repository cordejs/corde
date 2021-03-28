import corde from "../../../lib";

corde.test("", async () => {
  corde.expect(`removeReaction 321 😄`).toRemoveReaction(["😄"], { id: "12321" });
});
