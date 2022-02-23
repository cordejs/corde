import { test as _test } from "../../src/closures";
import runtime from "../../src/core/runtime";
import { ITest } from "../../src/types";

const { testCollector } = runtime;

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
