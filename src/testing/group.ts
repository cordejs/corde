import Thread from './thread';
import log from '../log';
import { Group, Test } from './models';
import { clone } from '../utils';

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
