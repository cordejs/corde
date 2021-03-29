import { runtime, testCollector } from "../common";
import { VoidLikeFunction } from "../types";
import { executePromiseWithTimeout, resolveName } from "../utils";

/**
 * Define a single test. A test should contain one or more expectations that test a action of
 * the discord bot.
 * A spec whose expectations all succeed will be passing and a spec with any failures will fail.
 *
 * @param expectationDescription Textual description of what this test is checking
 * @param assertion Function that contains the code of your test. If not provided the it will be ignored in report.
 * @param timeout Custom timeout for an async group. Overrides the timeout setting defined in configs
 *
 * @since 1.0
 */
export function test<T extends any>(
  expectationDescription: T,
  assertion: VoidLikeFunction,
  timeout?: number | undefined,
) {
  testCollector.addToTestClousure(async () => {
    await executePromiseWithTimeout<void>(async (resolve) => {
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
      resolve();
    }, timeout ?? runtime.timeOut);
  });
}
