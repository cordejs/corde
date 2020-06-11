import fs from 'fs';
import {
  FilesNotFoundError,
  ConfigFileNotFoundError,
  MissingPropertyError,
  FileParserError,
} from '../errors';
import ora, { Ora, Color } from 'ora';
import runtime from '../runtime';
import path from 'path';
import { outPutResult } from './reporter';
import Thread from '../building/thread';
import ConfigOptions, { Group } from '../models';
import { getTestsFromFiles } from './reader';
import { executeTestCases } from './runner';

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
    finishProcess(1);
  }
}

function loadConfigs() {
  const configs = loadConfig();
  runtime.setConfigs(configs);
}

async function runTests(files: string[]) {
  try {
    startLoading('Reading cool configs');
    const testsGroups = getTestsFromFiles(files);

    setMessage('starting bots');
    Thread.beforeStartFunctions.forEach((fn) => fn());

    try {
      await runtime.bot.login(runtime.configs.cordeTestToken);
      setMessage('Running Tests');
      runtime.bot.hasInited.subscribe(async (hasConnected) => {
        if (hasConnected) {
          runTestsAndPrint(testsGroups);
        }
      });
    } catch (error) {
      console.log(error);
      stopLoading();
      finishProcess(error);
      process.exit(1);
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

async function runTestsAndPrint(groups: Group[]) {
  await executeTestCases(groups);
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

    stopLoading();

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
 * Read config file(*.json) from root of project
 * and validates it
 * @throws
 */
function loadConfig(): ConfigOptions {
  let _config: ConfigOptions;
  const configFileName = 'corde.json';
  const jsonFilePath = `${process.cwd()}/${configFileName}`;

  if (fs.existsSync(jsonFilePath)) {
    _config = tryLoadConfigs(jsonFilePath);
  } else {
    throw new ConfigFileNotFoundError();
  }

  if (_config) {
    validadeConfigs(_config);
    return _config;
  } else {
    throw new Error('Invalid configuration file');
  }
}

function tryLoadConfigs(jsonFilePath: string): ConfigOptions {
  try {
    return JSON.parse(fs.readFileSync(jsonFilePath).toString());
  } catch (error) {
    throw new FileParserError('Failed in parse configs. ' + error.message);
  }
}

/**
 * Check if all required values are setted
 * TODO: JSON Schema
 */
function validadeConfigs(configs: ConfigOptions) {
  const errors: string[] = [];
  if (!configs.cordeTestToken) {
    errors.push('corde token not informed');
  } else if (!configs.botTestToken) {
    errors.push('bot test token not informed');
  } else if (!configs.botTestId) {
    errors.push('test files dir not informed');
  } else if (!configs.testFilesDir) {
    errors.push('bot file');
  }

  let errorsString = '';

  if (errors.length == 1) {
    errorsString = '\nAn error was found when reading config file';
    buildMissingPropertiesErrorAndThrow(errorsString, errors);
  }

  if (errors.length > 1) {
    errorsString = '\nSome erros were found when reading config file';
    buildMissingPropertiesErrorAndThrow(errorsString, errors);
  }
}

function buildMissingPropertiesErrorAndThrow(errorString: string, erros: string[]) {
  erros.forEach((error) => (errorString += `\n- ${error}`));
  throw new MissingPropertyError(errorString);
}

/**
 * Load tests files into configs
 */
async function readDir(dir: string) {
  let files: string[] = [];
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
