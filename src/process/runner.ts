import { Group, AssertionProps, Test, TestReport, testFunctionType } from '../models';
import runtime from '../runtime';

export async function executeTestCases(groups: Group[]) {
  const tests = getTestsFromGroup(groups);
  console.log(JSON.stringify(tests));
  for (const i in tests) {
    const test = tests[i];
    const reports = await runTests(test.testsFunctions);
    test.testsReports = reports;
  }
}

async function runTests(testsFunctions: testFunctionType[]) {
  const reports: TestReport[] = [];
  for (const i in testsFunctions) {
    const report = await testsFunctions[i](runtime.bot);
    reports.push(report);
  }
  return reports;
}

async function trySendMessage(assertion: AssertionProps) {
  try {
    return await runtime.bot.sendTextMessage(assertion.commandName, assertion.messageType);
  } catch (error) {
    return 'Timeout';
  }
}

function getTestsFromGroup(groups: Group[]) {
  const tests: Test[] = [];

  if (!groups) {
    return tests;
  }

  groups.forEach((group) => {
    tests.push(...getAssertionPropsFromGroup(group));
  });

  return tests;
}

function getAssertionPropsFromGroup(group: Group) {
  const assertions: Test[] = [];
  group.tests.forEach((test) => {
    assertions.push(...getAssertionsPropsFromTest(test));
  });

  if (group.subGroups) {
    group.subGroups.forEach((subGroup) => {
      const subGroupTests = getAssertionPropsFromGroup(subGroup);
      assertions.push(...subGroupTests);
    });
  }

  return assertions;
}

function getAssertionsPropsFromTest(test: Test) {
  const tests: Test[] = [];
  if (!test) {
    return [];
  }

  if (test.subTests) {
    test.subTests.forEach((subtest) => {
      tests.push(...getAssertionsPropsFromTest(subtest));
    });
  }

  return tests;
}
