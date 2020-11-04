import fs from "fs";
import ora, { Color, Ora } from "ora";
import path from "path";
import { runtime } from "../common/runtime";
import { testCollector } from "../common/testCollector";
import reader from "../core/reader";
import { reporter } from "../core/reporter";
import { executeTestCases } from "../core/runner";
import { Group } from "../types";
import { validate } from "./validate";
import { FileError } from "../errors";

process.on("uncaughtException", () => {
  stopLoading();
});

declare module "ora" {
  interface Ora {
    _spinner: object;
  }
}

let spinner: Ora;

export async function go() {
  loadConfigs();
  const files = readDir(runtime.testFiles);
  if (!files || files.length === 0) {
    throw new FileError(`No test file was found in the path '${runtime.testFiles}'`);
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

  await testCollector.beforeStartFunctions.executeAsync();
  await runtime.loginBot(runtime.cordeTestToken);

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
    await finishProcess(0);
  } else {
    await finishProcess(1);
  }
}

async function finishProcess(code: number, error?: any) {
  try {
    if (error) {
      console.log(error);
    }

    runtime.logoffBot();

    if (testCollector.afterAllFunctions) {
      await testCollector.afterAllFunctions.executeAsync();
    }
  } finally {
    process.exit(code);
  }
}

function startLoading(initialMessage: string) {
  // dots spinner do not works on windows 😰
  // https://github.com/fossas/fossa-cli/issues/193
  spinner = ora(initialMessage).start();
  spinner._spinner = {
    interval: 80,
    frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
  };
  spinner.color = getRandomSpinnerColor() as Color;
}

function getRandomSpinnerColor() {
  const colors = ["red", "green", "yellow", "blue", "magenta", "cyan"];
  let random = Math.random() * (colors.length - 1);
  random = Math.round(random);
  return colors[random];
}

function stopLoading() {
  if (spinner) {
    spinner.stop();
    spinner.clear();
  }
}

/**
 * Load tests files into configs
 */
function readDir(directories: string[]) {
  const files: string[] = [];
  for (const dir of directories) {
    const resolvedPath = path.resolve(process.cwd(), dir);

    if (fs.existsSync(resolvedPath)) {
      const stats = fs.lstatSync(resolvedPath);
      if (stats.isDirectory()) {
        const dirContent = fs.readdirSync(resolvedPath);
        const dirContentPaths = [];
        for (const singleDirContent of dirContent) {
          dirContentPaths.push(path.resolve(dir, singleDirContent));
        }
        files.push(...readDir(dirContentPaths));
      } else if (stats.isFile() && dir.includes(".test.")) {
        files.push(resolvedPath);
      }
    }
  }

  return files;
}
