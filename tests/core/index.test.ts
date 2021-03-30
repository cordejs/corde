import { CordeBot } from "../../src/core/cordeBot";

describe("Testing exports of common index", () => {
  it("Should import successfully CordeBot", () => {
    expect(CordeBot).toBeTruthy();
  });
});
