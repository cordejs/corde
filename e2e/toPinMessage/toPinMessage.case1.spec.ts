import Utils from "../testUtils";
import { runCLI } from "../cliRunner";

it("should pin message", async () => {
  const command = Utils.buildCommandWithConfigPath("toPinMessage", "bot_case1.spec.ts");
  const [mockProcess, stdout] = await runCLI(command);
  expect(mockProcess).toBeCalledWith(0);
  expect(stdout).toMatchSnapshot();
});
