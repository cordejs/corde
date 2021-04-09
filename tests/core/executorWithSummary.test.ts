import { summary } from "../../src/core/summary";
import { TestExecutor } from "../../src/core/testExecutor";
import { buildReportMessage, LogUpdate } from "../../src/utils";
import { mockTimer } from "../mocks/mockTimer";
import { generateTestFile, removeANSIColorStyle, TestFileGeneratorInfo } from "../testHelper";

let logUpdate: LogUpdate;
let testRunner: TestExecutor;

mockTimer();

beforeEach(() => {
  logUpdate = new LogUpdate();
  testRunner = new TestExecutor(logUpdate);
});

it("should print report for 1 test file, 1 test closure and 1 failed function and 1 passed function", async () => {
  const data: TestFileGeneratorInfo = {
    amountOfTestFiles: 1,
    testFunctionsReport: [
      {
        pass: false,
        testName: "",
        message: buildReportMessage("expected: hi", "received: hi!"),
      },
      { pass: true, testName: "" },
    ],
    amountOfTests: 1,
  };

  const tests = generateTestFile(data);

  const report = await testRunner.runTestsAndPrint(tests);
  const summaryStder = summary.print(report);
  expect(removeANSIColorStyle(logUpdate.stdout + summaryStder)).toMatchSnapshot();
});
