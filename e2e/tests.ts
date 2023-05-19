/* eslint-disable no-console */
import path from "path";
import { testCases } from "./cases";
import testUtils from "./testUtils";
import { CliOutput, ITestFile, TestModule } from "./types";

function* createTestFunctionsGenerator(): Generator<
  [ITestFile, string, () => Promise<CliOutput>],
  void,
  unknown
> {
  for (const testCase of testCases) {
    const command = testUtils.buildCommand(testCase.folder, testCase.testFile);
    yield [
      testCase,
      command,
      async () => {
        if (testCase.isRequiredFunction) {
          const module: TestModule = await import(
            path.resolve(process.cwd(), "./e2e", testCase.folder, testCase.testFile)
          );
          return module.testFn();
        }
        return testUtils.runCLI(command);
      },
    ];
  }
}
export const generator = createTestFunctionsGenerator();
