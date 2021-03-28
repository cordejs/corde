import { runCLI } from "../cliRunner";
import Utils from "../testUtils";

it("should print on console", async () => {
  const command = Utils.buildCommandWithConfigPath("afterAll", "bot_case1.test.ts");
  const [mockProcess, stdout] = await runCLI(command);
  expect(mockProcess).toBeCalledWith(0);
  expect(stdout).toMatchSnapshot();
});
