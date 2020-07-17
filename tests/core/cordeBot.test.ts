import { testCollector } from "../../src/common/testColletor";
import { toReturn } from "../../src/api/expectMatches";

describe("Testing CordeBot object", () => {
  beforeEach(() => {
    testCollector.cleanTestFunctions();
  });
  it("Should add a test function", () => {
    testCollector.addTestFunction((corde) => toReturn("test", false, corde, "com"));
    expect(testCollector.cloneTestFunctions().length).toBe(1);
  });

  it("Should not add a test function", () => {
    testCollector.addTestFunction(null);
    expect(testCollector.cloneTestFunctions().length).toBe(0);
  });
});
