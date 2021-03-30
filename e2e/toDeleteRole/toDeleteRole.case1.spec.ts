import Utils from "../testUtils";
import { runCLI } from "../cliRunner";

it("should delete a role", async () => {
  const command = Utils.buildCommandWithConfigPath("toDeleteRole", "bot_case1.spec.ts");
  const [mockProcess, stdout] = await runCLI(command);
  expect(mockProcess).toBeCalledWith(0);
  expect(stdout).toMatchSnapshot();
});
