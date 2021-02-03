import cli from "../cliRunner";
import { messages } from "../../src/messages";
import Utils from "../testUtils";
import { assert, spec } from "../pipeline";

spec("tests should be sucessfull", async () => {
  const command = Utils.buildCommandWithConfigPath("toAddReaction", "bot_case1.test.ts");
  const results = await cli.exec(command);
  assert(results.stdout).toContain(messages.ALL_TESTS_PASSED);
  assert(results.stdout).toContain(messages.TOTAL + " 1");
  assert(results.statusCode).toEqual(0);
});
