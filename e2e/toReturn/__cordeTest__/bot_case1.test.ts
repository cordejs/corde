import { corde } from "../../../lib";

corde.test("Hello command should return... hello!!", () => {
  corde.expect("hello").toReturn("Hello!!");
});
