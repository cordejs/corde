import { testCollector } from "../common/testCollector";

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
 * @param fn code that will be executed **after** tests start
 */
export function afterAll(fn: () => void) {
  if (fn) {
    testCollector.afterAllFunctions.enqueue(fn);
  }
}
