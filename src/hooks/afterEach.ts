import { testCollector } from "../common/testCollector";
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
 * @param timeout Time that Corde should wait for the execution of this function.
 * **it overrides the timeout defined in configs**.
 *
 * @since 2.0
 */
export function afterEach(fn: () => void | Promise<void>, timeout?: number) {
  if (fn) {
    const trace = getStackTrace();
    hookBuilder({
      queueToAdd: testCollector.afterEachFunctions,
      fn,
      trace,
      errorTitle: "AfterEachError",
      timeout,
    });
  }
}
