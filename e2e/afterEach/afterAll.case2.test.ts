import cli from "../cliRunner";
import { assert, spec } from "../pipeline";
import Utils from "../testUtils";

spec("should print on console in async function", async () => {
  const command = Utils.buildCommandWithConfigPath("afterAll", "bot_case2.test.ts");
  const results = await cli.exec(command);
  assert(results.stdout).toContain("test afterAll");
  assert(results.statusCode).toEqual(0);
});
