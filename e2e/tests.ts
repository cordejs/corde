/* eslint-disable no-console */
import path from "path";
import testUtils from "./testUtils";
import { CliOutput } from "./types";

interface ITestFile {
  id: number;
  folder: string;
  testFile: string;
  exitCodeExpectation: number;
  isRequiredFunction?: boolean;
}

interface TestModule {
  testFn: () => Promise<CliOutput>;
}

const testFiles: ITestFile[] = [
  {
    id: 1,
    folder: "toReturn",
    testFile: "test1.spec.ts",
    exitCodeExpectation: 0,
  },
  // Don't know why this test is broken
  {
    id: 2,
    folder: "toReturn",
    testFile: "test2.spec.ts",
    exitCodeExpectation: 1,
  },
  {
    id: 3,
    folder: "afterAll",
    testFile: "test1.spec.ts",
    exitCodeExpectation: 0,
  },
  {
    id: 4,
    folder: "afterAll",
    testFile: "test2.spec.ts",
    exitCodeExpectation: 0,
  },
  {
    id: 5,
    folder: "afterEach",
    testFile: "test1.spec.ts",
    exitCodeExpectation: 0,
  },
  {
    id: 6,
    folder: "afterEach",
    testFile: "test2.spec.ts",
    exitCodeExpectation: 0,
  },
  {
    id: 7,
    folder: "beforeEach",
    testFile: "test1.spec.ts",
    exitCodeExpectation: 0,
  },
  {
    id: 8,
    folder: "beforeEach",
    testFile: "test2.spec.ts",
    exitCodeExpectation: 0,
  },
  {
    id: 9,
    folder: "beforeStart",
    testFile: "test1.spec.ts",
    exitCodeExpectation: 0,
  },
  {
    id: 10,
    folder: "beforeStart",
    testFile: "test2.spec.ts",
    exitCodeExpectation: 0,
  },
  {
    id: 11,
    folder: "checkVersion",
    testFile: "test1.spec.ts",
    exitCodeExpectation: 0,
    isRequiredFunction: true,
  },
];

function* createTestFunctionsGenerator(): Generator<
  [ITestFile, () => Promise<CliOutput>],
  void,
  unknown
> {
  for (const testFile of testFiles) {
    yield [
      testFile,
      async () => {
        if (testFile.isRequiredFunction) {
          const module: TestModule = await import(
            path.resolve(process.cwd(), "./e2e", testFile.folder, testFile.testFile)
          );
          return module.testFn();
        }

        const command = testUtils.buildCommandWithConfigPath(testFile.folder, testFile.testFile);
        return testUtils.runCLI(command);
      },
    ];
  }
}

export const generator = createTestFunctionsGenerator();
