import { group, test as _test } from "../../src/closures";
import { expect as _expect } from "../../src/expect";
import { summary } from "../../src/core/summary";
import { TestExecutor } from "../../src/core/testExecutor";
import { LogUpdate } from "../../src/utils";
import { mockTimer } from "../mocks/mockTimer";
import { removeANSIColorStyle } from "../testHelper";
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

it("should print report for 1 test file, 1 test closure and 1 failed function and 1 passed function", async () => {
  group("group", () => {
    test("test closure", () => {
      _expect(1).toEqual(1);
      _expect(1).toEqual(1);
    });
  });

  await testCollector.executeGroupClojure();
  const report = await testRunner.runTestsAndPrint(testCollector.testFiles);
  const summaryStder = summary.print(report);
  expect(removeANSIColorStyle(logUpdate.stdout + summaryStder)).toMatchSnapshot();
});
