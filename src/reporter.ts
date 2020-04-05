import { Group, Test, AssertionProps } from './testing/models';

const detaultTab = '    ';
export function outPutResult(groups: Group[]) {
  if (!groups) {
    return;
  }

  let tabSpace = detaultTab;
  console.log('\n');
  groups.forEach((group) => printGroup(group, tabSpace));
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

function printAssertion(assertion: AssertionProps, tab: string) {
  let result = 'FAIL';
  if (assertion.output === assertion.expectation) {
    result = 'OK';
  }
  console.log(
    `${tab} ${result} command ${assertion.commandName} should return '${assertion.expectation}'. Returned: '${assertion.output}'`,
  );
}
