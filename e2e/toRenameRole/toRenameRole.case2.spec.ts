import { runCLI } from "../cliRunner";
import Utils from "../testUtils";

it("tests should be not be sucessfull", async () => {
  const command = Utils.buildCommandWithConfigPath("toRenameRole", "bot_case2.spec.ts");
  const [mockProcess, stdout] = await runCLI(command);
  expect(mockProcess).toBeCalledWith(1);
  expect(stdout).toMatchSnapshot();
});
