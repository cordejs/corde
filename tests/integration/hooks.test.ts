import { group as _group, it as _it } from "../../src/closures";
import { expect as _expect } from "../../src/expect";
import { TestExecutor } from "../../src/core/TestExecutor";
import { LogUpdate } from "../../src/utils";
import { mockTimer } from "../mocks/mockTimer";
import { testCollector } from "../../src/core/TestCollector";

import {
  beforeEach as _beforeEach,
  afterEach as _afterEach,
  beforeAll as _beforeAll,
  afterAll as _afterAll,
} from "../../src/hooks";

let logUpdate: LogUpdate;
let testRunner: TestExecutor;

mockTimer();

function runFn(times: number, fn: () => void) {
  for (let index = 0; index < times; index++) {
    fn();
  }
}

beforeEach(() => {
  logUpdate = new LogUpdate();
  testRunner = new TestExecutor(logUpdate);
  testCollector.clearTestFiles();
  testCollector.createTestFile("test file");
});

describe("testing closures", () => {
  it("should add beforeEach hook to testFile", () => {
    expect(testCollector.currentTestFile.beforeEachHooks.size).toEqual(0);
    _beforeEach(() => {});
    expect(testCollector.currentTestFile.beforeEachHooks.size).toEqual(1);
  });

  it("should add afterEach hook to testFile", () => {
    expect(testCollector.currentTestFile.afterEachHooks.size).toEqual(0);
    _afterEach(() => {});
    expect(testCollector.currentTestFile.afterEachHooks.size).toEqual(1);
  });

  it("should add afterAll hook to testFile", () => {
    expect(testCollector.currentTestFile.afterAllHooks.size).toEqual(0);
    _afterAll(() => {});
    expect(testCollector.currentTestFile.afterAllHooks.size).toEqual(1);
  });

  it("should add beforeAll hook to testFile", () => {
    expect(testCollector.currentTestFile.beforeAllHooks.size).toEqual(0);
    _beforeAll(() => {});
    expect(testCollector.currentTestFile.beforeAllHooks.size).toEqual(1);
  });

  it("should execute beforeEach with one group and multiple its ", async () => {
    let value = 0;
    _beforeEach(() => {
      value++;
    });

    _group("", () => {
      runFn(10, () => {
        _it("", () => {
          _expect("").toEqual("");
        });
      });
    });

    await testCollector.executeGroupClojure();
    await testRunner.runTestsAndPrint(testCollector.testFiles);

    expect(value).toEqual(10);
  });

  it("should execute beforeEach with hook inside group closure", async () => {
    let value = 0;

    _group("", () => {
      _beforeEach(() => {
        value++;
      });
      runFn(10, () => {
        _it("", () => {
          _expect("").toEqual("");
        });
      });
    });

    await testCollector.executeGroupClojure();
    await testRunner.runTestsAndPrint(testCollector.testFiles);

    expect(value).toEqual(10);
  });

  it("should execute beforeEach with multiple groups with its", async () => {
    let value = 0;
    _beforeEach(() => {
      value++;
    });

    runFn(10, () => {
      _group("", () => {
        _it("", () => {
          _expect("").toEqual("");
        });
      });
    });

    await testCollector.executeGroupClojure();
    await testRunner.runTestsAndPrint(testCollector.testFiles);

    expect(value).toEqual(10);
  });

  it("should execute afterEach with hook inside group closure", async () => {
    let value = 0;

    _group("", () => {
      _afterEach(() => {
        value++;
      });
      runFn(10, () => {
        _it("", () => {
          _expect("").toEqual("");
        });
      });
    });

    await testCollector.executeGroupClojure();
    await testRunner.runTestsAndPrint(testCollector.testFiles);

    expect(value).toEqual(10);
  });

  it("should execute afterEach with one group and multiple its", async () => {
    let value = 0;
    _afterEach(() => {
      value++;
    });

    _group("", () => {
      runFn(10, () => {
        _it("", () => {
          _expect("").toEqual("");
        });
      });
    });

    await testCollector.executeGroupClojure();
    await testRunner.runTestsAndPrint(testCollector.testFiles);

    expect(value).toEqual(10);
  });

  it("should execute afterEach with multiple groups with its", async () => {
    let value = 0;
    _afterEach(() => {
      value++;
    });

    runFn(10, () => {
      _group("", () => {
        _it("", () => {
          _expect("").toEqual("");
        });
      });
    });

    await testCollector.executeGroupClojure();
    await testRunner.runTestsAndPrint(testCollector.testFiles);

    expect(value).toEqual(10);
  });

  it.each([
    [_beforeAll, 1],
    [_afterAll, 1],
  ])("should execute beforeAll with multiple groups with its", async (hook, expectedValue) => {
    let value = 0;
    hook(() => {
      value++;
    });

    runFn(expectedValue, () => {
      _group("", () => {
        _it("", () => {
          _expect("").toEqual("");
        });
      });
    });

    await testCollector.executeGroupClojure();
    await testRunner.runTestsAndPrint(testCollector.testFiles);

    expect(value).toEqual(expectedValue);
  });
});
