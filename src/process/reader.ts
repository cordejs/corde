import { FilesNotFoundError } from '../errors';
import Thread from '../building/thread';
import path from 'path';

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
    return Thread.groups;
  }
  throw new FilesNotFoundError();
}
