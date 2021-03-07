import chalk from "chalk";
import { TestExecutor } from "../../src/core/testExecutor";
import {
  Group,
  RunnerReport,
  SemiRunnerReport,
  Test,
  TestFile,
  testFunctionType,
  TestReport,
} from "../../src/types";
import { buildReportMessage, LogUpdate } from "../../src/utils";
import { removeANSIColorStyle } from "../testHelper";

interface TestFileGeneratorInfo {
  amountOfTests: number;
  amountOfTestFunctions?: number;
  testFunctionsReport?: TestReport[];
  amountOfTestFiles: number;
}

const testFileNames = [
  "/tests/file1.test.ts",
  "/tests/file2.test.ts",
  "/tests/file3.test.ts",
  "/tests/file4.test.ts",
];

const testNames = ["test case1", "test case2", "test case3", "test case4"];

function generateTestFile(generatorData: TestFileGeneratorInfo) {
  const testFiles: TestFile[] = [];
  const testFunctions: testFunctionType[] = [];
  const tests: Test[] = [];

  for (const report of generatorData.testFunctionsReport || []) {
    testFunctions.push(() => Promise.resolve(report));
  }

  for (let i = 0; i < generatorData.amountOfTestFunctions; i++) {
    testFunctions.push(() =>
      Promise.resolve<TestReport>({
        pass: true,
      }),
    );
  }

  // Updates the value if pass testFunctions.
  generatorData.amountOfTestFunctions = testFunctions.length;

  for (let i = 0; i < generatorData.amountOfTests; i++) {
    tests.push({
      name: testNames[i],
      testsFunctions: testFunctions,
    });
  }

  for (let i = 0; i < generatorData.amountOfTestFiles; i++) {
    testFiles.push({
      path: testFileNames[i],
      isEmpty: false,
      groups: [
        {
          name: "group",
          tests: tests,
        },
      ],
    });
  }

  return testFiles;
}

let logUpdate: LogUpdate;
let testRunner: TestExecutor;

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
        message: buildReportMessage("expected: hi", "received: hi!"),
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
        message: buildReportMessage("expected: hi", "received: hi!"),
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
        message: buildReportMessage("expected: hi", "received: hi!"),
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
        message: buildReportMessage("expected: hi", "received: hi!"),
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
        message: buildReportMessage("expected: hi", "received: hi!"),
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
                    message: buildReportMessage("expected: hi", "received: hi!"),
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
    totalTests: 1,
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
    totalTestFiles: 0,
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
    totalTestFiles: 1,
    totalTestFilesFailed: 0,
    totalTestFilesPassed: 1,
    totalTests: 1,
    totalTestsFailed: 0,
    totalTestsPassed: 1,
    totalEmptyTestFiles: 1,
    totalEmptyTests: 1,
  });
  expect(removeANSIColorStyle(logUpdate.stder)).toMatchSnapshot();
});
