import { command } from "../../src/command";
import { group, test } from "../../src/closures";

import consts from "./constsNames";

group(consts.GROUP_1, () => {
  test(consts.TEST_1, () => {
    command(consts.COMMAND_1).shouldReturn(consts.COMMAND_RESPONSE_1);
  });
});

group(consts.GROUP_2, () => {
  test(consts.TEST_2, () => {
    command(consts.COMMAND_1).shouldReturn(consts.COMMAND_RESPONSE_1);
  });
});
