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
 */
export function test(name: string, action: () => void) {
  testCollector.hasTest = true;

  if (action) {
    action();

    testCollector.tests.push({
      name,
      testsFunctions: testCollector.cloneTestFunctions(),
    });
  }

  testCollector.testsFunctions = [];
  testCollector.hasTest = false;
}
