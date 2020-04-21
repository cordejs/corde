import Thread from './thread';
import log from '../utils/log';
import { clone } from '../utils/utils';
import { AssertionProps } from './models';

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
