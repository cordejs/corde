/// <reference types="../../src/global" />

import consts from "./constsNames";

it(consts.TEST_1, () => {
  command(consts.COMMAND_1).shouldReturn(consts.COMMAND_RESPONSE_1);
});
