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
import { debug } from "../core/debug";
import { executeWithTimeout } from "../utils/executeWithTimeout";
import { logger } from "../core/Logger";
import { loadConfigs } from "./showConfigs";

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
  loadConfigs(options);
  await validate(runtime.configs);
  runtime.initBot();
  await runTests();
}

function errorHandler(error?: Error) {
  spinner.stop();
  logger.log(error?.message);
  finishProcess(1);
}

export async function runTests() {
  debug("loginCordeBotOnStart: " + runtime.configs.loginCordeBotOnStart);
  try {
    if (runtime.configs.loginCordeBotOnStart) {
      startLoading("login to corde bot");
      debug(runtime.configs.cordeBotToken);

      const loginPromise = runtime.bot
        .login(runtime.configs.cordeBotToken)
        .then(() => debug("login ok"))
        .catch(errorHandler);

      const readyPromise = runtime.bot
        .onceInternallyReady()
        .then(() => debug("ready event ok"))
        .catch(errorHandler);

      const timeoutError = () => {
        spinner.stop();
        throw new Error(
          "Timeout attempting to logging corde's bot" +
            `Check if ${chalk.cyan("cordeBotToken")} is correct`,
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
