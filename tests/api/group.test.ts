import { testCollector } from "../../src/common";
import { Group } from "../../src/types";
import { group, test, expect as cordeExpect } from "../../src/api";

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

  it("Should add a group", async () => {
    const groupName = "test group";
    const groupObj: Group = {
      tests: [],
      name: groupName,
    };

    group(groupName, () => {});

    await testCollector.executeGroupClojure();

    if (testCollector.groups && testCollector.groups.length === 0) {
      fail();
    } else {
      const gp = testCollector.groups[0];
      expect(gp).toEqual(groupObj);
    }
  });

  it("should add a group", async () => {
    group(undefined, () => {});

    await testCollector.executeGroupClojure();
    if (!testCollector.groups) {
      fail();
    } else {
      expect(testCollector.groups.length).toEqual(1);
    }
  });

  it("Should add group with test inside", async () => {
    group("groupName", () => {
      test("testName", () => {});
    });

    await testCollector.executeGroupClojure();

    const groupsObj: Group[] = [];
    groupsObj.push({
      name: "groupName",
      tests: [
        {
          testsFunctions: [],
          name: "testName",
        },
      ],
    });
    expect(testCollector.groups).toEqual(groupsObj);
  });

  it("Should add group with test inside and testFunction (single group)", async () => {
    group("groupName", () => {
      test("testName", () => {
        cordeExpect("test").toReturn("");
      });
    });

    await testCollector.executeGroupClojure();

    const groupsObj: Group[] = [];
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

    const groupsObj: Group[] = [];
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
