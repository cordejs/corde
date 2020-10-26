import { runtime, testCollector } from "../common";
import { Group, Test, testFunctionType } from "../types";
import { TestReport } from "../api/interfaces";

export async function executeTestCases(groups: Group[]) {
  const tests = getTestsFromGroup(groups);
  for (const test of tests) {
    const reports = await runTests(test.testsFunctions);
    test.testsReports = reports;
  }
}

async function runTests(testsFunctions: testFunctionType[]) {
  const reports: TestReport[] = [];
  for (const test of testsFunctions) {
    await testCollector.beforeEachFunctions.executeAsync();
    const report = await runtime.injectBot(test);
    await testCollector.afterEachFunctions.executeAsync();
    reports.push(report);
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
  if (group.tests) {
    group.tests.forEach((test) => {
      assertions.push(...getAssertionsPropsFromTest(test));
    });
  }

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
