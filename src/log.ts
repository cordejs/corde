import chalk from 'chalk';

class Log {
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

  static printFailure(
    space: string,
    command: string,
    expectation: string,
    output: string,
    usingTrueStatement: boolean,
  ) {
    let notWord = Log.getNotWordIfTrue(usingTrueStatement);
    console.log(
      `${space} ${chalk.bgRed('FAIL')} command ${chalk.bold(
        command,
      )} should ${notWord} return '${chalk.bold(expectation)}'. Returned: '${chalk.red(output)}'`,
    );
  }

  static printSucess(
    space: string,
    command: string,
    expectation: string,
    output: string,
    usingTrueStatement: boolean,
  ) {
    let notWord = Log.getNotWordIfTrue(usingTrueStatement);
    console.log(
      `${space} ${chalk.bgGreen('OK')} command ${chalk.bold(
        command,
      )} should ${notWord} return '${chalk.bold(expectation)}'. Returned: '${chalk.green(output)}'`,
    );
  }

  private static getNotWordIfTrue(usingTrueStatement: boolean) {
    if (usingTrueStatement) {
      return '';
    }
    return 'not';
  }
}

const log = Log;
export default log;
