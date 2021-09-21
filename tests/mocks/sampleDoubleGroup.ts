/// <reference types="../../src/global" />

import consts from "./constsNames";

describe(consts.GROUP_1, () => {
  it(consts.TEST_1, () => {
    command(consts.COMMAND_1).shouldReturn(consts.COMMAND_RESPONSE_1);
  });
});

describe(consts.GROUP_2, () => {
  it(consts.TEST_2, () => {
    command(consts.COMMAND_1).shouldReturn(consts.COMMAND_RESPONSE_1);
  });
});
