import { Config } from "../../src/core/Config";
import runtime from "../../src/core/runtime";

describe("Define tests for index of common module", () => {
  it("Should import runtime", () => {
    expect(runtime).toBeTruthy();
  });

  it("Should import Config", () => {
    expect(Config).toBeTruthy();
  });

  it("Should import testCollector", () => {
    expect(runtime.testCollector).toBeTruthy();
  });
});
