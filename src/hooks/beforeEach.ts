import { testCollector } from "../common";
import { getStackTrace } from "../utils";
import { hookBuilder } from "./hookBuilder";

/**
 * Declare a bunch of code that will be executed before each test begin
 *
 * They will be executed following a sequence of files
 * reads and the positions of each `beforeEach` call.
 *
 * @param fn code that will be executed **before** tests start
 * @since 2.0
 */
export function beforeEach(fn: () => void | Promise<void>) {
  if (fn) {
    const trace = getStackTrace();
    hookBuilder(testCollector.beforeEachFunctions, fn, trace, "BeforeEachError");
  }
}
