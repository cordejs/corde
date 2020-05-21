import { Group, Test, AssertionProps } from '../building/models';
import chalk from 'chalk';

import log from '../utils/log';

const SPACE = '    ';
let sucessCount = 0;
let failureCount = 0;

export function outPutResult(groups: Group[]) {
  if (!groups) {
    return;
  }

  let tabSpace = SPACE;
  breakLine();
  groups.forEach((group) => printGroup(group, tabSpace));
  showSummary();
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

  if (test.assertions) {
    tab += SPACE;
    test.assertions.forEach((asser) => printAssertion(asser, tab));
  }
}

function printAssertion(assert: AssertionProps, tab: string) {
  if (
    (assert.usingTrueStatement && assert.output !== assert.expectation) ||
    (!assert.usingTrueStatement && assert.output === assert.expectation)
  ) {
    failureCount++;
    log.printFailure(
      tab,
      assert.commandName,
      assert.expectation,
      assert.output,
      assert.usingTrueStatement,
    );
  } else {
    log.printSucess(
      tab,
      assert.commandName,
      assert.expectation,
      assert.output,
      assert.usingTrueStatement,
    );
    sucessCount++;
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
  console.log('Tests passed with erros.');
  console.log(`${log.bgSucess(' SUCESS: ')} ${chalk.bold(sucessCount)}`);
  console.log(`${chalk.bgRed(' FAILURES: ')} ${chalk.bold(failureCount)}`);
}

function printFullFailure() {
  console.log('All tests fail.');
  console.log(`${chalk.bgRed(' FAILURES: ')} ${chalk.bold(failureCount)}`);
}
