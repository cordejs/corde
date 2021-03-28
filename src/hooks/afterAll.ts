import { testCollector } from "../common";
import { getStackTrace } from "../utils";
import { hookBuilder } from "./hookBuilder";

/**
 * Declare a bunch of code that will be executed **after** tests begins
 *
 * More than one declaration of this code results in a list
 * of functions to run.
 *
 * They will be executed following a sequence of files
 * reads and the positions of each `afterAll` call.
 *
 * @example
 * // The main function of this is for start a bot if you haven't started it yet
 *
 * const bot = new Discord.Client();
 * afterAll(() => {
 *   bot.destroy();
 * });
 *
 * @param fn Code that will be executed **after** tests start
 * @param timeout Time that Corde should wait for the execution of this function.
 * **it overrides the timeout defined in configs**.
 *
 * @since 1.0
 */
export function afterAll(fn: () => void | Promise<void>, timeout?: number) {
  if (fn) {
    const trace = getStackTrace();
    hookBuilder({
      queueToAdd: testCollector.afterAllFunctions,
      fn,
      trace,
      errorTitle: "AfterAllError",
      timeout,
    });
  }
}
