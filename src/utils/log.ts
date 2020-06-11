import chalk from 'chalk';
import { AssertionProps, messageType, TestReport } from '../models';

const DEFAULT_SPACE_VALUE = 4;

class Log {
  static bgSucess = chalk.bgRgb(21, 194, 19);
  static bgError = chalk.bgRed;

  /**
   * Send a objet to process.stdout
   */
  static out(obj: object | object[]) {
    if (!obj) {
      return;
    } else if (obj as []) {
      process.stdout.write(JSON.stringify(obj));
    }
  }

  static printFailure(space: string, report: TestReport) {
    let notWord = Log.getNotWordIfTrue(report.isDenyTest);
    console.log(
      `${space} ${chalk.bgRed('FAIL')} expected ${chalk.bold(
        report.commandName,
      )} to${notWord}return '${chalk.bold(
        Log.getPrintingValueByType(report.expectation),
      )}'. Returned: '${chalk.red(Log.getPrintingValueByType(report.output))}'`,
    );
  }

  static printSucess(tabSpace: string, report: TestReport) {
    let notWord = Log.getNotWordIfTrue(report.isDenyTest);
    console.log(
      `${tabSpace} ${this.bgSucess.bold(' PASS ')} expected ${chalk.bold(
        report.commandName,
      )} to${notWord}return '${chalk.bold(
        Log.getPrintingValueByType(report.expectation),
      )}'. Returned: '${chalk.green(Log.getPrintingValueByType(report.output))}'`,
    );
  }

  private static getNotWordIfTrue(usingTrueStatement: boolean) {
    if (usingTrueStatement) {
      return ' ';
    }
    return ' not ';
  }

  private static getPrintingValueByType(value: string | object) {
    if (typeof value === 'string') {
      return value;
    }
    return `\n ${JSON.stringify(value, null, DEFAULT_SPACE_VALUE)}`;
  }
}

const log = Log;
export default log;
