import fs from "fs";
import path from "path";
import { runtime } from "../common";
import { testCollector } from "../common/testColletor";
import { ConfigFileNotFoundError, FilesNotFoundError } from "../errors";
import ConfigOptions from "../interfaces";

class Reader {
  /**
   * Read config file(*.json) from root of project
   * and validates it
   * @throws
   */
  public loadConfig(): ConfigOptions {
    let _config: ConfigOptions;

    const jsonFilePath = path.resolve(process.cwd(), "corde.json");
    const tsFilePath = path.resolve(process.cwd(), "corde.ts");
    const jsFilePath = path.resolve(process.cwd(), "corde.js");

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

    if (!_config || Object.keys(_config).length === 0) {
      throw new Error("Invalid configuration file");
    } else {
      return _config;
    }
  }

  public getTestsFromFiles(files: string[]) {
    if (files) {
      testCollector.isCollecting = true;
      testCollector.groups = [];
      for (const file of files) {
        require(file);
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
  let filePath = "";
  if (fs.existsSync(runtime.configFilePath)) {
    filePath = runtime.configFilePath;
  } else {
    filePath = path.resolve(process.cwd(), runtime.configFilePath);
  }
  const fileExt = path.extname(filePath);

  if (!fs.existsSync(filePath)) {
    throw new Error("Path to config not found");
  }

  if (fileExt === ".json") {
    return JSON.parse(fs.readFileSync(filePath).toString());
  } else if (fileExt === ".js" || fileExt === ".ts") {
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
