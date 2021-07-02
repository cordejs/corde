import { rootLogger } from "../../../../src/core/tsJestCompiler/utils/logger";

jest.unmock("../../../../src/core/tsJestCompiler/utils/logger");

// ths is just a simple test to ensure we do have a logger
describe("rootLogger", () => {
  it("should be a logger", () => {
    expect(typeof rootLogger).toBe("function");
  });
});
