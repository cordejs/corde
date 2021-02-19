import corde from "../../src";
import consts from "./constsNames";

corde.group(consts.GROUP_1, () => {
  corde.expect(consts.COMMAND_1).toReturn(consts.COMMAND_RESPONSE_1);
});
