import fs from "fs";
import ora, { Color, Ora } from "ora";
import path from "path";
import { runtime } from "../common/runtime";
import { testCollector } from "../common/testColletor";
import reader from "../core/reader";
import { reporter } from "../core/reporter";
import { executeTestCases } from "../core/runner";
import { Group } from "../interfaces";
import { validate } from "./validate";
import { FileError } from "../errors";

process.on("uncaughtException", () => {
  stopLoading();
});

let spinner: Ora;

export async function go() {
  loadConfigs();
  const files = readDir(runtime.configs.testFiles);
  if (!files || files.length === 0) {
    throw new FileError(`No test file was found in the path '${runtime.configs.testFiles}'`);
  }
  await runTests(files);
}

function loadConfigs() {
  const configs = reader.loadConfig();
  validate(configs);
  runtime.setConfigs(configs);
}

async function runTests(files: string[]) {
  startLoading("reading configs");
  const testsGroups = reader.getTestsFromFiles(files);

  spinner.text = "starting bots";

  testCollector.beforeStartFunctions.forEach((fn) => fn());

  await runtime.loginBot(runtime.configs.cordeTestToken);

  spinner.text = "running tests";
  runtime.onBotStart().subscribe(async (isReady) => {
    if (isReady) {
      await runTestsAndPrint(testsGroups);
    }
  });
}

async function runTestsAndPrint(groups: Group[]) {
  await executeTestCases(groups);
  spinner.succeed();
  const hasAllTestsPassed = reporter.outPutResult(groups);

  if (hasAllTestsPassed) {
    finishProcess(0);
  } else {
    finishProcess(1);
  }
}

function finishProcess(code: number, error?: any) {
  try {
    if (error) {
      console.log(error);
    }

    runtime.logoffBot();

    if (testCollector.afterAllFunctions) {
      testCollector.afterAllFunctions.forEach((fn) => fn());
    }
  } finally {
    process.exit(code);
  }
}

function startLoading(initialMessage: string) {
  // dots spinner do not works on windows 😰
  // https://github.com/fossas/fossa-cli/issues/193
  spinner = ora(initialMessage).start();
  spinner.color = getRandomSpinnerColor() as Color;
  spinner.spinner = "dots";
}

function getRandomSpinnerColor() {
  const colors = ["red", "green", "yellow", "blue", "magenta", "cyan"];
  let random = Math.random() * (colors.length - 1);
  random = Math.round(random);
  return colors[random];
}

function stopLoading() {
  spinner.stop();
  spinner.clear();
}

/**
 * Load tests files into configs
 */
function readDir(directories: string[]) {
  const files: string[] = [];
  for (const dir of directories) {
    if (fs.existsSync(dir)) {
      const stats = fs.lstatSync(dir);
      if (stats.isDirectory()) {
        const dirContent = fs.readdirSync(dir);
        const dirContentPaths = [];
        for (const singleDirContent of dirContent) {
          dirContentPaths.push(path.resolve(dir, singleDirContent));
        }
        files.push(...readDir(dirContentPaths));
      } else if (stats.isFile() && dir.includes(".test.")) {
        files.push(path.resolve(dir));
      }
    }
  }

  return files;
}
