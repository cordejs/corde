import { expect as cordeExpect, test as cordeTest } from "../../../lib";

cordeTest("Hello command should return... hello!!", () => {
  cordeExpect("hello").toReturn("Hello!!");
});
