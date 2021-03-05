import { testCollector } from "../common";

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
export function test(name: string, action: () => void | Promise<void>) {
  testCollector.addToTestClousure(async () => {
    testCollector.isInsideTestClausure = true;

    if (action) {
      await action();

      testCollector.tests.push({
        name,
        testsFunctions: testCollector.cloneTestFunctions(),
      });
    }

    testCollector.testsFunctions = [];
    testCollector.isInsideTestClausure = false;
  });
}
