import cli from "../cliRunner";
import Utils from "../testUtils";

describe("testing beforeEach function", () => {
  test("should print on console", async (done) => {
    const command = Utils.buildCommandWithConfigPath("beforeEach", "bot_case2.test.ts");
    const results = await cli.exec(command);
    expect(results.stdout).toContain("test beforeEach");
    expect(results.statusCode).toEqual(0);
    done();
  });
});
