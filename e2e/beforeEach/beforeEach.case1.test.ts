import { runCLI } from "../cliRunner";
import Utils from "../testUtils";

it("should print on console", async () => {
  const command = Utils.buildCommandWithConfigPath("beforeEach", "bot_case1.spec.ts");
  const [mockProcess] = await runCLI(command);
  expect(mockProcess).toBeCalledWith(0);
});
