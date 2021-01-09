import { messages } from "../../src/messages";
import cli from "../cliRunner";
import Utils from "../testUtils";

test("tests should not be sucessfull", async () => {
  const command = Utils.buildCommandWithConfigPath(
    "--files ./e2e/toReturn/__cordeTest__/bot_case2.test.ts",
  );
  const results = await cli.exec(command);
  expect(results.stdout).toContain(messages.ALL_TESTS_FAIL);
  expect(results.stdout).toContain(messages.FAILURES + " 1");
  expect(results.statusCode).toBe(1);
}, 10000);
