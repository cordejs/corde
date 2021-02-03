import Utils from "../testUtils";
import { messages } from "../../src/messages";
import cli from "../cliRunner";
import { assert, spec } from "../pipeline";

spec("should change role color", async () => {
  const command = Utils.buildCommandWithConfigPath("toSetRoleColor", "bot_case1.test.ts");
  const results = await cli.exec(command);
  assert(results.stdout).toContain(messages.ALL_TESTS_PASSED);
  assert(results.stdout).toContain(messages.TOTAL + " 1");
  assert(results.statusCode).toEqual(0);
});
