import { testCollector } from "../common/testCollector";

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
    testCollector.hasTest = true;

    if (action) {
      try {
        await action();

        testCollector.tests.push({
          name,
          testsFunctions: testCollector.cloneTestFunctions(),
        });
      } catch (error) {
        console.error(error);
        return;
      }
    }

    testCollector.testsFunctions = [];
    testCollector.hasTest = false;
  });
}
