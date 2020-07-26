import { test, expect as cordeExpect } from "../../src/api";
import consts from "./constsNames";

test(consts.TEST_1, () => {
  cordeExpect(consts.COMMAND_1).toReturn(consts.COMMAND_RESPONSE_1);
});
