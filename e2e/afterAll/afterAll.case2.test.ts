import { runCLI } from "../cliRunner";
import Utils from "../testUtils";

it("testing afterAll function in bot_case1 (should be fail)", async () => {
  const command = Utils.buildCommandWithConfigPath("afterAll", "bot_case2.test.ts");
  const [mockProcess, stdout] = await runCLI(command);
  expect(mockProcess).toBeCalledWith(1);
  expect(stdout).toMatchSnapshot();
});
