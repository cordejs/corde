import fs from 'fs';
import { ConfigFileNotFoundError, FilesNotFoundError } from '../errors';
import ConfigOptions from '../models';
import runtime from '../common/runtime';
import testCollector from '../common/testColletor';
import path from 'path';
class Reader {
  /**
   * Read config file(*.json) from root of project
   * and validates it
   * @throws
   */
  loadConfig(): ConfigOptions {
    let _config: ConfigOptions;

    let jsonFilePath = path.resolve(process.cwd(), 'corde.json');
    let tsFilePath = path.resolve(process.cwd(), 'corde.ts');
    let jsFilePath = path.resolve(process.cwd(), 'corde.js');

    if (runtime.configFilePath) {
      return loadConfigFromConfigFilePath();
    }

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

function loadConfigFromConfigFilePath(): ConfigOptions {
  const filePath = path.resolve(process.cwd(), runtime.configFilePath);
  const fileExt = path.extname(filePath);

  console.log(filePath);

  if (!fs.existsSync(filePath)) {
    throw new Error('Path to config not found');
  }

  if (fileExt === '.json') {
    return JSON.parse(fs.readFileSync(filePath).toString());
  } else if (fileExt === '.js' || fileExt === '.ts') {
    return require(filePath);
  } else {
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
