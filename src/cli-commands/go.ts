import fs from 'fs';
import ora, { Color, Ora } from 'ora';
import path from 'path';
import runtime from '../common/runtime';
import testCollector from '../common/testColletor';
import reader from '../core/reader';
import { outPutResult } from '../core/reporter';
import { executeTestCases } from '../core/runner';
import { Group } from '../models';
import { validate } from './validate';

process.on('uncaughtException', () => {
  stopLoading();
});

let spinner: Ora;

export async function go() {
  loadConfigs();
  const files = await readDir(runtime.configs.testFilesDir);
  await runTests(files);
}

function loadConfigs() {
  const configs = reader.loadConfig();
  validate(configs);
  runtime.setConfigs(configs);
}

async function runTests(files: string[]) {
  startLoading('Reading cool configs');
  const testsGroups = reader.getTestsFromFiles(files);

  setMessage('starting bots');
  testCollector.beforeStartFunctions.forEach((fn) => fn());

  await runtime.bot.login(runtime.configs.cordeTestToken);

  setMessage('Running Tests');
  runtime.bot.hasInited.subscribe(async (hasConnected) => {
    if (hasConnected) {
      runTestsAndPrint(testsGroups);
    }
  });
}

async function runTestsAndPrint(groups: Group[]) {
  await executeTestCases(groups);
  stopLoading();
  const hasAllTestsPassed = outPutResult(groups);

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

    if (runtime && runtime.bot) {
      runtime.bot.logout();
    }

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
  spinner = ora(`${initialMessage}\n`).start();
  spinner.color = getRandomSpinnerColor() as Color;
  spinner.spinner = 'dots';
}

function setMessage(message: string) {
  spinner.text = `${message}\n`;
}

function getRandomSpinnerColor() {
  const colors = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan'];
  let random = Math.random() * (colors.length - 1);
  random = Math.round(random);
  return colors[random];
}

function stopLoading() {
  spinner.stop();
}

/**
 * Load tests files into configs
 */
async function readDir(dir: string) {
  const files: string[] = [];
  if (dir) {
    // Get all tests files
    try {
      if (fs.existsSync(dir)) {
        fs.readdirSync(dir).forEach((file) => {
          if (file.includes('.test.')) {
            files.push(path.resolve(`${dir}/${file}`));
          }
        });
      } else {
        throw new Error(`Path ${dir} does not exists}`);
      }
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }
  return files;
}
