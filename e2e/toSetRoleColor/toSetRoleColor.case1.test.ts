import Utils from "../testUtils";
import { runCLI } from "../cliRunner";

it("should change role color", async () => {
  const command = Utils.buildCommandWithConfigPath("toSetRoleColor", "bot_case1.test.ts");
  const [mockProcess, stdout] = await runCLI(command);
  expect(mockProcess).toBeCalledWith(0);
  expect(stdout).toMatchSnapshot();
});
