import { group } from "../../src/closures";
import { command } from "../../src/command";

import consts from "./constsNames";

group(consts.GROUP_1, () => {
  command(consts.COMMAND_1).shouldReturn(consts.COMMAND_RESPONSE_1);
});
