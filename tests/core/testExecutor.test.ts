import { TestExecutor } from "../../src/core/testExecutor";
import { LogUpdate } from "../../src/utils";
import { removeANSIColorStyle } from "../testHelper";

import { mockTimer } from "../mocks/mockTimer";
import { afterEach as _afterEach, beforeEach as _beforeEach } from "../../src/hooks";
import { IRunnerReport } from "../../src/types";
import { group, test } from "../../src/closures";
import { expect as _expect } from "../../src/expect";
import { testCollector } from "../../src/core/testCollector";

let logUpdate: LogUpdate;
let testRunner: TestExecutor;

mockTimer();

beforeEach(() => {
  logUpdate = new LogUpdate();
  testRunner = new TestExecutor(logUpdate);
  testCollector.clearTestFiles();
  testCollector.createTestFile("test file");
});

it("should print report for 1 test file, 1 test closure and 1 test function", async () => {
  test("test closure", () => {
    _expect(1).toEqual(1);
  });

  const report = await testRunner.runTestsAndPrint(testCollector.testFiles);
  expect(report).toEqual<IRunnerReport>({
    totalTests: 1,
    totalEmptyTestFiles: 0,
    totalEmptyTests: 0,
    totalTestFiles: 1,
    totalTestFilesFailed: 0,
    testTimer: "10ms",
    totalTestsFailed: 0,
    totalTestsPassed: 1,
    totalTestFilesPassed: 1,
  });
  expect(logUpdate.stdout).toMatchSnapshot();
  expect(removeANSIColorStyle(logUpdate.stdout)).toMatchSnapshot("without ANSI Colors");
});

it("should print report for 1 test file, 1 test closure and 2 test function", async () => {
  test("test closure", () => {
    _expect(1).toEqual(1);
    _expect(1).toEqual(1);
  });

  const report = await testRunner.runTestsAndPrint(testCollector.testFiles);
  expect(report).toEqual<IRunnerReport>({
    totalTests: 1,
    totalEmptyTestFiles: 0,
    totalEmptyTests: 0,
    totalTestFiles: 1,
    totalTestFilesFailed: 0,
    totalTestsFailed: 0,
    totalTestsPassed: 1,
    totalTestFilesPassed: 1,
    testTimer: "10ms",
  });
  expect(logUpdate.stdout).toMatchSnapshot();
  expect(removeANSIColorStyle(logUpdate.stdout)).toMatchSnapshot("without ANSI Colors");
});

it("should print a report for a group with a test with multiple expects", async () => {
  group("group", () => {
    test("test closure", () => {
      _expect(1).toEqual(1);
      _expect(1).toEqual(1);
    });
  });

  await testCollector.executeGroupClojure();
  const report = await testRunner.runTestsAndPrint(testCollector.testFiles);
  expect(report).toEqual<IRunnerReport>({
    totalTests: 1,
    totalEmptyTestFiles: 0,
    totalEmptyTests: 0,
    totalTestFiles: 1,
    totalTestFilesFailed: 0,
    totalTestsFailed: 0,
    totalTestsPassed: 1,
    totalTestFilesPassed: 1,
    testTimer: "10ms",
  });
  expect(logUpdate.stdout).toMatchSnapshot();
  expect(removeANSIColorStyle(logUpdate.stdout)).toMatchSnapshot("without ANSI Colors");
});

it("should print report for single group and a single test", async () => {
  group("group", () => {
    test("test closure", () => {
      _expect(1).not.toEqual(1);
    });
  });

  await testCollector.executeGroupClojure();
  const report = await testRunner.runTestsAndPrint(testCollector.testFiles);
  expect(report).toEqual<IRunnerReport>({
    totalTests: 1,
    totalEmptyTestFiles: 0,
    totalEmptyTests: 0,
    totalTestFiles: 1,
    totalTestFilesFailed: 1,
    totalTestFilesPassed: 0,
    totalTestsFailed: 1,
    totalTestsPassed: 0,
    testTimer: "10ms",
  });
  expect(logUpdate.stdout).toMatchSnapshot();
  expect(removeANSIColorStyle(logUpdate.stdout)).toMatchSnapshot("without ANSI Colors");
});

