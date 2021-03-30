import corde from "../../../lib";

corde.it("should add reaction to a message", () => {
  corde.expect("emoji").toAddReaction(["😄"]);
});
