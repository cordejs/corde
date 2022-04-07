/* eslint-disable @typescript-eslint/no-empty-function */
import { group, test } from "../../src/closures";
import runtime from "../../src/core/runtime";
import { ITest } from "../../src/types";

const { testCollector } = runtime;

describe("testing group function", () => {
  beforeEach(() => {
    runtime.setConfigs({ timeout: 100 });
    testCollector.clearTestFiles();
    testCollector.createTestFile("");
  });

  it("should execute group function", async () => {
    let a = 1;
    group("test group", () => {
      a = 2;
    });

    await testCollector.executeGroupClojure();
    expect(a).toBe(2);
  });

  it("should not add group", async () => {
    const groupName = "test group";

    group(groupName, () => {});

    await testCollector.executeGroupClojure();
    expect(testCollector.currentTestFile.closures.length).toBe(1);
  });

  it("should add a group", async () => {
    group(undefined, () => {});
    await testCollector.executeGroupClojure();
    expect(testCollector.currentTestFile.closures.length).toBe(1);
  });

  it("should add group with test inside", async () => {
    group("groupName", () => {
      test("testName", () => {});
    });

    await testCollector.executeGroupClojure();
    expect(testCollector.currentTestFile.closures).toHaveLength(1);
  });

  it("should add two groups", async () => {
    group("groupName", () => {
      test("testName", () => {});
    });

    group("groupName", () => {
      test("testName", () => {});
    });

    await testCollector.executeGroupClojure();
    expect(testCollector.currentTestFile.closures).toHaveLength(2);
  });

  it("should throw error due to group inside test closure", async () => {
    test("", () => {
      group("", () => {});
    });

    runtime.configs.setConfigs({ suiteTimeout: 100 });
    expect(testCollector.currentTestFile.closures.length).toEqual(1);
    try {
      await (testCollector.currentTestFile.closures[0] as ITest).action();
      fail();
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});
