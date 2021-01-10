import cli from "../cliRunner";
import Utils from "../testUtils";

describe("testing beforeStart function", () => {
  test("should print on console in async function", async (done) => {
    const command = Utils.buildCommandWithConfigPath("beforeStart", "bot_case2.test.ts");
    const results = await cli.exec(command);
    expect(results.stdout).toContain("test beforeStart");
    expect(results.statusCode).toEqual(0);
    done();
  });
});
