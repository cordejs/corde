import { TestExecutor } from "../../src/core/testExecutor";
import { buildReportMessage, diff, LogUpdate } from "../../src/utils";
import {
  generateTestFile,
  removeANSIColorStyle,
  TestFileGeneratorInfo,
  testFileNames,
  testNames,
} from "../testHelper";

import { mockTimer } from "../mocks/mockTimer";
import { afterEach as _afterEach, beforeEach as _beforeEach } from "../../src";
import { SemiRunnerReport, TestFile } from "../../src/types";

let logUpdate: LogUpdate;
let testRunner: TestExecutor;

mockTimer();

beforeEach(() => {
  logUpdate = new LogUpdate();
  testRunner = new TestExecutor(logUpdate);
});

it("should print report for 1 test file, 1 test clausure and 1 test function", async () => {
  const data: TestFileGeneratorInfo = {
    amountOfTestFiles: 1,
    amountOfTestFunctions: 1,
    amountOfTests: 1,
  };

  const tests = generateTestFile(data);

  const report = await testRunner.runTestsAndPrint(tests);
  const amountOfTest = data.amountOfTestFiles * data.amountOfTests * data.amountOfTestFunctions;

  expect(report).toMatchObject<SemiRunnerReport>({
    totalTestFiles: data.amountOfTestFiles,
    totalTestFilesFailed: 0,
    totalTestFilesPassed: data.amountOfTestFiles,
    totalTests: amountOfTest,
    totalTestsFailed: 0,
    totalTestsPassed: amountOfTest,
    totalEmptyTestFiles: 0,
    totalEmptyTests: 0,
  });
  expect(removeANSIColorStyle(logUpdate.stder)).toMatchSnapshot();
});

it("should print report for 1 test file, 1 test clausure and 2 test function", async () => {
  const data: TestFileGeneratorInfo = {
    amountOfTestFiles: 1,
    amountOfTestFunctions: 2,
    amountOfTests: 1,
  };

  const tests = generateTestFile(data);

  const report = await testRunner.runTestsAndPrint(tests);
  const amountOfTest = data.amountOfTestFiles * data.amountOfTests * data.amountOfTestFunctions;

  expect(report).toMatchObject<SemiRunnerReport>({
    totalTestFiles: data.amountOfTestFiles,
    totalTestFilesFailed: 0,
    totalTestFilesPassed: data.amountOfTestFiles,
    totalTests: amountOfTest,
    totalTestsFailed: 0,
    totalTestsPassed: amountOfTest,
    totalEmptyTestFiles: 0,
    totalEmptyTests: 0,
  });
  expect(removeANSIColorStyle(logUpdate.stder)).toMatchSnapshot();
});

it("should print report for 2 test file, 1 test clausure and 1 test function", async () => {
  const data: TestFileGeneratorInfo = {
    amountOfTestFiles: 2,
    amountOfTestFunctions: 1,
    amountOfTests: 1,
  };

  const tests = generateTestFile({
    amountOfTestFiles: 2,
    amountOfTestFunctions: 1,
    amountOfTests: 1,
  });

  const report = await testRunner.runTestsAndPrint(tests);
  const amountOfTest = data.amountOfTestFiles * data.amountOfTests * data.amountOfTestFunctions;

  expect(report).toMatchObject<SemiRunnerReport>({
    totalTestFiles: data.amountOfTestFiles,
    totalTestFilesFailed: 0,
    totalTestFilesPassed: data.amountOfTestFiles,
    totalTests: amountOfTest,
    totalTestsFailed: 0,
    totalTestsPassed: amountOfTest,
    totalEmptyTestFiles: 0,
    totalEmptyTests: 0,
  });
  expect(removeANSIColorStyle(logUpdate.stder)).toMatchSnapshot();
});

