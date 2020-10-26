import { testCollector } from "../common/testCollector";

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
 * beforeStart(() => {
 *   bot.login(config.botTestToken);
 * });
 *
 * @param fn code that will be executed **before** tests start
 */
export function beforeStart(fn: () => void) {
  if (fn) {
    testCollector.beforeStartFunctions.enqueue(fn);
  }
}
