import { FilesNotFoundError } from '../errors';
import Thread from '../building/thread';
import { clone } from '../utils/utils';
import { Test, AssertionProps } from '../building/models';
import fs from 'fs';
import path from 'path';
import { Consts } from '../consts';

/**
 * Gets the full path of all informed in parameter.
 * This list of files can also include folders, witch will be read
 * recursively.
 *
 * @param filesDir array of file and/or folders that contains test files.
 *
 */
export function getTestFilesFromDir(folderFilepath: string[] | string) {
  const files = [];
  if (Array.isArray(folderFilepath)) {
    folderFilepath.forEach((fileDir) => {
      files.push(...getTestFilesFromDir(fileDir));
    });
  } else {
    const filePath = folderFilepath;
    const stats = fs.lstatSync(filePath);
    if (stats.isDirectory()) {
      try {
        fs.readdirSync(filePath).forEach((fileDir) => {
          files.push(...getTestFilesFromDir(path.resolve(filePath, fileDir)));
        });
      } catch (err) {
        throw new Error(err);
      }
    } else if (stats.isFile() && filePath.includes(Consts.DEFAULT_TEST_FILE_EXTENSION)) {
      files.push(path.resolve(filePath));
    }
  }
  return files;
}

/**
 *
 * @param files
 */
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

function validadeDir(dir: string) {
  if (dir) {
    throw new Error('No tests dir was informed');
  } else if (!fs.existsSync(dir)) {
    throw new Error(`Path ${dir} does not exists}`);
  }
}
