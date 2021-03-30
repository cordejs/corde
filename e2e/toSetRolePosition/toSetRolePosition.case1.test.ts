import Utils from "../testUtils";
import { runCLI } from "../cliRunner";

it("should set role as mentionable", async () => {
  const command = Utils.buildCommandWithConfigPath("toSetRolePosition", "bot_case1.spec.ts");
  const [mockProcess, stdout] = await runCLI(command);
  expect(stdout).toMatchSnapshot();
  expect(mockProcess).toBeCalledWith(0);
});
