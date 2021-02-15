import fs from "fs";
import path from "path";
import { runtime } from "../common";
import { testCollector } from "../common/testCollector";
import ConfigOptions from "../types";
import { FileError } from "../errors";

class Reader {
  /**
   * Read config file(*.json) from root of project
   * and validates it
   * @throws
   */
  public loadConfig(): ConfigOptions {
    let _config: ConfigOptions;

    const jsonFilePath = path.resolve(process.cwd(), "corde.config.json");
    const tsFilePath = path.resolve(process.cwd(), "corde.config.ts");
    const jsFilePath = path.resolve(process.cwd(), "corde.config.js");

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
      throw new FileError("No config file was found");
    }

    if (!_config || Object.keys(_config).length === 0) {
      throw new FileError("This appears to be a invalid config file");
    } else {
      return _config;
    }
  }

  public async getTestsFromFiles(files: string[]) {
    if (!files) {
      throw new FileError("No file was informed.");
    }

    testCollector.isCollecting = true;
    for (const file of files) {
      require(file);
      const exceptions = await testCollector.beforeStartFunctions.executeWithCatchCollectAsync();

      if (exceptions.length) {
        console.log(exceptions);
        process.exit(1);
      }

      await testCollector.executeGroupClojure();
      await testCollector.executeTestClojure();
    }

    testCollector.isCollecting = false;
    addTestsGroupmentToGroupIfExist();
    addIsolatedTestFunctionsToGroupIfExists();
    addTestFunctionsToGroupIfExists();
    return testCollector.groups;
  }
}

function loadConfigFromConfigFilePath(): ConfigOptions {
  let filePath = "";
  if (fs.existsSync(runtime.configFilePath)) {
    filePath = path.resolve(process.cwd(), runtime.configFilePath);
  } else {
    throw new FileError(`The path '${runtime.configFilePath}' do not appears to be a valid path`);
  }
  const fileExt = path.extname(filePath);

  if (fileExt === ".json") {
    return JSON.parse(fs.readFileSync(filePath).toString());
  } else if (fileExt === ".js" || fileExt === ".ts") {
    return require(filePath);
  } else {
    throw new FileError(`Extension '${fileExt}' is not supported`);
  }
}

function addTestsGroupmentToGroupIfExist() {
  if (testCollector.tests && testCollector.tests.length > 0) {
    const testsCloned = testCollector.tests.map((test) => test);
    testCollector.groups.push({ tests: testsCloned });
    testCollector.tests = [];
  }
}

function addIsolatedTestFunctionsToGroupIfExists() {
  if (testCollector.hasIsolatedTestFunctions()) {
    const testsCloned = testCollector.cloneIsolatedTestFunctions();
    testCollector.groups.push({ tests: [{ testsFunctions: testsCloned }] });
    testCollector.clearIsolatedTestFunctions();
  }
}

function addTestFunctionsToGroupIfExists() {
  if (testCollector.hasTestFunctions()) {
    const testsCloned = testCollector.cloneTestFunctions();
    testCollector.groups.push({ tests: [{ testsFunctions: testsCloned }] });
    testCollector.clearTestFunctions();
  }
}

const reader = new Reader();
export default reader;
