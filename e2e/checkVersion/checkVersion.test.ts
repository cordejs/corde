import pack from "../../package.json";
import cli from "../cliRunner";

describe("Testing version", () => {
  it("Should get correct version using -v", async () => {
    const result = await cli.exec("yarn corde -v");
    expect(result.value).toContain(`v${pack.version}`);
    expect(result.statusCode).toEqual(0);
  });

  it("Should get correct version using --version", async () => {
    const result = await cli.exec("yarn corde --version");
    expect(result.value).toContain(`v${pack.version}`);
    expect(result.statusCode).toEqual(0);
  });
});
