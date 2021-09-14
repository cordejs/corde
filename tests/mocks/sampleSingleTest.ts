import * as corde from "../../src";
import consts from "./constsNames";

corde.it(consts.TEST_1, () => {
  corde.command(consts.COMMAND_1).shouldReturn(consts.COMMAND_RESPONSE_1);
});
