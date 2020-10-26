import { testCollector } from "../common";

/**
 * Declare a bunch of code that will be executed before each test begin
 *
 * They will be executed following a sequence of files
 * reads and the positions of each `beforeEach` call.
 *
 * @param fn code that will be executed **before** tests start
 */
export function beforeEach(fn: () => void) {
  if (fn) {
    testCollector.beforeEachFunctions.enqueue(fn);
  }
}
