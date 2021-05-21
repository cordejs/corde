import Utils from "../testUtils";
import { runCLI } from "../cliRunner";

it("should fail on message edition", async () => {
  const command = Utils.buildCommandWithConfigPath("toEditMessage", "bot_case2.spec.ts");
  const [mockProcess, stdout] = await runCLI(command);
  expect(mockProcess).toBeCalledWith(1);
  expect(stdout).toMatchSnapshot();
});
