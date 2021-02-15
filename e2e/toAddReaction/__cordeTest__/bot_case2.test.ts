import corde from "../../../lib";

corde.test("", () => {
  // Intentionally wrong command
  corde.expect("emoj").toAddReaction("😎");
});
