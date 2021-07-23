import * as api from "../src";

describe("Testing default library export", () => {
  it("Should export all api module", () => {
    expect(api).toBeTruthy();
  });
});
