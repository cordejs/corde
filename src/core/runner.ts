import { Group, Test, testFunctionType } from '../models';
import runtime from '../common/runtime';
import { TestReport } from '../testing-api/models';
import { exitProcessWithError } from '../utils/utils';

export async function executeTestCases(groups: Group[]) {
  const tests = getTestsFromGroup(groups);

  try {
    for (const i in tests) {
      if (tests.hasOwnProperty(i)) {
        const test = tests[i];
        const reports = await runTests(test.testsFunctions);
        test.testsReports = reports;
      }
    }
  } catch (error) {
    console.log(error.message);
    exitProcessWithError();
  }
}

async function runTests(testsFunctions: testFunctionType[]) {
  const reports: TestReport[] = [];
  for (const i in testsFunctions) {
    if (testsFunctions.hasOwnProperty(i)) {
      const report = await testsFunctions[i](runtime.bot);
      reports.push(report);
    }
  }
  return reports;
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
  const tests: Test[] = [test];

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
