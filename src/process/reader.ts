import { FilesNotFoundError, ConfigFileNotFoundError } from '../errors';
import Thread from '../building/thread';
import ConfigOptions from '../models';
import fs from 'fs';

class Reader {
  /**
   * Read config file(*.json) from root of project
   * and validates it
   * @throws
   */
  loadConfig(): ConfigOptions {
    let _config: ConfigOptions;

    const jsonFilePath = `${process.cwd()}/corde.json`;
    const tsFilePath = `${process.cwd()}/corde.ts`;
    const jsFilePath = `${process.cwd()}/corde.js`;

    if (fs.existsSync(jsonFilePath)) {
      _config = JSON.parse(fs.readFileSync(jsonFilePath).toString());
    } else if (fs.existsSync(tsFilePath)) {
      _config = require(tsFilePath);
    } else if (fs.existsSync(jsFilePath)) {
      _config = require(jsFilePath);
    } else {
      throw new ConfigFileNotFoundError();
    }

    if (_config) {
      return _config;
    } else {
      throw new Error('Invalid configuration file');
    }
  }

  getTestsFromFiles(files: string[]) {
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
    Thread.testsFunctions = [];
  }
}

const reader = new Reader();
export default reader;
