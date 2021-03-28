import corde from "../../../lib";

corde.test("should add reaction to a message", () => {
  corde.expect("emoji").toAddReaction(["😄"]);
});