it("should print report for 2 test file, 1 test clausure and 2 test function", async () => {
  const data: TestFileGeneratorInfo = {
    amountOfTestFiles: 2,
    amountOfTestFunctions: 2,
    amountOfTests: 1,
  };

  const tests = generateTestFile(data);

  const report = await testRunner.runTestsAndPrint(tests);
  const amountOfTest = data.amountOfTestFiles * data.amountOfTests * data.amountOfTestFunctions;

  expect(report).toMatchObject<SemiRunnerReport>({
    totalTestFiles: data.amountOfTestFiles,
    totalTestFilesFailed: 0,
    totalTestFilesPassed: data.amountOfTestFiles,
    totalTests: amountOfTest,
    totalTestsFailed: 0,
    totalTestsPassed: amountOfTest,
    totalEmptyTestFiles: 0,
    totalEmptyTests: 0,
  });
  expect(removeANSIColorStyle(logUpdate.stder)).toMatchSnapshot();
});

it("should print report for 2 test file, 2 test clausure and 2 test function", async () => {
  const data: TestFileGeneratorInfo = {
    amountOfTestFiles: 2,
    amountOfTestFunctions: 2,
    amountOfTests: 2,
  };

  const tests = generateTestFile(data);

  const report = await testRunner.runTestsAndPrint(tests);
  const amountOfTest = data.amountOfTestFiles * data.amountOfTests * data.amountOfTestFunctions;

  expect(report).toMatchObject<SemiRunnerReport>({
    totalTestFiles: data.amountOfTestFiles,
    totalTestFilesFailed: 0,
    totalTestFilesPassed: data.amountOfTestFiles,
    totalTests: amountOfTest,
    totalTestsFailed: 0,
    totalTestsPassed: amountOfTest,
    totalEmptyTestFiles: 0,
    totalEmptyTests: 0,
  });
  expect(removeANSIColorStyle(logUpdate.stder)).toMatchSnapshot();
});

it("should print report for 1 test file, 1 test clausure and 1 test function that fail", async () => {
  const data: TestFileGeneratorInfo = {
    amountOfTestFiles: 1,
    testFunctionsReport: [
      {
        pass: false,
        message: buildReportMessage("expected: hi\n", "received: hi!"),
      },
    ],
    amountOfTests: 1,
  };

  const tests = generateTestFile(data);

  const report = await testRunner.runTestsAndPrint(tests);
  const amountOfTest = data.amountOfTestFiles * data.amountOfTests * data.amountOfTestFunctions;

  expect(report).toMatchObject<SemiRunnerReport>({
    totalTestFiles: data.amountOfTestFiles,
    totalTestFilesFailed: 1,
    totalTestFilesPassed: 0,
    totalTests: amountOfTest,
    totalTestsFailed: amountOfTest,
    totalTestsPassed: 0,
    totalEmptyTestFiles: 0,
    totalEmptyTests: 0,
  });
  expect(removeANSIColorStyle(logUpdate.stder)).toMatchSnapshot();
});

it("should print report for 1 test file, 1 test clausure and 1 failed function and 1 passed function", async () => {
  const data: TestFileGeneratorInfo = {
    amountOfTestFiles: 1,
    testFunctionsReport: [
      {
        pass: false,
        message: buildReportMessage("expected: hi\n", "received: hi!"),
      },
      { pass: true },
    ],
    amountOfTests: 1,
  };

  const tests = generateTestFile(data);

  const report = await testRunner.runTestsAndPrint(tests);

  expect(report).toMatchObject<SemiRunnerReport>({
    totalTestFiles: data.amountOfTestFiles,
    totalTestFilesFailed: 1,
    totalTestFilesPassed: 0,
    totalTests: 2,
    totalTestsFailed: 1,
    totalTestsPassed: 1,
    totalEmptyTestFiles: 0,
    totalEmptyTests: 0,
  });
  expect(removeANSIColorStyle(logUpdate.stder)).toMatchSnapshot();
});

