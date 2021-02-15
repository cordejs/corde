import Utils from "../testUtils";
import { messages } from "../../src/messages";
import cli from "../cliRunner";
import { assert, spec } from "../pipeline";

spec("should change role color", async () => {
  const command = Utils.buildCommandWithConfigPath("toSetRoleColor", "bot_case2.test.ts");
  const results = await cli.exec(command);
  assert(results.stdout).toContain(messages.ALL_TESTS_FAIL);
  assert(results.stdout).toContain(messages.FAILURES + " 1");
  assert(results.statusCode).toEqual(1);
});
