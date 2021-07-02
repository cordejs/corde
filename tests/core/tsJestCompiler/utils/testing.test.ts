import { mocked } from "../../../../src/core/tsJestCompiler/utils/testing";

describe("mocked", () => {
  it("should return unmodified input", () => {
    const subject = {};
    expect(mocked(subject)).toBe(subject);
  });
});
