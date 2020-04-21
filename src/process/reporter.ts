import { Group, Test, AssertionProps } from '../building/models';
import chalk from 'chalk';

import log from '../utils/log';

const detaultTab = '    ';
let sucessCount = 0;
let failureCount = 0;

export function outPutResult(groups: Group[]) {
  if (!groups) {
    return;
  }

  let tabSpace = detaultTab;
  breakLine();
  groups.forEach((group) => printGroup(group, tabSpace));
  showSummary();
  process.exit(0);
}

function breakLine() {
  console.log('');
}

function printGroup(group: Group, tab: string) {
  if (group.name) {
    console.log(`${tab}${group.name}`);
  }

  if (group.subGroups) {
    tab += detaultTab;
    group.subGroups.forEach((subGroup) => printGroup(subGroup, ''));
  }

  if (group.tests) {
    tab += detaultTab;
    group.tests.forEach((test) => printTest(test, tab));
  }
}

function printTest(test: Test, tab: string) {
  if (test.name) {
    console.log(`${tab}${test.name}`);
  }

  if (test.subTests) {
    tab += detaultTab;
    test.subTests.forEach((subTest) => printTest(subTest, tab));
  }

  if (test.assertions) {
    tab += detaultTab;
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
  if (failureCount === 0 && sucessCount > 0) {
    console.log('Tests passed!');
    console.log(`${chalk.bgGreen('TOTAL:')} ${chalk.bold(sucessCount)}`);
  } else if (failureCount > 0 && sucessCount > 0) {
    console.log('Tests passed with erros.');
    console.log(`${chalk.bgGreen('SUCESS:')} ${chalk.bold(sucessCount)}`);
    console.log(`${chalk.bgRed('FAILURES:')} ${chalk.bold(failureCount)}`);
  } else {
    console.log('All tests fail.');
    console.log(`${chalk.bgRed('FAILURES:')} ${chalk.bold(failureCount)}`);
  }
}
