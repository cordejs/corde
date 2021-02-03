import cli from "../cliRunner";
import Utils from "../testUtils";
import { spec, assert } from "../pipeline";

spec("testing beforeStart function", async () => {
  const command = Utils.buildCommandWithConfigPath("afterAll", "bot_case2.test.ts");
  const results = await cli.exec(command);
  assert(results.stdout).toContain("test afterAll");
  assert(results.statusCode).toEqual(0);
});
