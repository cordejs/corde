import { runCLI } from "../cliRunner";
import Utils from "../testUtils";

it("should print on console in async function", async () => {
  const command = Utils.buildCommandWithConfigPath("afterAll", "bot_case2.spec.ts");
  const [mockProcess] = await runCLI(command);
  expect(mockProcess).toBeCalledWith(0);
});
