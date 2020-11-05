import { testCollector } from "../../src/common/testCollector";
import { Test } from "../../src/types";
import { test } from "../../src/api";
import { expect as cordeExpect } from "../../src/api";

describe("Testing test function", () => {
  beforeEach(() => {
    testCollector.tests = [];
  });

  it("Should execute test function", () => {
    let a = 1;
    test("test group", () => {
      a = 2;
    });

    expect(a).toBe(2);
  });

  it("Should add a test", () => {
    const testName = "test group";
    const testObj: Test = {
      testsFunctions: [],
      name: testName,
    };

    test(testName, () => {});

    if (testCollector.tests.length === 0) {
      fail();
    } else {
      const _tests = testCollector.tests[0];
      expect(_tests).toEqual(testObj);
    }
  });

  it("should not add a group", () => {
    test(undefined, () => {});

    if (!testCollector.tests) {
      fail();
    } else {
      expect(testCollector.tests.length).toEqual(1);
    }
  });

  it("add two tests with single cases inside then should return two tests with single cases inside then", () => {
    test("case 1", () => {
      cordeExpect("").toPin({ id: "1" });
    });
    test("case 2", () => {
      cordeExpect("").toPin({ id: "1" });
    });

    expect(testCollector.tests[0].testsFunctions.length).toEqual(1);
    expect(testCollector.tests[1].testsFunctions.length).toEqual(1);
  });

  it("should add cases", () => {
    test("case 1", () => {
      cordeExpect("").toPin({ id: "1" });
      cordeExpect("").toPin({ id: "1" });
    });
    test("case 2", () => {
      cordeExpect("").toPin({ id: "1" });
      cordeExpect("").toPin({ id: "1" });
      cordeExpect("").toPin({ id: "1" });
    });

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
