import fs from "fs";
import path from "path";
import { runtime } from "../common";
import { testCollector } from "../common/testCollector";
import { FileError } from "../errors";
import { ConfigOptions, TestFile } from "../types";
import { tryImport } from "../utils";

class Reader {
  /**
   * Read config file(*.json) from root of project
   * and validates it
   * @throws
   */
  loadConfig(): ConfigOptions {
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

  async getTestsFromFiles(files: string[]): Promise<TestFile[]> {
    const testFiles: TestFile[] = [];
    if (!files) {
      throw new FileError("No file was informed.");
    }

    testCollector.isCollecting = true;
    for (const file of files) {
      tryImport(file);
      const exceptions = await testCollector.beforeStartFunctions.executeWithCatchCollectAsync();

      if (exceptions.length) {
        console.log(exceptions);
      }

      await testCollector.executeGroupClojure();
      await testCollector.executeTestClojure();

      addTestsGroupmentToGroupIfExist();
      addIsolatedTestFunctionsToGroupIfExists();
      addTestFunctionsToGroupIfExists();

      testFiles.push({
        path: file.replace(process.cwd() + "\\", ""),
        groups: testCollector.groups.slice(),
        isEmpty: !!testCollector.groups.length,
      });

      testCollector.groups = [];
    }

    testCollector.isCollecting = false;
    return testFiles;
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
    const testsCloned = testCollector.tests.slice();
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
  if (testCollector.isInsideTestClausureFunctions()) {
    const testsCloned = testCollector.cloneTestFunctions();
    testCollector.groups.push({ tests: [{ testsFunctions: testsCloned }] });
    testCollector.clearTestFunctions();
  }
}

const reader = new Reader();
export { reader };
