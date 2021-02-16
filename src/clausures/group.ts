import { testCollector } from "../common";

/**
 * Represents a group of tests.
 *
 * @example
 *
 * group('main commands', () => {
 *   test('Hello command must return... hello!!', () => {
 *      expect('hello').toReturn('hello!!');
 *   });
 * });
 *
 * @param name Name of the group
 * @param action Tests related to this group
 * @since 1.0
 */
export function group(name: string, action: () => void | Promise<void>) {
  testCollector.addToGroupClousure(async () => {
    testCollector.hasGroup = true;

    if (action) {
      await action();
      await testCollector.executeTestClojure();

      // In case of expect() be added in test clausure
      // that is contained in action()
      if (testCollector.tests && testCollector.tests.length > 0) {
        testCollector.groups.push({
          name,
          tests: testCollector.tests.map((test) => test),
        });
      }

      // Case expect() be added inside the group clausure
      if (testCollector.hasTestFunctions()) {
        const testsCloned = testCollector.cloneTestFunctions();
        testCollector.groups.push({ name, tests: [{ testsFunctions: testsCloned }] });
        testCollector.clearTestFunctions();
      }
    }

    testCollector.tests = [];
    testCollector.hasGroup = false;
  });
}
