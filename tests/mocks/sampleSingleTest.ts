import { test } from "../../src/closures";
import { command } from "../../src/command";

import consts from "./constsNames";

test(consts.TEST_1, () => {
  command(consts.COMMAND_1).shouldReturn(consts.COMMAND_RESPONSE_1);
});
