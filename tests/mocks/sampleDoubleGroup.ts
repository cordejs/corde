import * as corde from "../../src";
import consts from "./constsNames";

corde.describe(consts.GROUP_1, () => {
  corde.it(consts.TEST_1, () => {
    corde.command(consts.COMMAND_1).shouldReturn(consts.COMMAND_RESPONSE_1);
  });
});

corde.describe(consts.GROUP_2, () => {
  corde.it(consts.TEST_2, () => {
    corde.command(consts.COMMAND_1).shouldReturn(consts.COMMAND_RESPONSE_1);
  });
});
