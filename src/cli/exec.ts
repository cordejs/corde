/* eslint-disable no-console */
import chalk from "chalk";
import ora, { Color, Ora } from "ora";
import runtime from "../core/runtime";
import { reader } from "../core/Reader";
import { summary } from "../core/summary";
import { TestExecutor } from "../core/TestExecutor";
import { LogUpdate } from "../utils/LogUpdate";
import { validate } from "./validate";
import { StrictObject } from "../types";
import { registerTsNode } from "../core/tsRegister";
import { debug } from "../core/debug";
import { DEFAULT_CONFIG } from "../const";
import { executeWithTimeout } from "../utils/executeWithTimeout";
import { logger } from "../core/Logger";

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

  // Configs provide in CLI overrides configs in config file
  if (options.files) {
    runtime.setConfigs({ testMatches: options.files.split(" ") }, true);
  }

  if (runtime.configs.project) {
    registerTsNode(runtime.configs);
  }

  debug("loaded configs: ", runtime.configs.toDebug());

  await validate(runtime.configs);
  await runTests();
}

async function loadConfigs() {
  const configs = reader.loadConfig();
  runtime.setConfigs(configs, true);
}

export async function runTests() {
  debug("loginCordeBotOnStart: " + runtime.configs.loginCordeBotOnStart);
  try {
    if (runtime.configs.loginCordeBotOnStart) {
      startLoading("login to corde bot");
      debug(runtime.configs.cordeBotToken);
      const loginPromise = runtime.bot
        .login(runtime.configs.cordeBotToken)
        .then(() => debug("login ok"));

      const readyPromise = runtime.bot.onceInternallyReady().then(() => debug("ready event ok"));

      const timeoutError = () => {
        spinner.stop();
        throw new Error(
          "\nTimeout attempting to logging corde's bot\n" +
            `Check if ${chalk.cyan("cordeBotToken")} is correct\n`,
        );
      };

      await executeWithTimeout(
        () => Promise.allSettled([loginPromise, readyPromise]),
        runtime.configs.loginTimeout,
        timeoutError,
      );

      spinner.stop();
    }

    const testMatches = await reader.getTestsFromFiles({
      filesPattern: runtime.configs.testMatches,
      ignorePattern: runtime.configs.modulePathIgnorePatterns,
    });

    if (testMatches.length === 0) {
      logger.log(`${chalk.bgYellow(chalk.black(" INFO "))} No test were found.`);
      return finishProcess(0);
    }

    const log = new LogUpdate();
    const testRunner = new TestExecutor(log);
    const executionReport = await testRunner.runTestsAndPrint(testMatches);

    if (runtime.isE2eTest) {
      logger.log(log.stdout);
    }

    summary.print(executionReport);

    if (executionReport.totalTestsFailed > 0) {
      return finishProcess(1);
    }

    return finishProcess(0);
  } catch (error) {
    spinner.stop();
    logger.error(error);
    finishProcess(1);
  }
}

function finishProcess(code: number, error?: any): never {
  try {
    if (error) {
      logger.log(error);
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
