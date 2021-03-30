import Utils from "../testUtils";
import { runCLI } from "../cliRunner";

it("should fail", async () => {
  const command = Utils.buildCommandWithConfigPath("toSetRolePermission", "bot_case2.spec.ts");
  const [mockProcess, stdout] = await runCLI(command);
  expect(stdout).toMatchSnapshot();
  expect(mockProcess).toBeCalledWith(1);
});
