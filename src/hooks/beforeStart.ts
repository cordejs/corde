import { testCollector } from "../common";
import { getStackTrace } from "../utils";
import { hookBuilder } from "./hookBuilder";

/**
 * Declare a bunch of code that will be executed before tests begins.
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
 * beforeStart(async () => {
 *   await bot.login(config.botTestToken);
 * });
 *
 * @param fn code that will be executed **before** tests start.
 * @param timeout Time that Corde should wait for the execution of this function.
 * **it overrides the timeout defined in configs**.
 *
 * @since 1.0
 */
export function beforeStart(fn: () => void | Promise<void>, timeout?: number) {
  if (fn) {
    const trace = getStackTrace();
    hookBuilder({
      queueToAdd: testCollector.beforeStartFunctions,
      fn,
      trace,
      errorTitle: "BeforeStartError",
      timeout,
    });
  }
}
