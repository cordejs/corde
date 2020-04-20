import { getTestList } from './reader';
import fs from 'fs';
import { FilesNotFoundError, ConfigFileNotFoundError, MissingPropertyError } from './errors';
import ora, { Ora, Color } from 'ora';
import { ConfigOptions, Config } from './config';
import { GlobalSettings } from './global';
import { cordelogin, clientlogin } from './bot';
import path from 'path';
import Shell from './shell';

let spinner: Ora;

export async function runTests(files: string[]) {
  const relativePaths = getFilesFullPath(files);
  displayLoading('Reading files');
  GlobalSettings.tests = await getTestList(relativePaths);
  GlobalSettings.config = loadConfig();
  stopLoading();
}

export async function runTestsFromConfigs() {
  displayLoading('Reading cool configs');
  GlobalSettings.config = loadConfig();
  stopLoading();

  displayLoading('Reading test files');
  const files = await readDir(GlobalSettings.config.testFilesDir);
  GlobalSettings.tests = await getTestList(files);
  stopLoading();

  displayLoading('starting bots');
  try {
    startClientBot(GlobalSettings.config.botFilePath);
    setTimeout(async () => {
      await cordelogin(GlobalSettings.config.cordeTestToken);
    }, 3000);
  } catch (error) {
    console.log(error);
    process.exit(1);
  } finally {
    stopLoading();
  }

  console.log(GlobalSettings.tests);
}

function startClientBot(filePath: string) {
  let fullPath = path.resolve(process.cwd(), filePath);
  fullPath = fullPath.replace('//', '/');
  const dir = path.dirname(fullPath);
  Shell.observe(`cd ${dir} && ts-node ${fullPath}`);
}

function displayLoading(message: string) {
  // dots spinner do not works on windows 😰
  // https://github.com/fossas/fossa-cli/issues/193
  spinner = ora(message).start();
  spinner.color = getRandomSpinnerColor() as Color;
  spinner.spinner = 'dots';
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
function loadConfig(): Config {
  let _config: ConfigOptions;
  const configFileName = 'corde.json';
  const jsonfilePath = `${process.cwd()}/${configFileName}`;

  if (fs.existsSync(jsonfilePath)) {
    _config = JSON.parse(fs.readFileSync(jsonfilePath).toString());
  } else {
    throw new ConfigFileNotFoundError();
  }

  if (_config) {
    validadeConfigs(_config);
    return new Config(_config);
  } else {
    throw new Error('Invalid configuration file');
  }
}

/**
 * Check if all required values are setted
 * TODO: JSON Schema
 */
function validadeConfigs(configs: ConfigOptions) {
  if (!configs.cordeTestToken) {
    throw new MissingPropertyError('corde token not informed');
  } else if (!configs.botTestId) {
    throw new MissingPropertyError('bot test id not informed');
  } else if (!configs.testFilesDir) {
    throw new MissingPropertyError('bot test id not informed');
  } else if (!configs.botFilePath) {
    throw new MissingPropertyError('bot file path not informed');
  }
}

/**
 * Makes authentication to bots
 */
export async function login() {
  displayLoading('Connecting to bots... ');
  const cordetestToken = GlobalSettings.config.cordeTestToken;
  const cordeTestToken = GlobalSettings.config.botTestToken;
  try {
    // Make login with corde and load Message
    await cordelogin(cordetestToken);
  } catch {
    stopLoading();
    throw new Error(`Error trying to connect to bot with token: ${cordetestToken}`);
  }

  if (cordeTestToken) {
    try {
      await clientlogin(cordeTestToken);
    } catch {
      stopLoading();
      throw new Error(`can not connect to bot with token: ${cordeTestToken}`);
    }
  }
  stopLoading();
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
