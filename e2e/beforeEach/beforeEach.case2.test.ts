import cli from "../cliRunner";
import { assert, spec } from "../pipeline";
import Utils from "../testUtils";

spec("should print on console", async () => {
  const command = Utils.buildCommandWithConfigPath("beforeEach", "bot_case2.test.ts");
  const results = await cli.exec(command);
  assert(results.stdout).toContain("test beforeEach");
  assert(results.statusCode).toEqual(0);
});
