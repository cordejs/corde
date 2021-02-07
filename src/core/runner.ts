import { runtime, testCollector } from "../common";
import { Group, Test } from "../types";
import { TestReport } from "../api/interfaces";
import { executeWithTimeout } from "../utils/executeWithTimeout";

export async function executeTestCases(groups: Group[]) {
  const tests = getTestsFromGroup(groups);
  for (const test of tests) {
    const reports = await runTests(test);
    test.testsReports = reports;
  }
}

export async function executeTests(tests: Test[]) {
  for (const test of tests) {
    const reports = await runTests(test);
    test.testsReports = reports;
  }
}

export function getTestsFromGroup(groups: Group[]) {
  const tests: Test[] = [];

  if (!groups) {
    return tests;
  }

  groups.forEach((group) => {
    tests.push(...getAssertionPropsFromGroup(group));
  });

  return tests;
}

async function runTests(test: Test) {
  const reports: TestReport[] = [];
  for (const testfn of test.testsFunctions) {
    await testCollector.beforeEachFunctions.executeAsync();
    let report: TestReport;
    try {
      report = await executeWithTimeout(
        async () => await runtime.injectBot(testfn),
        runtime.configs.timeOut,
      );
    } catch (error) {
      report = {
        hasPassed: false,
      };
    }
    await testCollector.afterEachFunctions.executeAsync();
    reports.push(report);
  }
  return reports;
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
