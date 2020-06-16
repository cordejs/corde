import {
  Group,
  Test,
  AssertionProps,
  messageExpectationType,
  messageOutputType,
  TestReport,
} from '../models';
import chalk from 'chalk';
import assert from 'assert';
import log from '../utils/log';

const SPACE = '    ';
let sucessCount = 0;
let failureCount = 0;

/**
 * Prints the output of each assertion.
 * @param groups All groups of tests
 * @returns Returns true if all tests has passed
 */
export function outPutResult(groups: Group[]) {
  if (!groups) {
    return false;
  }

  const tabSpace = SPACE;
  breakLine();
  groups.forEach((group) => printGroup(group, tabSpace));
  showSummary();

  return failureCount === 0;
}

function breakLine() {
  console.log('');
}

function printGroup(group: Group, tab: string) {
  if (group.name) {
    console.log(`${tab}${group.name}`);
  }

  if (group.subGroups) {
    tab += SPACE;
    group.subGroups.forEach((subGroup) => printGroup(subGroup, ''));
  }

  if (group.tests) {
    tab += SPACE;
    group.tests.forEach((test) => printTest(test, tab));
  }
}

function printTest(test: Test, tab: string) {
  if (test.name) {
    console.log(`${tab}${test.name}`);
  }

  if (test.subTests) {
    tab += SPACE;
    test.subTests.forEach((subTest) => printTest(subTest, tab));
  }

  if (test.testsReports) {
    tab += SPACE;
    test.testsReports.forEach((report) => printAssertion(report, tab));
  }
}

function printAssertion(report: TestReport, tab: string) {
  if (report.testSucessfully) {
    log.printSucess(tab, report);
    sucessCount++;
  } else {
    failureCount++;
    log.printFailure(tab, report);
  }
}

function showSummary() {
  breakLine();
  if (doesAllTestsPassed()) {
    printFullSuccess();
  } else if (doesSomeTestsPassed()) {
    printPartialSuccess();
  } else {
    printFullFailure();
  }
}

function doesAllTestsPassed() {
  return failureCount === 0 && sucessCount > 0;
}

function doesSomeTestsPassed() {
  return failureCount > 0 && sucessCount > 0;
}

function printFullSuccess() {
  console.log('All tests passed!');
  console.log(`${log.bgSucess(' TOTAL: ')} ${chalk.bold(sucessCount)}`);
}

function printPartialSuccess() {
  console.log('Tests passed with errors.');
  console.log(`${log.bgError(' FAILURES: ')} ${chalk.bold(failureCount)}`);
  console.log(`${log.bgSucess(' SUCESS: ')} ${chalk.bold(sucessCount)}`);
}

function printFullFailure() {
  console.log('All tests fail.');
  console.log(`${chalk.bgRed(' FAILURES: ')} ${chalk.bold(failureCount)}`);
}
