import Utils from "../testUtils";
import { runCLI } from "../cliRunner";

it("should fail on message pin", async () => {
  const command = Utils.buildCommandWithConfigPath("toPinMessage", "bot_case2.test.ts");
  const [mockProcess, stdout] = await runCLI(command);
  expect(mockProcess).toBeCalledWith(1);
  expect(stdout).toMatchSnapshot();
});
