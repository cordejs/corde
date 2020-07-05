import { CordeBotClient } from "../../src/core";

describe("Testing exports of common index", () => {
  it("Should import sucessfuly CordeBot", () => {
    expect(CordeBotClient).toBeTruthy();
  });
});
