/* eslint-disable no-console */
import testUtils from "./testUtils";
import { CliOutput } from "./types";

interface ITestFile {
  folder: string;
  testFile: string;
  exitCodeExpectation: number;
}

const testFiles: ITestFile[] = [
  {
    folder: "toReturn",
    testFile: "test1.spec.ts",
    exitCodeExpectation: 0,
  },
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
      () => {
        const command = testUtils.buildCommandWithConfigPath(testFile.folder, testFile.testFile);
        return testUtils.runCLI(command);
      },
    ];
  }
}

export const generator = createTestFunctionsGenerator();
