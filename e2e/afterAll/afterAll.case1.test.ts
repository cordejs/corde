import cli from "../cliRunner";
import Utils from "../testUtils";

describe("testing beforeStart function", () => {
  test("should print on console", async (done) => {
    const command = Utils.buildCommandWithConfigPath("afterAll", "bot_case1.test.ts");
    const results = await cli.exec(command);
    expect(results.stdout).toContain("test afterAll");
    expect(results.statusCode).toEqual(0);
    done();
  });
});
