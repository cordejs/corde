import { testCollector } from "../common/testCollector";
import { getStackTrace } from "../utils";
import { hookBuilder } from "./hookBuilder";

/**
 * Declare a bunch of code that will be executed before each test begin
 *
 * They will be executed following a sequence of files
 * reads and the positions of each `beforeEach` call.
 *
 * @param fn code that will be executed **before** tests start
 * @param timeout Time that Corde should wait for the execution of this function.
 * **it overrides the timeout defined in configs**.
 *
 * @since 2.0
 */
export function beforeEach(fn: () => void | Promise<void>, timeout?: number) {
  if (fn) {
    const trace = getStackTrace();
    hookBuilder({
      queueToAdd: testCollector.beforeEachFunctions,
      fn,
      trace,
      errorTitle: "BeforeEachError",
      timeout,
    });
  }
}
