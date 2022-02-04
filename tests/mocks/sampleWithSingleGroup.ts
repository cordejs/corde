import { test, group } from "../../src/closures";
import { command } from "../../src/command";

import consts from "./constsNames";

group(consts.GROUP_1, () => {
  test(consts.TEST_1, () => {
    command(consts.COMMAND_1).should.respond(consts.COMMAND_RESPONSE_1);
  });
});
