import { expect as cordeExpect, group } from "../../src/api";
import consts from "./constsNames";

group(consts.GROUP_1, () => {
  cordeExpect(consts.COMMAND_1).toReturn(consts.COMMAND_RESPONSE_1);
});
