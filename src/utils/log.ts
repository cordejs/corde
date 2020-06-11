import chalk from 'chalk';
import { AssertionProps, messageType } from '../models';

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

  static printFailure(space: string, assertion: AssertionProps) {
    let notWord = Log.getNotWordIfTrue(assertion.usingTrueStatement);
    console.log(
      `${space} ${chalk.bgRed('FAIL')} expected ${chalk.bold(
        assertion.commandName,
      )} to${notWord}return '${chalk.bold(
        Log.getPrintingValueByType(assertion.expectation),
      )}'. Returned: '${chalk.red(Log.getPrintingValueByType(assertion.output))}'`,
    );
  }

  static printSucess(space: string, assertion: AssertionProps) {
    let notWord = Log.getNotWordIfTrue(assertion.usingTrueStatement);
    console.log(
      `${space} ${this.bgSucess.bold(' PASS ')} expected ${chalk.bold(
        assertion.commandName,
      )} to${notWord}return '${chalk.bold(
        Log.getPrintingValueByType(assertion.expectation),
      )}'. Returned: '${chalk.green(Log.getPrintingValueByType(assertion.output))}'`,
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
