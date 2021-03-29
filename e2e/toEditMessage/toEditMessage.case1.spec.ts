import Utils from "../testUtils";
import { runCLI } from "../cliRunner";

it("should edit a message", async () => {
  const command = Utils.buildCommandWithConfigPath("toEditMessage", "bot_case1.spec.ts");
  const [mockProcess, stdout] = await runCLI(command);
  expect(mockProcess).toBeCalledWith(0);
  expect(stdout).toMatchSnapshot();
});
