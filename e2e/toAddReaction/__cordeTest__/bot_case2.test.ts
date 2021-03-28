import corde from "../../../lib";

corde.test("should fail in add reaction to a message", () => {
  // Intentionally wrong command
  corde.expect("emoj").toAddReaction(["😎"]);
});
