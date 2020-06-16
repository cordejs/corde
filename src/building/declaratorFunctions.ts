import Thread from './thread';
import matcher, { matcherWithNot } from './matcher';
import { Test, Matches, MatchesWithNot } from '../models';
import { clone } from '../utils/utils';
import { AssertionProps } from '../models';

/**
 * Declare a bunch of code that will be executed **after** tests beging
 * 
 * More than one declaration of this code results in a list
 * of functions to run.

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
  Thread.afterAllFunctions.push(fn);
}

/**
 * Declare a bunch of code that will be executed before tests beging.
 * 
 * More than one declaration of this code results in a list
 * of functions to run.

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
  Thread.beforeStartFunctions.push(fn);
}

/**
 * Receives wich command will be tested.
 *
 * @param commandName Command name.
 *
 * @description Do not inform the command prefix if
 * it's already informed in **configs**
 *
 * @returns The **Compare** object, where will handle
 * the type of response is expected.
 */
export function command(commandName: string): MatchesWithNot {
  return matcherWithNot(commandName);
}

/**
 * Represents a group of tests.
 *
 * @example
 *
 * group('main commands', () => {
 *   test('Hello command should return... hello!!', () => {
 *      command('hello').shouldReturn('hello!!');
 *   });
 * });
 *
 * @param name Name of the group
 * @param action Tests related to this group
 * @public
 */
export function group(name: string, action: () => void) {
  Thread.hasGroup = true;

  if (action) {
    action();
  }

  Thread.groups.push({
    name: name,
    tests: Thread.tests.map((test) => test),
  });

  Thread.tests = [];
  Thread.hasGroup = false;
}

/**
 * Represents a group of commands.
 *
 * @example
 *
 * test('Hello command should return... hello!!', () => {
 *   command('hello').shouldReturn('hello!!');
 * });
 *
 * @param name Name of the test
 * @param action Commands related to this test
 * @public
 */
export function test(name: string, action: () => void) {
  Thread.hasTest = true;

  if (action) {
    action();
  }

  Thread.tests.push({
    name: name,
    testsFunctions: Thread.testsFunctions.map((testsFn) => testsFn),
  });

  Thread.hasTest = false;
  Thread.testsFunctions = [];
}
