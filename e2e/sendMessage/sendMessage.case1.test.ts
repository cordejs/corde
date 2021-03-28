import { runCLI } from "../cliRunner";

import Utils from "../testUtils";

it("should return the sent message", async () => {
  const command = Utils.buildCommandWithConfigPath("sendMessage", "bot_case1.test.ts");
  const [mockProcess, stdout] = await runCLI(command);
  expect(mockProcess).toBeCalledWith(0);
  expect(stdout).toMatchSnapshot();
});
