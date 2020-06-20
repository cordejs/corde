import fs from 'fs';
import ora, { Color, Ora } from 'ora';
import path from 'path';
import Thread from '../building/thread';
import reader from '../core/reader';
import { outPutResult } from '../core/reporter';
import { executeTestCases } from '../core/runner';
import runtime from '../core/runtime';
import { Group } from '../models';
import validate from './validate';
import { exitProcessWithError } from '../utils/utils';

let spinner: Ora;

export async function go() {
  try {
    loadConfigs();
    const files = await readDir(runtime.configs.testFilesDir);
    await runTests(files);
  } catch (error) {
    finishProcess(1, error);
  }
}

function loadConfigs() {
  const configs = reader.loadConfig();
  if (validate(configs)) {
    runtime.setConfigs(configs);
  } else {
    exitProcessWithError();
  }
}

async function runTests(files: string[]) {
  startLoading('Reading cool configs');
  const testsGroups = reader.getTestsFromFiles(files);

  setMessage('starting bots');
  Thread.beforeStartFunctions.forEach((fn) => fn());

  await runtime.bot.login(runtime.configs.cordeTestToken);

  setMessage('Running Tests');
  runtime.bot.hasInited.subscribe(async (hasConnected) => {
    if (hasConnected) {
      runtime.loadBotSettings();
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

    if (Thread.afterAllFunctions) {
      Thread.afterAllFunctions.forEach((fn) => fn());
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
  spinner.spinner = 'runner';
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
