import { testCollector } from "../common/testCollector";
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
export const test = <T extends any>(
  expectationDescription: T,
  assertion: VoidLikeFunction,
  timeout?: number | undefined,
) => {
  const _internalTest = async () => {
    testCollector.isInsideTestClausure = true;

    if (assertion) {
      await assertion();

      const testName = await resolveName(expectationDescription);
      if (testCollector.testsFunctions && testCollector.testsFunctions.length) {
        testCollector.tests.push({
          name: testName,
          testsFunctions: testCollector.cloneTestFunctions(),
        });
      }
    }

    testCollector.testsFunctions = [];
    testCollector.isInsideTestClausure = false;
  };

  if (timeout) {
    testCollector.addToGroupClousure(async () => {
      await executePromiseWithTimeout<void>(async (resolve) => {
        await _internalTest();
        resolve();
      }, timeout);
    });
  } else {
    testCollector.addToTestClousure(async () => await _internalTest());
  }
};
