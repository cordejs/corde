import Utils from "../testUtils";
import { runCLI } from "../cliRunner";

it("should set role permissions", async () => {
  const command = Utils.buildCommandWithConfigPath("toSetRolePermission", "bot_case1.test.ts");
  const [mockProcess, stdout] = await runCLI(command);
  expect(stdout).toMatchSnapshot();
  expect(mockProcess).toBeCalledWith(0);
});
