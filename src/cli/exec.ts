/* eslint-disable no-console */
import chalk from "chalk";
import ora, { Color, Ora } from "ora";
import { runtime } from "../common/runtime";
import { testCollector } from "../common/testCollector";
import { reader } from "../core/reader";
import { summary } from "../core/summary";
import { TestExecutor } from "../core/testExecutor";
import { LogUpdate } from "../utils/logUpdate";
import { validate } from "./validate";
import { Config, StrictObject } from "../types";
import registerTsNode from "../core/tsRegister";
import { debug } from "../common/debug";
import { DEFAULT_CONFIG } from "../consts";

declare module "ora" {
  interface Ora {
    _spinner: StrictObject;
  }
}

process.on("uncaughtException", () => {
  stopLoading();
});

let spinner: Ora;

export async function exec(options: Config.ICLIOptions) {
  if (options.config) {
    runtime.configFilePath = options.config;
  }

  // Register ts-node with default options to prevent errors
  // when registering from configs.
  registerTsNode(DEFAULT_CONFIG.project as any);

  debug("runtime.project: ", runtime.project);
  debug("runtime.configFilePath: " + runtime.configFilePath);

  await loadConfigs();

  // Configs provied in CLI overrides configs in config file
  if (options.files) {
    runtime.setConfigs({ testMatches: options.files.split(" ") }, true);
  }

  if (runtime.project) {
    registerTsNode(runtime.configs);
  }

  debug("loaded configs: ", runtime.configs);

  await validate(runtime.configs);
  await runTests();
}

async function loadConfigs() {
  const configs = reader.loadConfig();
  runtime.setConfigs(configs, true);
}

export async function runTests() {
  startLoading("login to corde bot");

  try {
    // No need to await this function
    runtime.loginBot(runtime.cordeBotToken);
    await runtime.events.onceReady();
    spinner.stop();

    const testMatches = await reader.getTestsFromFiles({
      filesPattern: runtime.testMatches,
      ignorePattern: runtime.modulePathIgnorePatterns,
    });

    if (testMatches.length === 0) {
      console.log(`${chalk.bgYellow(chalk.black(" INFO "))} No test were found.`);
      await finishProcess(0);
    }

    const log = new LogUpdate();
    const testRunner = new TestExecutor(log);
    const executionReport = await testRunner.runTestsAndPrint(testMatches);

    if (runtime.environment.isE2eTest) {
      console.log(log.stdout);
    }

    summary.print(executionReport);

    if (executionReport.totalTestsFailed > 0) {
      await finishProcess(1);
    } else {
      await finishProcess(0);
    }
  } catch (error) {
    spinner.stop();
    console.error(error);
    await finishProcess(1);
  }
}

async function finishProcess(code: number, error?: any): Promise<never> {
  try {
    if (error) {
      console.log(error);
    }

    if (testCollector.afterAllFunctions.hasFunctions) {
      const exceptions = await testCollector.afterAllFunctions.executeWithCatchCollectAsync();
      if (exceptions.length) {
        console.log(...exceptions);
        code = 1;
      }
    }

    runtime.logoffBot();
  } finally {
    process.exit(code);
  }
}

function startLoading(initialMessage: string) {
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
