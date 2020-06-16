import fs from 'fs';
import {
  FilesNotFoundError,
  ConfigFileNotFoundError,
  MissingPropertyError,
  FileParserError,
} from '../errors';
import ora, { Ora, Color } from 'ora';
import runtime from '../core/runtime';
import path from 'path';
import { outPutResult } from '../core/reporter';
import Thread from '../building/thread';
import ConfigOptions, { Group, configFileType } from '../models';
import reader from '../core/reader';
import { executeTestCases } from '../core/runner';

let spinner: Ora;

export async function runTestsFromFiles(files: string[]) {
  const relativePaths = getFilesFullPath(files);
  loadConfigs();
  await runTests(relativePaths);
}

export async function runTestsFromConfigs() {
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
  runtime.setConfigs(configs);
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

function finishProcess(code: number = 1 | 0, error?: any) {
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
 * Get the full path to acess a list of files
 * @param files file names
 */
function getFilesFullPath(files: string[]) {
  if (files) {
    const paths: string[] = [];
    files.forEach((file) => {
      const possiblePath = `${process.cwd()}/${file}`;
      if (fs.existsSync(possiblePath)) {
        paths.push(possiblePath);
      }
    });
    return paths;
  }
  throw new FilesNotFoundError();
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
