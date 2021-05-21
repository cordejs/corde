import Utils from "../testUtils";
import { runCLI } from "../cliRunner";

it("should unPin message", async () => {
  const command = Utils.buildCommandWithConfigPath("toUnPinMessage", "bot_case1.spec.ts");
  const [mockProcess, stdout] = await runCLI(command);
  expect(mockProcess).toBeCalledWith(0);
  expect(stdout).toMatchSnapshot();
});
