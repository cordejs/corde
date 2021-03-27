import { testCollector } from "../common";
import { resolveName } from "../utils";

/**
 * Represents a group of commands.
 *
 * @example
 *
 * test('Hello command should return... hello!!', () => {
 *   expect('hello').toReturn('hello!!');
 * });
 *
 * @param name Name of the test
 * @param action Commands related to this test
 * @since 1.0
 */
export function test<T extends any>(
  name: T,
  action: () => void | Promise<void> | PromiseLike<void>,
) {
  testCollector.addToTestClousure(async () => {
    testCollector.isInsideTestClausure = true;

    if (action) {
      await action();

      const testName = await resolveName(name);
      if (testCollector.testsFunctions && testCollector.testsFunctions.length) {
        testCollector.tests.push({
          name: testName,
          testsFunctions: testCollector.cloneTestFunctions(),
        });
      }
    }

    testCollector.testsFunctions = [];
    testCollector.isInsideTestClausure = false;
  });
}
