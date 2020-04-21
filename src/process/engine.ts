import { getTestList } from './reader';
import fs from 'fs';
import { FilesNotFoundError, ConfigFileNotFoundError, MissingPropertyError } from '../errors';
import ora, { Ora, Color } from 'ora';
import runtime from '../runtime';
import path from 'path';
import Shell from '../utils/shell';
import { executeTestCases } from './runner';
import { outPutResult } from './reporter';
import cordeBot from '../cordeBot';
import ConfigOptions from 'src/config';

let spinner: Ora;

export async function runTests(files: string[]) {
  const relativePaths = getFilesFullPath(files);
  setLoading('Reading files');
  const configs = loadConfig();
  runtime.loadFromConfigs(configs);
  runtime.tests = await getTestList(relativePaths);
  stopLoading();
}

export async function runTestsFromConfigs() {
  setLoading('Reading cool configs');
  const configs = loadConfig();
  runtime.loadFromConfigs(configs);
  stopLoading();

  setLoading('Reading test files');
  const files = await readDir(runtime.testFilesDir);
  runtime.tests = await getTestList(files);

  setLoading('starting bots');
  startClientBot(runtime.botFilePath);

  setTimeout(async () => {
    try {
      await cordeBot.login(runtime.cordeTestToken);
      setLoading('Running Tests');

      runtime.cordeBotHasStarted.subscribe(async (hasConnected) => {
        if (hasConnected) {
          runtime.channel = cordeBot.getChannelForTests();
          await executeTestCases(runtime.tests);
          outPutResult(runtime.tests);
          finishProcess();
          process.exit(0);
        }
      });
    } catch (error) {
      console.log(error);
      stopLoading();
      finishProcess();
      process.exit(1);
    }
  }, 2000);
}

function finishProcess() {
  cordeBot.logout();
  Shell.stopChild();
}

function startClientBot(filePath: string) {
  let fullPath = path.resolve(process.cwd(), filePath);
  fullPath = fullPath.replace('//', '/');
  const dir = path.dirname(fullPath);
  Shell.observe(`cd ${dir} && ts-node ${fullPath}`);
}

function setLoading(message: string) {
  // dots spinner do not works on windows 😰
  // https://github.com/fossas/fossa-cli/issues/193
  if (spinner) {
    spinner.text = message;
  } else {
    spinner = ora(message).start();
    spinner.color = getRandomSpinnerColor() as Color;
    spinner.spinner = 'dots';
  }
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
  const jsonfilePath = `${process.cwd()}/${configFileName}`;

  if (fs.existsSync(jsonfilePath)) {
    _config = JSON.parse(fs.readFileSync(jsonfilePath).toString());
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
