import corde from "../../src";
import consts from "./constsNames";

corde.it(consts.TEST_1, () => {
  corde.expect(consts.COMMAND_1).toReturn(consts.COMMAND_RESPONSE_1);
});
