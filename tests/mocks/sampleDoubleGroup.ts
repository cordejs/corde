import { group, test, command } from "../../src/building";
import consts from "./constsNames";

group(consts.GROUP_1, () => {
  test(consts.TEST_1, () => {
    expect(consts.COMMAND_1).shouldReturn(consts.COMMAND_RESPONSE_1);
  });
});

group(consts.GROUP_1, () => {
  test(consts.TEST_1, () => {
    expect(consts.COMMAND_1).shouldReturn(consts.COMMAND_RESPONSE_1);
  });
});
