import { testCollector } from "../common";

/**
 * Declare a bunch of code that will be executed **after each** test.
 *
 * More than one declaration of this code results in a list
 * of functions to run, following a sequence of files
 * reads and the positions of each `afterEach` call.
 *
 * @param fn code that will be executed **after each** tests finish
 */
export function afterEach(fn: () => void) {
  if (fn) {
    testCollector.afterEachFunctions.enqueue(fn);
  }
}
