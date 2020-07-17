import { test, command } from "../../src/building";
import consts from "./constsNames";

test(consts.TEST_1, () => {
  expect(consts.COMMAND_1).shouldReturn(consts.COMMAND_RESPONSE_1);
});
