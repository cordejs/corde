/* eslint-disable no-console */
import chalk from "chalk";
import ora, { Color, Ora } from "ora";
import runtime from "../core";
import { reader } from "../core/Reader";
import { summary } from "../core/summary";
import { TestExecutor } from "../core/TestExecutor";
import { LogUpdate } from "../utils/logUpdate";
import { validate } from "./validate";
import { StrictObject } from "../types";
import { registerTsNode } from "../core/tsRegister";
import { debug } from "../core/debug";
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

export async function exec(options: corde.Config.ICLIOptions) {
  if (options.config) {
    runtime.configFilePath = options.config;
  }

  // Register ts-node with default options to prevent errors
  // when registering from configs.
  registerTsNode(DEFAULT_CONFIG.project as any);

  debug("runtime.project: ", runtime.configs.project);
  debug("runtime.configFilePath: " + runtime.configFilePath);

  await loadConfigs();

  // Configs provied in CLI overrides configs in config file
  if (options.files) {
    runtime.setConfigs({ testMatches: options.files.split(" ") }, true);
  }

  if (runtime.configs.project) {
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
    const loginPromise = runtime.bot.login(runtime.configs.cordeBotToken);
    const readyPromise = runtime.bot.events.onceReady();
    await Promise.allSettled([loginPromise, readyPromise]);

    spinner.stop();

    const testMatches = await reader.getTestsFromFiles({
      filesPattern: runtime.configs.testMatches,
      ignorePattern: runtime.configs.modulePathIgnorePatterns,
    });

    if (testMatches.length === 0) {
      console.log(`${chalk.bgYellow(chalk.black(" INFO "))} No test were found.`);
      await finishProcess(0);
    }

    const log = new LogUpdate();
    const testRunner = new TestExecutor(log);
    const executionReport = await testRunner.runTestsAndPrint(testMatches);

    if (runtime.isE2eTest) {
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
