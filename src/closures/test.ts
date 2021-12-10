import runtime from "../core";
import { VoidLikeFunction } from "../types";
import { executePromiseWithTimeout, resolveName } from "../utils";

export const test: corde.ITestClousure = <T extends any>(
  description: T,
  assertion: VoidLikeFunction,
  timeout?: number | undefined,
) => {
  const { testCollector } = runtime;
  const _internalTest = async () => {
    testCollector.currentTestFile.isInsideTestClausure = true;

    if (assertion) {
      await assertion();
    }

    testCollector.currentTestFile.isInsideTestClausure = false;
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
      }, timeout ?? runtime.configs.getConfigTimeoutOrDefault());
    },
    toResolveName: () => resolveName(description),
  });
};

/**
 * Alias for `test`
 */
export const it = test;
