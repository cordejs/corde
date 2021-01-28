import cli from "../cliRunner";
import { messages } from "../../src/messages";
import Utils from "../testUtils";

describe("testing toReturn function", () => {
  test("tests should be sucessfull", async (done) => {
    const command = Utils.buildCommandWithConfigPath("toReturn", "bot_case1.test.ts");
    const results = await cli.exec(command);
    expect(results.stdout).toContain(messages.ALL_TESTS_PASSED);
    expect(results.stdout).toContain(messages.TOTAL + " 1");
    expect(results.statusCode).toEqual(0);
    done();
  });
});
