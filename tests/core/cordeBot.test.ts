import { testCollector } from "../../src/common/testColletor";
import { toReturn } from "../../src/api/expectMatches";

describe("Testing CordeBot object", () => {
  beforeEach(() => {
    testCollector.clearIsolatedTestFunctions();
  });
  it("should add a test function", () => {
    testCollector.addTestFunction((corde) => toReturn("test", false, corde, "com"));
    expect(testCollector.cloneIsolatedTestFunctions().length).toBe(1);
  });

  it("should not add a test function", () => {
    testCollector.addTestFunction(null);
    expect(testCollector.cloneIsolatedTestFunctions().length).toBe(0);
  });
});
