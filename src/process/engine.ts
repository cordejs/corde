import { getTestList, getTestFilesFromDir } from './reader';
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
import { executeTestCases } from './runner';
import { outPutResult } from './reporter';
import cordeBot from '../cordeBot';
import ConfigOptions from '../config';
import Thread from '../building/thread';

let spinner: Ora;

export async function runTestsFromFiles(files: string[]) {
  const relativePaths = getFilesFullPath(files);
  loadConfigs();
  await runTests(relativePaths);
}

export async function runTestsFromConfigs() {
  loadConfigs();
  const files = getTestFilesFromDir(runtime.testFiles);
  await runTests(files);
}

function loadConfigs() {
  const configs = loadConfig();
  runtime.loadFromConfigs(configs);
}

async function runTests(files: string[]) {
  try {
    startLoading('Reading cool configs');
    runtime.tests = await getTestList(files);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

  setMessage('starting bots');
  Thread.beforeStartFunctions.forEach((fn) => fn());

  try {
    await cordeBot.login(runtime.cordeTestToken);
    setMessage('Running Tests');
    runtime.cordeBotHasStarted.subscribe(async (hasConnected) => {
      if (hasConnected) {
        runtime.channel = cordeBot.getChannelForTests();
        await executeTestCases(runtime.tests);
        const hasAllTestsPassed = outPutResult(runtime.tests);
        finishProcess();

        if (hasAllTestsPassed) {
          process.exit(0);
        } else {
          process.exit(1);
        }
      }
    });
  } catch (error) {
    console.log(error);
    stopLoading();
    finishProcess();
    process.exit(1);
  }
}

function finishProcess() {
  stopLoading();
  cordeBot.logout();
  Thread.afterAllFunctions.forEach((fn) => fn());
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
    errors.push('bot test id not informed');
  } else if (!configs.testFiles) {
    errors.push('bot test id not informed');
  } else if (!configs.botFilePath) {
    errors.push('bot file path not informed');
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
