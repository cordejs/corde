import runtime from "../core/runtime";
import { VoidLikeFunction } from "../types";
import { resolveName } from "../utils/resolveName";
import { executePromiseWithTimeout } from "../utils/executePromiseWithTimeout";

export const test: corde.ITestClosure = <T>(
  description: T,
  assertion: VoidLikeFunction,
  timeout?: number | undefined,
) => {
  const { testCollector } = runtime;

  const _internalTest = async () => {
    testCollector.currentTestFile.isInsideTestClosure = true;

    if (assertion) {
      await assertion();
    }

    testCollector.currentTestFile.isInsideTestClosure = false;
  };

  testCollector.currentTestFile.addTest({
    action: () => {
      return executePromiseWithTimeout<void>(async (resolve, reject) => {
        try {
          await _internalTest();
          resolve();
        } catch (error) {
          reject(error);
        }
      }, timeout ?? runtime.configs.suiteTimeout);
    },
    toResolveName: () => resolveName(description),
  });
};

/**
 * Alias for `test`
 */
export const it = test;
