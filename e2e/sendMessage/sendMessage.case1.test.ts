import cli from "../cliRunner";
import Utils from "../testUtils";

describe("testing sendMessage", () => {
  it("should return the sent message", async () => {
    const command = Utils.buildCommandWithConfigPath("sendMessage", "bot_case1.test.ts");
    const result = await cli.exec(command);
    expect(result.stdout).toContain("TEST MESSAGE");
    expect(result.statusCode).toEqual(0);
  });
});
