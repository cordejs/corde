import { testCollector } from "../../src/common/testCollector";
import { IGroup } from "../../src/types";
import { group, test } from "../../src/closures";
import { expect as cordeExpect } from "../../src/expect";

describe("Testing group function", () => {
  beforeEach(() => {
    testCollector.groups = [];
  });

  it("Should execute group function", async () => {
    let a = 1;
    group("test group", () => {
      a = 2;
    });

    await testCollector.executeGroupClojure();
    expect(a).toBe(2);
  });

  it("Should not add group", async () => {
    const groupName = "test group";

    group(groupName, () => {});

    await testCollector.executeGroupClojure();
    expect(testCollector.groups.length).toBe(0);
  });

  it("should add a group", async () => {
    group(undefined, () => {});
    await testCollector.executeGroupClojure();
    expect(testCollector.groups.length).toBe(0);
  });

  it("Should add group with test inside", async () => {
    group("groupName", () => {
      test("testName", () => {});
    });

    await testCollector.executeGroupClojure();
    expect(testCollector.groups).toEqual([]);
  });

  it("Should add group with test inside and testFunction (single group)", async () => {
    group("groupName", () => {
      test("testName", () => {
        cordeExpect("test").toReturn("");
      });
    });

    await testCollector.executeGroupClojure();

    const groupsObj: IGroup[] = [];
    groupsObj.push({
      name: "groupName",
      tests: [
        {
          testsFunctions: [expect.any(Function)],
          name: "testName",
        },
      ],
    });
    expect(testCollector.groups).toEqual(groupsObj);
  });

  it("Should add group with test inside and testFunction (double group)", async () => {
    group("groupName", () => {
      test("testName", () => {
        cordeExpect("test").toReturn("");
      });
      test("testName", () => {
        cordeExpect("test").toReturn("");
      });
    });

    group("groupName", () => {
      test("testName", () => {
        cordeExpect("test").toReturn("");
        cordeExpect("test").toReturn("");
      });
    });

    await testCollector.executeGroupClojure();

    const groupsObj: IGroup[] = [];
    groupsObj.push(
      {
        name: "groupName",
        tests: [
          {
            testsFunctions: [expect.any(Function)],
            name: "testName",
          },
          {
            testsFunctions: [expect.any(Function)],
            name: "testName",
          },
        ],
      },
      {
        name: "groupName",
        tests: [
          {
            testsFunctions: [expect.any(Function), expect.any(Function)],
            name: "testName",
          },
        ],
      },
    );
    expect(testCollector.groups).toEqual(groupsObj);
  });
});
