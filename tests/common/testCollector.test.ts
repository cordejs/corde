import { testCollector } from "../../src/common";
import { TestReport } from "../../src/types";

describe("testing testCollector", () => {
  it("should clear testsFunctions", () => {
    testCollector.isInsideGroupClausure = true;
    testCollector.addTestFunction((corde) => {
      const report: TestReport = {
        pass: true,
      };
      return Promise.resolve(report);
    });
    expect(testCollector.cloneTestFunctions().length).toBe(1);
    testCollector.clearTestFunctions();
    expect(testCollector.cloneTestFunctions().length).toBe(0);
  });
});
