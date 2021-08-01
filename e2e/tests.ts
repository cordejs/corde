/* eslint-disable no-console */
import path from "path";
import testUtils from "./testUtils";
import { CliOutput } from "./types";

interface ITestFile {
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
    folder: "toReturn",
    testFile: "test1.spec.ts",
    exitCodeExpectation: 0,
  },
  // Don't know why this test is broken
  {
    folder: "toReturn",
    testFile: "test2.spec.ts",
    exitCodeExpectation: 1,
  },
  {
    folder: "afterAll",
    testFile: "test1.spec.ts",
    exitCodeExpectation: 0,
  },
  {
    folder: "afterAll",
    testFile: "test2.spec.ts",
    exitCodeExpectation: 0,
  },
  {
    folder: "afterEach",
    testFile: "test1.spec.ts",
    exitCodeExpectation: 0,
  },
  {
    folder: "afterEach",
    testFile: "test2.spec.ts",
    exitCodeExpectation: 0,
  },
  {
    folder: "beforeEach",
    testFile: "test1.spec.ts",
    exitCodeExpectation: 0,
  },
  {
    folder: "beforeEach",
    testFile: "test2.spec.ts",
    exitCodeExpectation: 0,
  },
  {
    folder: "beforeStart",
    testFile: "test1.spec.ts",
    exitCodeExpectation: 0,
  },
  {
    folder: "beforeStart",
    testFile: "test2.spec.ts",
    exitCodeExpectation: 0,
  },
  {
    folder: "checkVersion",
    testFile: "test1.spec.ts",
    exitCodeExpectation: 0,
    isRequiredFunction: true,
  },
];

function* createTestFunctionsGenerator(): Generator<
  [Pick<ITestFile, "exitCodeExpectation" | "testFile">, () => Promise<CliOutput>],
  void,
  unknown
> {
  for (const testFile of testFiles) {
    yield [
      {
        exitCodeExpectation: testFile.exitCodeExpectation,
        testFile: `${testFile.folder}/${testFile.testFile}`,
      },
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
