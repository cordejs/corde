import corde from "../../lib";

corde.it("should fail in add reaction to a message", () => {
  // Intentionally wrong command
  corde.expect("emoj").toAddReaction(["😎"]);
});
