import { testCollector } from "../../src/common/testCollector";
import { ITestReport } from "../../src/types";

describe("testing testCollector", () => {
  it("should clear testsFunctions", () => {
    testCollector.isInsideGroupClausure = true;
    testCollector.addTestFunction(() => {
      const report: ITestReport = {
        testName: "",
        pass: true,
      };
      return Promise.resolve(report);
    });
    expect(testCollector.cloneTestFunctions().length).toBe(1);
    testCollector.clearTestFunctions();
    expect(testCollector.cloneTestFunctions().length).toBe(0);
  });
});
