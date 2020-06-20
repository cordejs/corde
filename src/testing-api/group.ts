import testCollector from '../common/testColletor';

/**
 * Represents a group of tests.
 *
 * @example
 *
 * group('main commands', () => {
 *   test('Hello command should return... hello!!', () => {
 *      command('hello').shouldReturn('hello!!');
 *   });
 * });
 *
 * @param name Name of the group
 * @param action Tests related to this group
 * @public
 */
export function group(name: string, action: () => void) {
  testCollector.hasGroup = true;

  if (action) {
    action();
  }

  testCollector.groups.push({
    name,
    tests: testCollector.tests.map((test) => test),
  });

  testCollector.tests = [];
  testCollector.hasGroup = false;
}
