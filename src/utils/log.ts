import chalk from 'chalk';
import { TestReport } from '../testing-api';

const DEFAULT_SPACE_VALUE = 4;

class ReporterLog {
  static bgSucess = chalk.bgRgb(21, 194, 19);
  static bgError = chalk.bgRed;

  static printFailure(tabSpace: string, report: TestReport) {
    const notWord = ReporterLog.getNotWordIfTrue(report.isNot);

    if (report.showExpectAndOutputValue) {
      console.log(
        `${tabSpace} ${chalk.bgRed('FAIL')} expected ${chalk.bold(
          report.commandName,
        )} to${notWord}return '${chalk.bold(
          ReporterLog.getPrintingValueByType(report.expectation),
        )}'. Returned: '${chalk.red(ReporterLog.getPrintingValueByType(report.output))}'`,
      );
    } else {
      console.log(
        `${tabSpace}  ${this.bgSucess.bgRed(' FAIL ')} command ${chalk.bold(
          report.commandName,
        )} not returned what was expected`,
      );
    }
  }

  static printSucess(tabSpace: string, report: TestReport) {
    const notWord = ReporterLog.getNotWordIfTrue(report.isNot);

    if (report.showExpectAndOutputValue) {
      console.log(
        `${tabSpace} ${this.bgSucess.bold(' PASS ')} expected ${chalk.bold(
          report.commandName,
        )} to${notWord}return '${chalk.bold(
          ReporterLog.getPrintingValueByType(report.expectation),
        )}'. Returned: '${chalk.green(ReporterLog.getPrintingValueByType(report.output))}'`,
      );
    } else {
      console.log(
        `${tabSpace}  ${this.bgSucess.bold(' PASS ')} command ${chalk.bold(
          report.commandName,
        )} returned what was expected`,
      );
    }
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

const log = ReporterLog;
export default log;
