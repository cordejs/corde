import pack from "../../package.json";
import cli from "../cliRunner";

describe("Testing version", () => {
  it("Should get correct version", async () => {
    const result = await cli.execCordeCommand("-v");
    expect(result.value).toContain(`v${pack.version}`);
    expect(result.statusCode).toEqual(0);
  });
});
