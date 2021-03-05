import { testCollector } from "../../src/common";
import { TestReport } from "../../src/types";

describe("testing testCollector", () => {
  it("should clear testsFunctions", () => {
    testCollector.isInsideGroupClausure = true;
    testCollector.addTestFunction((corde) => {
      const report: TestReport = {
        commandName: "",
        expectation: "",
        hasPassed: true,
        isNot: true,
        output: "",
      };
      return Promise.resolve(report);
    });
    expect(testCollector.cloneTestFunctions().length).toBe(1);
    testCollector.clearTestFunctions();
    expect(testCollector.cloneTestFunctions().length).toBe(0);
  });
});
