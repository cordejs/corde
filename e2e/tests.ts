/* eslint-disable no-console */
import path from "path";
import { testCases } from "./cases";
import testUtils from "./testUtils";
import { CliOutput, ITestFile, TestModule } from "./types";

function* createTestFunctionsGenerator(): Generator<
  [ITestFile, () => Promise<CliOutput>],
  void,
  unknown
> {
  for (const testCase of testCases) {
    yield [
      testCase,
      async () => {
        if (testCase.isRequiredFunction) {
          const module: TestModule = await import(
            path.resolve(process.cwd(), "./e2e", testCase.folder, testCase.testFile)
          );
          return module.testFn();
        }
        const command = testUtils.buildCommandWithConfigPath(testCase.folder, testCase.testFile);
        return testUtils.runCLI(command);
      },
    ];
  }
}
export const generator = createTestFunctionsGenerator();
