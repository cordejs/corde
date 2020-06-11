import { FilesNotFoundError } from '../errors';
import Thread from '../building/thread';

export function getTestsFromFiles(files: string[]) {
  if (files) {
    Thread.isBuildRunning = true;
    Thread.groups = [];
    for (const i in files) {
      if (files.hasOwnProperty(i)) {
        require(files[i]);
      }
    }
    Thread.isBuildRunning = false;

    addTestsGroupmentToGroupIfExist();
    addTestFuncionsToGroupIfExists();

    return Thread.groups;
  }
  throw new FilesNotFoundError();
}

function addTestsGroupmentToGroupIfExist() {
  if (Thread.tests && Thread.tests.length > 0) {
    const testsCloned = Thread.tests.map((test) => test);
    Thread.groups.push({ tests: testsCloned });
    Thread.tests = [];
  }
}

function addTestFuncionsToGroupIfExists() {
  if (Thread.testsFunctions && Thread.testsFunctions.length > 0) {
    const testsCloned = Thread.testsFunctions.map((test) => test);
    Thread.groups.push({ tests: [{ testsFunctions: testsCloned }] });
    Thread.assertions = [];
  }
}
