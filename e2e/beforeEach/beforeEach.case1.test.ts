import { runCLI } from "../cliRunner";
import Utils from "../testUtils";

it("should print on console", async () => {
  const command = Utils.buildCommandWithConfigPath("beforeEach", "bot_case1.test.ts");
  const results = await cli.exec(command);
  expect(results.stdout).toContain("test beforeEach");
  expect(results.statusCode).toEqual(0);
});
