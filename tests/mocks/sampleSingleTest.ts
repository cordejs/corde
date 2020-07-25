import { test, expect as cordeExpect } from "../../src/api";
import consts from "./constsNames";
import { Group } from "../../src/interfaces";

export const sampleSingleTestGroup: Group[] = [
  {
    tests: [
      {
        testsFunctions: [expect.any(Function)],
        name: consts.TEST_1,
      },
    ],
  },
];

test(consts.TEST_1, () => {
  cordeExpect(consts.COMMAND_1).toReturn(consts.COMMAND_RESPONSE_1);
});
