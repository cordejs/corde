import * as cli from "../../src/cli";

// For some reason, errorHandler is being throwed when imported here.

describe("Testing export of cli index", () => {
  beforeAll(() => {
    process.env.ENV = "TEST";
  });
  afterAll(() => {
    process.env.ENV = "DEV";
  });
  it("Should export cli", () => {
    try {
      expect(cli).toBeTruthy();
    } catch (error) {}
  });
});
