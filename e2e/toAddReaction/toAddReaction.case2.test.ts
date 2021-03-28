import { runCLI } from "../cliRunner";
import Utils from "../testUtils";

it("tests should fail", async () => {
  const command = Utils.buildCommandWithConfigPath("toAddReaction", "bot_case2.test.ts");
  const [mockProcess, stdout] = await runCLI(command);
  expect(mockProcess).toBeCalledWith(0);
  expect(stdout).toMatchSnapshot();
});
