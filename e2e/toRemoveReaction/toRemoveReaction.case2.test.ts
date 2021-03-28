import Utils from "../testUtils";
import { runCLI } from "../cliRunner";

it("should not a message Reaction", async () => {
  const command = Utils.buildCommandWithConfigPath("toRemoveReaction", "bot_case2.test.ts");
  const [mockProcess, stdout] = await runCLI(command);
  expect(mockProcess).toBeCalledWith(1);
  expect(stdout).toMatchSnapshot();
});
