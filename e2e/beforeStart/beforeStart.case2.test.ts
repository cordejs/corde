import cli from "../cliRunner";
import { assert, spec } from "../pipeline";
import Utils from "../testUtils";

spec("should print on console in async function", async () => {
  const command = Utils.buildCommandWithConfigPath("beforeStart", "bot_case2.test.ts");
  const results = await cli.exec(command);
  assert(results.stdout).toContain("test beforeStart");
  assert(results.statusCode).toEqual(0);
});
