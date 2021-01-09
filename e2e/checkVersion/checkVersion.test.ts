import pack from "../../package.json";
import cli from "../cliRunner";

describe("Testing version", () => {
  it("Should get correct version using -v", async () => {
    const result = await cli.exec("-v");
    expect(result.stdout).toContain(`v${pack.version}`);
    expect(result.statusCode).toEqual(0);
  });

  it("Should get correct version using --version", async () => {
    const result = await cli.exec("--version");
    expect(result.stdout).toContain(`v${pack.version}`);
    expect(result.statusCode).toEqual(0);
  });
});
