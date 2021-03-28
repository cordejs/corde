import { runCLI } from "../cliRunner";

import Utils from "../testUtils";

it("should print on console in async function", async () => {
  const command = Utils.buildCommandWithConfigPath("beforeStart", "bot_case2.test.ts");
  const [mockProcess, stdout] = await runCLI(command);
  expect(mockProcess).toBeCalledWith(0);
  expect(stdout).toMatchSnapshot();
});
