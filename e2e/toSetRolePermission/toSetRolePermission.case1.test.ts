import Utils from "../testUtils";
import { runCLI } from "../cliRunner";

it("should set role permissions", async () => {
  const command = Utils.buildCommandWithConfigPath("toSetRolePermission", "bot_case1.test.ts");
  const [mockProcess, stdout] = await runCLI(command);
  expect(mockProcess).toBeCalledWith(0);
  expect(stdout).toMatchSnapshot();
});
