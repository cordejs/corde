import chalk from 'chalk';
import { getConfig } from './init';

class Logger {
  public info(message: any) {
    if (getConfig().silentMode) return;
    console.log(message);
  }

  public error(message: any) {
    if (getConfig().silentMode) return;
    console.error(message);
  }

  /**
   * Output in process console a messsage of *success* for a command test
   * @param testName case test name
   * @param expect what is expected to the bot answer
   * @param output what bot really answered
   * @description Ins case of **testName** be empty, no line is created in console.
   */
  sucess(testName: string, expect: string | number | boolean, output: string) {
    if (getConfig().silentMode) return;
    const response = `expected: '${expect}', output: '${output}'`;
    if (testName && testName.trim() !== '') {
      console.log(`${this.green(testName)}: \n ${this.bgGreen('OK:')} ${response}`);
    } else {
      console.log(`   ${this.bgGreen('OK:')} ${response}`);
    }
  }

  /**
   * Output in process console a messsage of *error* for a command test
   * @param testName case test name
   * @param expect what is expected to the bot answer
   * @param output what bot really answered
   * @description Ins case of **testName** be empty, no line is created in console.
   */
  fail(testName: string, expect: string | number | boolean, output: string) {
    if (getConfig().silentMode) return;
    const response = `expected: '${expect}', output: '${output}'`;
    if (testName && testName.trim() !== '') {
      console.error(`${this.red(testName)}: \n ${this.bgRed('Fail')} ${this.red(response)}`);
    } else {
      console.error(`   ${this.bgRed('Fail')} ${this.red(response)}`);
    }
  }

  private green(text: string, bold?: boolean) {
    if (bold) {
      text = chalk.bold(text);
    }
    return chalk.green(text);
  }

  private bgGreen(text: string, bold?: boolean) {
    if (bold) {
      text = chalk.bold(text);
    }
    return chalk.bgGreen(text);
  }

  private red(text: string, bold?: boolean) {
    if (bold) {
      text = chalk.bold(text);
    }
    return chalk.red(text);
  }

  private bgRed(text: string, bold?: boolean) {
    if (bold) {
      text = chalk.bold(text);
    }
    return chalk.bgRed(text);
  }
}

export const logger = new Logger();
