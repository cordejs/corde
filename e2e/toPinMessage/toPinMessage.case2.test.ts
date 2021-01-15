import Utils from "../testUtils";
import { messages } from "../../src/messages";
import cli from "../cliRunner";

describe("testing toPinMessage", () => {
  test("should fail on message pin", async (done) => {
    const command = Utils.buildCommandWithConfigPath("toPinMessage", "bot_case2.test.ts");
    const results = await cli.exec(command);
    expect(results.stdout).toContain(messages.ALL_TESTS_FAIL);
    expect(results.stdout).toContain(messages.FAILURES + " 1");
    expect(results.statusCode).toEqual(1);
    done();
  });
});
