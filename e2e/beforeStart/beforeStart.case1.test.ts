import { runCLI } from "../cliRunner";

import Utils from "../testUtils";

it("should print on console", async () => {
  const command = Utils.buildCommandWithConfigPath("beforeStart", "bot_case1.test.ts");
  const [mockProcess] = await runCLI(command);
  expect(mockProcess).toBeCalledWith(0);
});
