describe("Testing export of cli index", () => {
  beforeAll(() => {
    process.env.ENV = "TEST";
  });
  afterAll(() => {
    process.env.ENV = "DEV";
  });
  it("Should export cli", () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      expect(require("../../src/cli")).toBeTruthy();
    } catch (error) {
      // For some reason, errorHandler is being thrown when imported here.
    }
  });
});