it("should get report for single group and a empty test", async () => {
  group("group", () => {
    test("test closure", () => {});
  });

  await testCollector.executeGroupClojure();
  const report = await testRunner.runTestsAndPrint(testCollector.testFiles);
  expect(report).toEqual<IRunnerReport>({
    totalTests: 1,
    totalEmptyTestFiles: 1,
    totalEmptyTests: 1,
    totalTestFiles: 1,
    totalTestFilesFailed: 0,
    totalTestsFailed: 0,
    totalTestsPassed: 0,
    totalTestFilesPassed: 0,
    testTimer: "10ms",
  });
  expect(logUpdate.stdout).toMatchSnapshot();
  expect(removeANSIColorStyle(logUpdate.stdout)).toMatchSnapshot("without ANSI Colors");
});

it("should get report for multiple tests inside a group", async () => {
  group("group", () => {
    test("test closure", () => {
      _expect(1).toEqual(1);
    });

    test("test closure", () => {
      _expect(1).toEqual(1);
    });

    test("test closure", () => {
      _expect(1).toEqual(1);
    });
  });

  await testCollector.executeGroupClojure();
  const report = await testRunner.runTestsAndPrint(testCollector.testFiles);
  expect(report).toEqual<IRunnerReport>({
    totalTests: 3,
    totalEmptyTestFiles: 0,
    totalEmptyTests: 0,
    totalTestFiles: 1,
    totalTestFilesFailed: 0,
    totalTestsFailed: 0,
    totalTestsPassed: 3,
    totalTestFilesPassed: 1,
    testTimer: "10ms",
  });
  expect(logUpdate.stdout).toMatchSnapshot();
  expect(removeANSIColorStyle(logUpdate.stdout)).toMatchSnapshot("without ANSI Colors");
});

it("should get report for multiple tests inside a group and failed tests", async () => {
  group("group", () => {
    test("test closure", () => {
      _expect(1).toEqual(1);
    });

    test("test closure", () => {
      _expect(1).toEqual(1);
    });

    test("test closure", () => {
      _expect(1).toEqual(1);
    });

    test("test closure", () => {
      _expect(1).not.toEqual(1);
    });
  });

  await testCollector.executeGroupClojure();
  const report = await testRunner.runTestsAndPrint(testCollector.testFiles);
  expect(report).toEqual<IRunnerReport>({
    totalTests: 4,
    totalEmptyTestFiles: 0,
    totalEmptyTests: 0,
    totalTestFiles: 1,
    totalTestFilesFailed: 1,
    totalTestsFailed: 1,
    totalTestsPassed: 3,
    totalTestFilesPassed: 0,
    testTimer: "10ms",
  });
  expect(logUpdate.stdout).toMatchSnapshot();
  expect(removeANSIColorStyle(logUpdate.stdout)).toMatchSnapshot("without ANSI Colors");
});

it("should get report for subgroups", async () => {
  group("g1", () => {
    group("g2", () => {
      group("g3", () => {
        group("g4", () => {
          group("g5", () => {
            group("g6", () => {
              test("test", () => {
                _expect(1).toEqual(1);
              });
            });
          });
        });
      });
    });
  });

  await testCollector.executeGroupClojure();
  const report = await testRunner.runTestsAndPrint(testCollector.testFiles);
  expect(report).toEqual<IRunnerReport>({
    totalTests: 1,
    totalEmptyTestFiles: 0,
    totalEmptyTests: 0,
    totalTestFiles: 1,
    totalTestFilesFailed: 0,
    totalTestsFailed: 0,
    totalTestsPassed: 1,
    totalTestFilesPassed: 1,
    testTimer: "10ms",
  });
  expect(logUpdate.stdout).toMatchSnapshot();
  expect(removeANSIColorStyle(logUpdate.stdout)).toMatchSnapshot("without ANSI Colors");
});

