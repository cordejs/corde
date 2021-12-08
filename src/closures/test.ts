import { runtime } from "../core";
import { testCollector } from "../core";
import { VoidLikeFunction } from "../types";
import { executePromiseWithTimeout, resolveName } from "../utils";

export const test: corde.ITestClousure = <T extends any>(
  description: T,
  assertion: VoidLikeFunction,
  timeout?: number | undefined,
) => {
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
      }, timeout ?? runtime.timeout);
    },
    toResolveName: () => resolveName(description),
  });
};

/**
 * Alias for `test`
 */
export const it = test;
