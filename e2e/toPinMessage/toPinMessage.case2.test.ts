import Utils from "../testUtils";
import { messages } from "../../src/messages";
import cli from "../cliRunner";
import { assert, spec } from "../pipeline";

spec("should fail on message pin", async () => {
  const command = Utils.buildCommandWithConfigPath("toPinMessage", "bot_case2.test.ts");
  const results = await cli.exec(command);
  assert(results.stdout).toContain(messages.ALL_TESTS_FAIL);
  assert(results.stdout).toContain(messages.FAILURES + " 1");
  assert(results.statusCode).toEqual(1);
});
