import cli from "../cliRunner";
import { messages } from "../../src/messages";
import Utils from "../testUtils";

describe("testing toAddReaction function", () => {
  test("tests should fail", async (done) => {
    const command = Utils.buildCommandWithConfigPath("toAddReaction", "bot_case2.test.ts");
    const results = await cli.exec(command);
    expect(results.stdout).toContain(messages.ALL_TESTS_FAIL);
    expect(results.stdout).toContain(messages.FAILURES + " 1");
    expect(results.statusCode).toEqual(0);
    done();
  });
});
