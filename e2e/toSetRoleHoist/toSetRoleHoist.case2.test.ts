import Utils from "../testUtils";
import { runCLI } from "../cliRunner";

it("should change role color", async () => {
  const command = Utils.buildCommandWithConfigPath("toSetRoleHoist", "bot_case2.test.ts");
  const [mockProcess, stdout] = await runCLI(command);
  expect(mockProcess).toBeCalledWith(1);
  expect(stdout).toMatchSnapshot();
});
