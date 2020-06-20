import fs from 'fs';
import { ConfigFileNotFoundError, FilesNotFoundError } from '../errors';
import ConfigOptions from '../models';
import runtime from '../common/runtime';
import testCollector from '../common/testColletor';

class Reader {
  /**
   * Read config file(*.json) from root of project
   * and validates it
   * @throws
   */
  loadConfig(): ConfigOptions {
    let _config: ConfigOptions;

    if (runtime.configFilePath) {
    }
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
      testCollector.isCollecting = true;
      testCollector.groups = [];
      for (const i in files) {
        if (files.hasOwnProperty(i)) {
          require(files[i]);
        }
      }
      testCollector.isCollecting = false;

      addTestsGroupmentToGroupIfExist();
      addTestFuncionsToGroupIfExists();
      return testCollector.groups;
    }
    throw new FilesNotFoundError();
  }
}

function addTestsGroupmentToGroupIfExist() {
  if (testCollector.tests && testCollector.tests.length > 0) {
    const testsCloned = testCollector.tests.map((test) => test);
    testCollector.groups.push({ tests: testsCloned });
    testCollector.tests = [];
  }
}

function addTestFuncionsToGroupIfExists() {
  if (testCollector.hasTestFunctions()) {
    const testsCloned = testCollector.cloneTestFunctions();
    testCollector.groups.push({ tests: [{ testsFunctions: testsCloned }] });
    testCollector.cleanTestFunctions();
  }
}

const reader = new Reader();
export default reader;
