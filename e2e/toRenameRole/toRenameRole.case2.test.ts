import cli from "../cliRunner";
import { messages } from "../../src/messages";
import Utils from "../testUtils";
import { assert, spec } from "../pipeline";

spec("tests should be not be sucessfull", async () => {
  const command = Utils.buildCommandWithConfigPath("toRenameRole", "bot_case2.test.ts");
  const results = await cli.exec(command);
  assert(results.stdout).toContain(messages.ALL_TESTS_FAIL);
  assert(results.stdout).toContain(messages.FAILURES + " 1");
  assert(results.statusCode).toEqual(1);
});
