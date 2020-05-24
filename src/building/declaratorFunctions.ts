import Thread from './thread';
import { matcher, Matches } from './matcher';
import { Test } from './models';
import { clone } from '../utils/utils';
import { AssertionProps } from './models';

export function afterAll(fn: () => void) {
  Thread.afterAllFunctions.push(fn);
}

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
export function command(commandName: string): Matches {
  return matcher(commandName);
}

/**
 * Represents a group of tests.
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
    tests: clone(Thread.tests) as Test[],
  });

  Thread.tests = [];
  Thread.hasGroup = false;
}

/**
 * Represents a group of commands
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
    assertions: clone(Thread.assertions) as AssertionProps[],
  });

  Thread.hasTest = false;
  Thread.assertions = [];
}
