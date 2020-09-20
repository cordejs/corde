import { testCollector } from "../../src/common";
import { TestReport } from "../../src/api";

describe("testing testCollector", () => {
  it("should clear testsFunctions", () => {
    testCollector.hasGroup = true;
    testCollector.addTestFunction((corde) => {
      return Promise.resolve(
        new TestReport({
          commandName: "",
          expectation: "",
          hasPassed: true,
          isNot: true,
          output: "",
          showExpectAndOutputValue: false,
        }),
      );
    });
    expect(testCollector.cloneTestFunctions().length).toBe(1);
    testCollector.clearTestFunctions();
    expect(testCollector.cloneTestFunctions().length).toBe(0);
  });
});
