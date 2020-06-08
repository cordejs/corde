import { FilesNotFoundError } from '../errors';
import Thread from '../building/thread';
import { clone } from '../utils/utils';
import { Test, AssertionProps } from '../building/models';

export async function getTestList(files: string[]) {
  if (files) {
    Thread.isBuildRunning = true;
    Thread.groups = [];
    for (const i in files) {
      if (files.hasOwnProperty(i)) {
        require(files[i]);
      }
    }
    Thread.isBuildRunning = false;

    if (Thread.tests && Thread.tests.length > 0) {
      const testsCloned = clone(Thread.tests) as Test[];
      Thread.groups.push({ tests: testsCloned });
      Thread.tests = [];
    }

    if (Thread.assertions && Thread.assertions.length > 0) {
      const assertionsCloned = clone(Thread.assertions) as AssertionProps[];
      Thread.groups.push({ tests: [{ assertions: assertionsCloned }] });
      Thread.assertions = [];
    }

    return Thread.groups;
  }
  throw new FilesNotFoundError();
}
