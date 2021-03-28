import Utils from "../testUtils";
import { runCLI } from "../cliRunner";

it("should fail when trying to set role as mentionable", async () => {
  const command = Utils.buildCommandWithConfigPath("toSetRolePosition", "bot_case2.test.ts");
  const [mockProcess, stdout] = await runCLI(command);
  expect(stdout).toMatchSnapshot();
  expect(mockProcess).toBeCalledWith(1);
});
