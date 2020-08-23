import { group, test, expect } from "../../src/api";
import consts from "./constsNames";

group(consts.GROUP_1, () => {
  test(consts.TEST_1, () => {
    expect(consts.COMMAND_1).toReturn(consts.COMMAND_RESPONSE_1);
  });
});

group(consts.GROUP_1, () => {
  test(consts.TEST_1, () => {
    expect(consts.COMMAND_1).toReturn(consts.COMMAND_RESPONSE_1);
  });
});
