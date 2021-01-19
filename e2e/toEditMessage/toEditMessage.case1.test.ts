import Utils from "../testUtils";
import { messages } from "../../src/messages";
import cli from "../cliRunner";
import { login } from "../bot";

describe("testing toEditMessage", () => {
  test("should edit a message", async (done) => {
    const command = Utils.buildCommandWithConfigPath("toEditMessage", "bot_case1.test.ts");
    const results = await cli.exec(command, true);
    expect(results.stdout).toContain(messages.ALL_TESTS_PASSED);
    expect(results.stdout).toContain(messages.TOTAL + " 1");
    expect(results.statusCode).toEqual(0);
    done();
  });
});
