import { runtime } from "../core/runtime";
import { testCollector } from "../core/testCollector";
import { VoidLikeFunction } from "../types";
import { executePromiseWithTimeout, resolveName } from "../utils";

/**
 * Define a single test. A test should contain one or more expectations that test action of
 * the discord bot.
 * A spec whose expectations all succeed will be passing and a spec with any failures will fail.
 *
 * @param expectationDescription Textual description of what this test is checking
 * @param assertion Function that contains the code of your test. If not provided it will be ignored in the report.
 * @param timeout Custom timeout for an async test
 *
 * @since 1.0
 */
export function test<T extends any>(
  expectationDescription: T,
  assertion: VoidLikeFunction,
  timeout?: number | undefined,
) {
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
    toResolveName: () => resolveName(expectationDescription),
  });
}

/**
 * Alias for `test`
 */
export const it = test;
