import chalk from "chalk";
import { Command } from "commander";
import ora, { Color, Ora } from "ora";
import { debug } from "../../core/debug";
import { logger } from "../../core/Logger";
import { reader } from "../../core/Reader";
import runtime from "../../core/runtime";
import { summary } from "../../core/summary";
import { TestExecutor } from "../../core/TestExecutor";
import { IDisposable, StrictObject } from "../../types";
import { executeWithTimeout } from "../../utils/executeWithTimeout";
import { LogUpdate } from "../../utils/LogUpdate";
import { CliCommand } from "../common/CliCommand";
import { commandFactory, loadConfigs } from "../common";
import { ValidateCommand } from "./ValidateCommand";

declare module "ora" {
  interface Ora {
    _spinner: StrictObject;
  }
}

export class ExecCommand extends CliCommand implements IDisposable {
  private spinner!: Ora;

  constructor(program: Command) {
    super({
      program,
      paramsFrom: ["options", "args"],
    });

    process.on("uncaughtException", () => {
      this.stopLoading();
    });

    this.options(
      {
        flags: "-c, --config <type>",
        description: "Set config file path",
      },
      {
        flags: "-p, --project <type>",
        description: "Set tsconfig path",
      },
      {
        flags: "-f, --files <path>",
        description:
          "Set the path for all tests. Use this if you wan to specify a single path." +
          " for Array, use only 'corde <path1> <path2>'",
      },
    );

    this.setArgs("[files...]");
  }

  dispose(code?: number, error?: any): void | Promise<void> {
    try {
      if (error) {
        logger.log(error);
      }

      runtime.bot.logout();
    } finally {
      process.exit(code);
    }
  }

  async handler(options: corde.Config.ICLIOptions, files?: string[]) {
    await this.loadConfigsAndValidate(options, files);
    await this.runTests();
  }

  public async loadConfigsAndValidate(options: corde.Config.ICLIOptions, files?: string[]) {
    loadConfigs(options);

    if (files?.length) {
      runtime.setConfigs({ testMatches: files }, true);
    }

    const validateCon = commandFactory.getCommand(ValidateCommand);
    await validateCon?.handler(runtime.configs);
    runtime.initBot();
  }

  private async runTests() {
    const { configs } = runtime;

    debug("loginCordeBotOnStart: " + configs.loginCordeBotOnStart);
    try {
      if (configs.loginCordeBotOnStart) {
        await this.loginBot();
      }

      const testMatches = await reader.getTestsFromFiles({
        filesPattern: configs.testMatches,
        ignorePattern: configs.modulePathIgnorePatterns,
      });

      if (testMatches.length === 0) {
        logger.log(`${chalk.bgYellow(chalk.black(" INFO "))} No test were found.`);
        return this.dispose(0);
      }

      const log = new LogUpdate();
      const testRunner = new TestExecutor(log);
      const executionReport = await testRunner.runTestsAndPrint(testMatches);

      if (runtime.isE2eTest) {
        logger.log(log.stdout);
      }

      summary.print(executionReport);

      if (executionReport.totalTestsFailed > 0) {
        return this.dispose(1);
      }

      return this.dispose(0);
    } catch (error) {
      this.spinner.stop();

      if (error instanceof Error) {
        logger.error(error.message);
      } else {
        logger.error(error);
      }

      this.dispose(1);
    }
  }

  async loginBot() {
    const { bot, configs } = runtime;
    this.startLoading("login to corde bot");
    debug(configs.cordeBotToken);

    const loginPromise = bot.login(configs.cordeBotToken).then(() => debug("login ok"));

    const readyPromise = bot.events.onceReady().then(() => debug("ready event ok"));

    const timeoutError = () => {
      this.spinner.stop();
      throw new Error(
        "Timeout attempting to logging corde's bot" +
          `Check if ${chalk.cyan("cordeBotToken")} is correct`,
      );
    };

    await executeWithTimeout(
      () => Promise.all([loginPromise, readyPromise]),
      configs.loginTimeout,
      timeoutError,
    );

    await bot.loadGuildAndChannel();
    this.spinner.stop();
  }

  private errorHandler(error?: Error) {
    this.spinner.stop();
    logger.log(error?.message);
    this.dispose(1);
  }

  private startLoading(initialMessage: string) {
    this.spinner = ora(initialMessage).start();
    this.spinner._spinner = {
      interval: 80,
      frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
    };
    this.spinner.color = this.getRandomSpinnerColor() as Color;
  }

  private getRandomSpinnerColor() {
    const colors = ["red", "green", "yellow", "blue", "magenta", "cyan"];
    let random = Math.random() * (colors.length - 1);
    random = Math.round(random);
    return colors[random];
  }

  private stopLoading() {
    if (this.spinner) {
      this.spinner.stop();
      this.spinner.clear();
    }
  }
}
