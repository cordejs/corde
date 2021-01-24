import Utils from "../testUtils";
import { messages } from "../../src/messages";
import cli from "../cliRunner";

describe("testing toSetRolePosition", () => {
  test("should set role as mentionable", async (done) => {
    const command = Utils.buildCommandWithConfigPath("toSetRolePosition", "bot_case1.test.ts");
    const results = await cli.exec(command);
    expect(results.stdout).toContain(messages.ALL_TESTS_PASSED);
    expect(results.stdout).toContain(messages.TOTAL + " 1");
    expect(results.statusCode).toEqual(0);
    done();
  });
});
