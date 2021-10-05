import { testCollector } from "../../src/core/TestCollector";
import { test as _test } from "../../src/closures";
import { ITest } from "../../src/types";

describe("Testing test function", () => {
  beforeEach(() => {
    testCollector.clearTestFiles();
    testCollector.createTestFile("");
  });

  it("Should execute test function", async () => {
    let a = 1;
    _test("test group", () => {
      a = 2;
    });

    expect(testCollector.currentTestFile.closures).toHaveLength(1);
    await (testCollector.currentTestFile.closures[0] as ITest).action();
    expect(a).toBe(2);
  });
});
