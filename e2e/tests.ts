/* eslint-disable no-console */
import testUtils from "./testUtils";

interface TestFile {
  folder: string;
  fileName: string;
}

const testFiles: TestFile[] = [
  {
    fileName: "bot_case1.spec.ts",
    folder: "toReturn",
  },
];

type VoidPromise = () => Promise<void>;

function* createTestFunctionsGenerator(): Generator<VoidPromise, void, VoidPromise> {
  for (const testFile of testFiles) {
    yield async () => {
      const command = testUtils.buildCommandWithConfigPath(testFile.folder, testFile.fileName);
      await testUtils.runCLIAndSaveOutput(testFile.fileName, command);
    };
  }
}

export const generator = createTestFunctionsGenerator();