it("should get report for subtests", async () => {
  test("t1", () => {
    test("t2", () => {
      test("t3", () => {
        test("t4", () => {
          test("t5", () => {
            test("t6", () => {
              test("t7", () => {
                _expect(1).toEqual(1);
              });
            });
          });
        });
      });
    });
  });

  await testCollector.executeGroupClojure();
  const report = await testRunner.runTestsAndPrint(testCollector.testFiles);
  expect(report).toEqual<IRunnerReport>({
    totalTests: 7,
    totalEmptyTestFiles: 0,
    totalEmptyTests: 6,
    totalTestFiles: 1,
    totalTestFilesFailed: 0,
    totalTestsFailed: 0,
    totalTestsPassed: 1,
    totalTestFilesPassed: 1,
    testTimer: "10ms",
  });
  expect(logUpdate.stdout).toMatchSnapshot();
  expect(removeANSIColorStyle(logUpdate.stdout)).toMatchSnapshot("without ANSI Colors");
});

it("should get report for splited groups", async () => {
  group("group 1", () => {
    test("test closure 1", () => {
      _expect(1).toEqual(1);
    });

    test("test closure 2", () => {
      _expect(1).toEqual(1);
    });

    test("test closure 3", () => {
      _expect(1).toEqual(1);
    });

    test("test closure 4", () => {
      _expect(1).not.toEqual(1);
    });
  });

  group("group 2", () => {
    test("test closure 5", () => {
      _expect(1).toEqual(1);
    });

    test("test closure 6", () => {
      _expect(1).toEqual(1);
    });

    test("test closure 7", () => {
      _expect(1).toEqual(1);
    });

    test("test closure 8", () => {
      _expect(1).not.toEqual(1);
    });
  });

  group("group 3", () => {
    test("test closure 9", () => {
      _expect(1).toEqual(1);
    });

    test("test closure 10", () => {
      _expect(1).toEqual(1);
    });

    test("test closure 11", () => {
      _expect(1).toEqual(1);
    });

    test("test closure 12", () => {
      _expect(1).not.toEqual(1);
    });
  });

  await testCollector.executeGroupClojure();
  const report = await testRunner.runTestsAndPrint(testCollector.testFiles);
  expect(report).toEqual<IRunnerReport>({
    totalTests: 12,
    totalEmptyTestFiles: 0,
    totalEmptyTests: 0,
    totalTestFiles: 1,
    totalTestFilesFailed: 1,
    totalTestsFailed: 3,
    totalTestsPassed: 9,
    totalTestFilesPassed: 0,
    testTimer: "10ms",
  });
  expect(logUpdate.stdout).toMatchSnapshot();
  expect(removeANSIColorStyle(logUpdate.stdout)).toMatchSnapshot("without ANSI Colors");
});

it("should get report for multiple files", async () => {
  testCollector.clearTestFiles();
  testCollector.createTestFile("file 1");

  group("group 1", () => {
    test("test closure 1", () => {
      _expect(1).toEqual(1);
    });
  });

  await testCollector.executeGroupClojure();
  testCollector.createTestFile("file 2");

  group("group 2", () => {
    test("test closure 2", () => {
      _expect(1).toEqual(1);
    });
  });

  await testCollector.executeGroupClojure();
  testCollector.createTestFile("file 3");

  group("group 3", () => {
    test("test closure 3", () => {
      _expect(1).toEqual(1);
    });
  });

  await testCollector.executeGroupClojure();
  const report = await testRunner.runTestsAndPrint(testCollector.testFiles);
  expect(report).toEqual<IRunnerReport>({
    totalTests: 3,
    totalEmptyTestFiles: 0,
    totalEmptyTests: 0,
    totalTestFiles: 3,
    totalTestFilesFailed: 0,
    totalTestsFailed: 0,
    totalTestsPassed: 3,
    totalTestFilesPassed: 3,
    testTimer: "10ms",
  });
  expect(logUpdate.stdout).toMatchSnapshot();
  expect(removeANSIColorStyle(logUpdate.stdout)).toMatchSnapshot("without ANSI Colors");
});
