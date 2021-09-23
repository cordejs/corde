import { testCollector } from "../../src/common/testCollector";
import { test as _test } from "../../src/closures";

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

    expect(testCollector.currentTestFile.tests).toHaveLength(1);
    await testCollector.currentTestFile.tests[0].action();
    expect(a).toBe(2);
  });
});
