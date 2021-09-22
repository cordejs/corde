import { testCollector } from "../../src/common/testCollector";
import { IGroup } from "../../src/types";
import { group, test } from "../../src/closures";
import { expect as cordeExpect, expect as _expect } from "../../src/expect";

describe("testing group function", () => {
  beforeEach(() => {
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
    expect(testCollector.currentTestFile.groups.length).toBe(1);
  });

  it("should add a group", async () => {
    group(undefined, () => {});
    await testCollector.executeGroupClojure();
    expect(testCollector.currentTestFile.groups.length).toBe(1);
  });

  it("should add group with test inside", async () => {
    group("groupName", () => {
      test("testName", () => {});
    });

    await testCollector.executeGroupClojure();
    expect(testCollector.currentTestFile.groups).toHaveLength(1);
    expect(testCollector.currentTestFile.groups[0].tests).toHaveLength(1);
  });

  it("should throw error due to group inside test closure", async () => {
    test("", () => {
      group("", () => {});
    });

    expect(testCollector.currentTestFile.tests.length).toEqual(1);
    try {
      await testCollector.currentTestFile.tests[0].action();
      fail();
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});
