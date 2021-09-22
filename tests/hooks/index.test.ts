import * as hooks from "../../src/hooks";

describe("testing data hooks index", () => {
  it("should export afterAll", () => {
    expect(hooks.afterAll).toBeTruthy();
  });
  it("should export afterEach", () => {
    expect(hooks.afterEach).toBeTruthy();
  });

  it("should export beforeEach", () => {
    expect(hooks.beforeEach).toBeTruthy();
  });

  it("should export beforeStart", () => {
    expect(hooks.beforeAll).toBeTruthy();
  });
});
