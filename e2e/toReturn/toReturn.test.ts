import cli from "../cliRunner";

describe("testing toReturn function", () => {
  it("should get a valid message", async () => {
    await cli.exec(
      "yarn corde --config ./e2e/corde.config.ts --files ./e2e/toReturn/__cordeTest__",
    );
  });
});