it("should print report for 1 test file, 1 test clausure and 1 failed function and 1 passed function", async () => {
  const data: TestFileGeneratorInfo = {
    amountOfTestFiles: 1,
    testFunctionsReport: [
      {
        pass: false,
        message: buildReportMessage("expected: hi\n", "received: hi!"),
      },
      { pass: true },
    ],
    amountOfTests: 1,
  };

  const tests = generateTestFile(data);

  const report = await testRunner.runTestsAndPrint(tests);

  expect(report).toMatchObject<SemiRunnerReport>({
    totalTestFiles: data.amountOfTestFiles,
    totalTestFilesFailed: 1,
    totalTestFilesPassed: 0,
    totalTests: 2,
    totalTestsFailed: 1,
    totalTestsPassed: 1,
    totalEmptyTestFiles: 0,
    totalEmptyTests: 0,
  });
  expect(removeANSIColorStyle(logUpdate.stder)).toMatchSnapshot();
});

it("should print report for 1 test file, 2 test clausure and 1 failed function and 1 passed function", async () => {
  const data: TestFileGeneratorInfo = {
    amountOfTestFiles: 1,
    testFunctionsReport: [
      {
        pass: false,
        message: buildReportMessage("expected: hi\n", "received: hi!"),
      },
      { pass: true },
    ],
    amountOfTests: 2,
  };

  const tests = generateTestFile(data);

  const report = await testRunner.runTestsAndPrint(tests);

  expect(report).toMatchObject<SemiRunnerReport>({
    totalTestFiles: data.amountOfTestFiles,
    totalTestFilesFailed: 1,
    totalTestFilesPassed: 0,
    totalTests: 4,
    totalTestsFailed: 2,
    totalTestsPassed: 2,
    totalEmptyTestFiles: 0,
    totalEmptyTests: 0,
  });
  expect(removeANSIColorStyle(logUpdate.stder)).toMatchSnapshot();
});

it("should print report for 2 test file, 2 test clausure and 1 failed function and 1 passed function", async () => {
  const data: TestFileGeneratorInfo = {
    amountOfTestFiles: 2,
    testFunctionsReport: [
      {
        pass: false,
        message: buildReportMessage("expected: hi\n", "received: hi!"),
      },
      { pass: true },
    ],
    amountOfTests: 2,
  };

  const tests = generateTestFile(data);

  const report = await testRunner.runTestsAndPrint(tests);

  expect(report).toMatchObject<SemiRunnerReport>({
    totalTestFiles: data.amountOfTestFiles,
    totalTestFilesFailed: 2,
    totalTestFilesPassed: 0,
    totalTests: 8,
    totalTestsFailed: 4,
    totalTestsPassed: 4,
    totalEmptyTestFiles: 0,
    totalEmptyTests: 0,
  });
  expect(removeANSIColorStyle(logUpdate.stder)).toMatchSnapshot();
});

it("should print report for 1 test file, 2 test clausure and 1 failed function and 1 passed function", async () => {
  const tests: TestFile[] = [
    {
      path: testFileNames[0],
      isEmpty: false,
      groups: [
        {
          name: "group name",
          tests: [
            {
              name: testNames[0],
              testsFunctions: [() => Promise.resolve({ pass: true })],
            },
            {
              name: testNames[1],
              testsFunctions: [
                () =>
                  Promise.resolve({
                    pass: false,
                    message: buildReportMessage("expected: hi\n", "received: hi!"),
                  }),
              ],
            },
          ],
        },
      ],
    },
  ];

  const report = await testRunner.runTestsAndPrint(tests);

  expect(report).toMatchObject<SemiRunnerReport>({
    totalTestFiles: 1,
    totalTestFilesFailed: 1,
    totalTestFilesPassed: 0,
    totalTests: 2,
    totalTestsFailed: 1,
    totalTestsPassed: 1,
    totalEmptyTestFiles: 0,
    totalEmptyTests: 0,
  });
  expect(removeANSIColorStyle(logUpdate.stder)).toMatchSnapshot();
});

