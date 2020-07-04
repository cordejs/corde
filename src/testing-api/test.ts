import { testCollector } from '../common/testColletor';

/**
 * Represents a group of commands.
 *
 * @example
 *
 * test('Hello command should return... hello!!', () => {
 *   command('hello').shouldReturn('hello!!');
 * });
 *
 * @param name Name of the test
 * @param action Commands related to this test
 */
export function test(name: string, action: () => void) {
  testCollector.hasTest = true;

  if (action) {
    action();
  }

  if (name) {
    testCollector.tests.push({
      name,
      testsFunctions: testCollector.cloneTestFunctions(),
    });
  }

  testCollector.hasTest = false;
  testCollector.cleanTestFunctions();
}
