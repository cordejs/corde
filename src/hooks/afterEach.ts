import { testCollector } from "../common";
import { getStackTrace } from "../utils";
import { hookBuilder } from "./hookBuilder";

/**
 * Declare a bunch of code that will be executed **after each** test.
 *
 * More than one declaration of this code results in a list
 * of functions to run, following a sequence of files
 * reads and the positions of each `afterEach` call.
 *
 * @param fn code that will be executed **after each** tests finish
 * @since 2.0
 */
export function afterEach(fn: () => void | Promise<void>) {
  if (fn) {
    const trace = getStackTrace();
    hookBuilder(testCollector.afterEachFunctions, fn, trace, "AfterEachError");
  }
}