it("should print for a empty test file name", async () => {
  const tests: TestFile[] = [
    {
      path: testFileNames[0],
      isEmpty: false,
      groups: [
        {
          name: "",
          tests: [
            {
              name: "",
              testsFunctions: [() => Promise.resolve({ pass: true })],
            },
          ],
        },
      ],
    },
  ];

  const report = await testRunner.runTestsAndPrint(tests);

  expect(report).toMatchObject<SemiRunnerReport>({
    totalTestFiles: 1,
    totalTestFilesFailed: 0,
    totalTestFilesPassed: 1,
    totalTests: 1,
    totalTestsFailed: 0,
    totalTestsPassed: 1,
    totalEmptyTestFiles: 0,
    totalEmptyTests: 0,
  });
  expect(removeANSIColorStyle(logUpdate.stder)).toMatchSnapshot();
});

it("should print tests for a subgroup", async () => {
  const tests: TestFile[] = [
    {
      path: testFileNames[0],
      isEmpty: false,
      groups: [
        {
          name: "",
          tests: [],
          subGroups: [
            {
              name: "subgroup",
              tests: [
                {
                  name: "test",
                  testsFunctions: [() => Promise.resolve({ pass: true })],
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const report = await testRunner.runTestsAndPrint(tests);

  expect(report).toMatchObject<SemiRunnerReport>({
    totalTestFiles: 1,
    totalTestFilesFailed: 0,
    totalTestFilesPassed: 1,
    totalTests: 1,
    totalTestsFailed: 0,
    totalTestsPassed: 1,
    totalEmptyTestFiles: 0,
    totalEmptyTests: 0,
  });
  expect(removeANSIColorStyle(logUpdate.stder)).toMatchSnapshot();
});

it("should print subtest for a subgroup", async () => {
  const tests: TestFile[] = [
    {
      path: testFileNames[0],
      isEmpty: false,
      groups: [
        {
          name: "",
          tests: [],
          subGroups: [
            {
              name: "subgroup",
              tests: [
                {
                  name: "test",
                  testsFunctions: [],
                  subTests: [
                    {
                      name: "subtest",
                      testsFunctions: [() => Promise.resolve({ pass: true })],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const report = await testRunner.runTestsAndPrint(tests);

  expect(report).toMatchObject<SemiRunnerReport>({
    totalTestFiles: 1,
    totalTestFilesFailed: 0,
    totalTestFilesPassed: 1,
    totalTests: 2,
    totalTestsFailed: 0,
    totalTestsPassed: 1,
    totalEmptyTestFiles: 0,
    totalEmptyTests: 1,
  });
  expect(removeANSIColorStyle(logUpdate.stder)).toMatchSnapshot();
});

it("should print empty test file", async () => {
  const tests: TestFile[] = [
    {
      path: testFileNames[0],
      isEmpty: true,
      groups: [],
    },
  ];

  const report = await testRunner.runTestsAndPrint(tests);

  expect(report).toMatchObject<SemiRunnerReport>({
    totalTestFiles: 1,
    totalTestFilesFailed: 0,
    totalTestFilesPassed: 0,
    totalTests: 0,
    totalTestsFailed: 0,
    totalTestsPassed: 0,
    totalEmptyTestFiles: 1,
    totalEmptyTests: 0,
  });
  expect(removeANSIColorStyle(logUpdate.stder)).toMatchSnapshot();
});

it("should print empty test file", async () => {
  const tests: TestFile[] = [
    {
      path: testFileNames[0],
      isEmpty: false,
      groups: [
        {
          name: "",
          tests: [],
          subGroups: [
            {
              name: "subgroup",
              tests: [
                {
                  name: "test",
                  testsFunctions: [],
                  subTests: [
                    {
                      name: "subtest",
                      testsFunctions: [() => Promise.resolve({ pass: true })],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      groups: [],
      isEmpty: true,
      path: testFileNames[1],
    },
  ];

  const report = await testRunner.runTestsAndPrint(tests);

  expect(report).toMatchObject<SemiRunnerReport>({
    totalTestFiles: 2,
    totalTestFilesFailed: 0,
    totalTestFilesPassed: 1,
    totalTests: 2,
    totalTestsFailed: 0,
    totalTestsPassed: 1,
    totalEmptyTestFiles: 1,
    totalEmptyTests: 1,
  });
  expect(removeANSIColorStyle(logUpdate.stder)).toMatchSnapshot();
});

it("should print report for 1 test file, 2 test clausure and 1 failed function and 1 passed function", async () => {
  const data: TestFileGeneratorInfo = {
    amountOfTestFiles: 1,
    testFunctionsReport: [
      {
        pass: false,
        message: buildReportMessage(diff({ a: 1 }, { a: 2 })),
      },
    ],
    amountOfTests: 1,
  };

  const tests = generateTestFile(data);

  const report = await testRunner.runTestsAndPrint(tests);

  expect(report).toMatchObject<SemiRunnerReport>({
    totalTestFiles: data.amountOfTestFiles,
    totalTestFilesFailed: 1,
    totalTestFilesPassed: 0,
    totalTests: 1,
    totalTestsFailed: 1,
    totalTestsPassed: 0,
    totalEmptyTestFiles: 0,
    totalEmptyTests: 0,
  });
  expect(removeANSIColorStyle(logUpdate.stder)).toMatchSnapshot();
});

it("should print report for 1 test file, 2 test clausure and 1 failed function and 1 passed function with stackTrace", async () => {
  const data: TestFileGeneratorInfo = {
    amountOfTestFiles: 1,
    testFunctionsReport: [
      {
        pass: false,
        message: buildReportMessage(diff({ a: 1 }, { a: 2 })),
        trace: buildReportMessage(
          "at TestExecutor.printReportData (src/core/testExecutor.ts:202:13)\n" +
            "at Object.<anonymous> (tests/utils/colors.test.ts:29:39)",
        ),
      },
    ],
    amountOfTests: 1,
  };

  const tests = generateTestFile(data);

  const report = await testRunner.runTestsAndPrint(tests);

  expect(report).toMatchObject<SemiRunnerReport>({
    totalTestFiles: data.amountOfTestFiles,
    totalTestFilesFailed: 1,
    totalTestFilesPassed: 0,
    totalTests: 1,
    totalTestsFailed: 1,
    totalTestsPassed: 0,
    totalEmptyTestFiles: 0,
    totalEmptyTests: 0,
  });
  expect(removeANSIColorStyle(logUpdate.stder)).toMatchSnapshot();
});

it("should print for a file that throws error in test function", async () => {
  const reports = await testRunner.runTest({
    testsFunctions: [
      (_: any) => {
        throw new Error("error message");
      },
    ],
  });

  expect(reports[0].message).toEqual("error message");
  expect(reports[0].pass).toEqual(false);
});

it("should print for a file that throws unknown error in test function", async () => {
  const reports = await testRunner.runTest({
    testsFunctions: [
      (_: any) => {
        // tslint:disable-next-line: no-string-throw
        throw "error message";
      },
    ],
  });

  expect(reports[0].message).toEqual(`\"error message\"`);
  expect(reports[0].pass).toEqual(false);
});

it("should execute hooks with failure", async () => {
  _afterEach(() => {
    throw new Error("error in beforeEachFunctions");
  });

  _beforeEach(() => {
    throw new Error("error in afterEachFunctions");
  });

  const report = await testRunner.runTest({
    testsFunctions: [
      (_: any) => {
        return Promise.resolve({ pass: true });
      },
    ],
  });

  expect(report[0].pass).toEqual(true);
});

it("should execute hooks with failure (failure is not a Error instance)", async () => {
  _afterEach(() => {
    throw { message: "error in beforeEachFunctions" };
  });

  const report = await testRunner.runTest({
    testsFunctions: [
      (_: any) => {
        return Promise.resolve({ pass: true });
      },
    ],
  });

  expect(report[0].pass).toEqual(true);
});

it("should hook, but execute just once", async () => {
  _afterEach(() => {
    throw { message: "error in beforeEachFunctions" };
  });

  const report = await testRunner.runTest({
    testsFunctions: [
      (_: any) => {
        return Promise.resolve({ pass: true });
      },
      (_: any) => {
        return Promise.resolve({ pass: true });
      },
    ],
  });

  expect(report[0].pass).toEqual(true);
});
