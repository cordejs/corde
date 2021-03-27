import { testCollector } from "../../src/common/testCollector";
import { Test } from "../../src/types";
import { test } from "../../src/clausures";
import { expect as cordeExpect } from "../../src/expect";

describe("Testing test function", () => {
  beforeEach(() => {
    testCollector.tests = [];
  });

  it("Should execute test function", async () => {
    let a = 1;
    test("test group", () => {
      a = 2;
    });

    await testCollector.executeTestClojure();
    expect(a).toBe(2);
  });

  it("Should add a test", async () => {
    const testName = "test group";
    const testObj: Test = {
      testsFunctions: [],
      name: testName,
    };

    test(testName, () => {});

    await testCollector.executeTestClojure();

    expect(testCollector.tests.length).toEqual(0);
  });

  it("should not add a group", async () => {
    test(undefined, () => {});
    await testCollector.executeTestClojure();

    if (!testCollector.tests) {
      fail();
    } else {
      expect(testCollector.tests.length).toEqual(0);
    }
  });

  it("add two tests with single cases inside then should return two tests with single cases inside then", async () => {
    test("case 1", () => {
      cordeExpect("").toPin({ id: "1" });
    });
    test("case 2", () => {
      cordeExpect("").toPin({ id: "1" });
    });

    await testCollector.executeTestClojure();
    expect(testCollector.tests[0].testsFunctions.length).toEqual(1);
    expect(testCollector.tests[1].testsFunctions.length).toEqual(1);
  });

  it("should add cases", async () => {
    test("case 1", () => {
      cordeExpect("").toPin({ id: "1" });
      cordeExpect("").toPin({ id: "1" });
    });
    test("case 2", () => {
      cordeExpect("").toPin({ id: "1" });
      cordeExpect("").toPin({ id: "1" });
      cordeExpect("").toPin({ id: "1" });
    });

    await testCollector.executeTestClojure();
    expect(testCollector.tests[0].testsFunctions.length).toEqual(2);
    expect(testCollector.tests[1].testsFunctions.length).toEqual(3);
  });

  // Fix later
  // it("should add sub tests", () => {
  //   test("case 1", () => {
  //     cordeExpect("").toPin({ id: "1" });
  //     test("case 2", () => {
  //       cordeExpect("").toPin({ id: "1" });
  //     });
  //   });
  //   test("case 3", () => {
  //     cordeExpect("").toPin({ id: "1" });
  //     test("case 4", () => {
  //       cordeExpect("").toPin({ id: "1" });
  //       test("case 5", () => {
  //         cordeExpect("").toPin({ id: "1" });
  //       });
  //     });
  //   });

  //   expect(testCollector.tests[0].testsFunctions.length).toEqual(1);
  //   expect(testCollector.tests[0].subTests[0].testsFunctions.length).toEqual(1);
  //   expect(testCollector.tests[1].subTests[0].testsFunctions.length).toEqual(1);
  //   expect(testCollector.tests[1].subTests[0].subTests[0].testsFunctions.length).toEqual(1);
  // });
});
