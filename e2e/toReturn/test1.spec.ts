import corde from "../../lib";

corde.it("Hello command should return... hello!!", () => {
  corde.expect("hello").toReturn("Hello!!");
});
