import { corde } from "../../../lib";

corde.test("", () => {
  corde.expect("emoji").toAddReaction("😄");
});
