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

export class ExecCommand extends CliCommand<corde.Config.ICLIOptions> implements IDisposable {
  private spinner!: Ora;

  constructor(program: Command) {
    super({
      program,
      paramsFrom: "options",
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

  async handler(options: corde.Config.ICLIOptions) {
    loadConfigs(options);
    const validateCon = commandFactory.getCommand(ValidateCommand);
    await validateCon?.handler(runtime.configs);
    runtime.initBot();
    await this.runTests();
  }

  private async runTests() {
    debug("loginCordeBotOnStart: " + runtime.configs.loginCordeBotOnStart);
    try {
      if (runtime.configs.loginCordeBotOnStart) {
        this.startLoading("login to corde bot");
        debug(runtime.configs.cordeBotToken);

        const loginPromise = runtime.bot
          .login(runtime.configs.cordeBotToken)
          .then(() => debug("login ok"))
          .catch(this.errorHandler);

        const readyPromise = runtime.bot
          .onceInternallyReady()
          .then(() => debug("ready event ok"))
          .catch(this.errorHandler);

        const timeoutError = () => {
          this.spinner.stop();
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
        this.spinner.stop();
      }

      const testMatches = await reader.getTestsFromFiles({
        filesPattern: runtime.configs.testMatches,
        ignorePattern: runtime.configs.modulePathIgnorePatterns,
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
      logger.error(error);
      this.dispose(1);
    }
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
