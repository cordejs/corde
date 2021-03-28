import { runCLI } from "../cliRunner";
import Utils from "../testUtils";

it("tests should be sucessfull", async () => {
  const command = Utils.buildCommandWithConfigPath("toRenameRole", "bot_case1.test.ts");
  const [mockProcess, stdout] = await runCLI(command);
  expect(mockProcess).toBeCalledWith(0);
  expect(stdout).toMatchSnapshot();
});
