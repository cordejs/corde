describe("testing import of types", () => {
  it("should import types with success", () => {
    const types = require("../../src/types");
    expect(types).toBeTruthy();
  });
});
