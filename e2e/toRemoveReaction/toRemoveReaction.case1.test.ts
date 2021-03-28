import Utils from "../testUtils";
import { runCLI } from "../cliRunner";

it("should remove a message Reaction", async () => {
  const command = Utils.buildCommandWithConfigPath("toRemoveReaction", "bot_case1.test.ts");
  const [mockProcess, stdout] = await runCLI(command);
  expect(mockProcess).toBeCalledWith(0);
  expect(stdout).toMatchSnapshot();
});
