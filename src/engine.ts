import { getTestsList } from './reader';
import { Test, TestResult } from './test';

export async function runTests(filesName: string[]) {
  const relativePaths = getFilesRelativePaths(filesName);
  const tests = getTestsList(relativePaths);
  await createBotConnection();
  runTestList(tests);
}

function getFilesRelativePaths(filesName: string[]) {
  console.log(filesName);
  return [''];
}

async function createBotConnection() {}

async function runTestList(tests: Test[]) {
  const result = new TestResult();
  result.expectation = tests[0].expectation;
  result.input = tests[0].input;
  result.output = '';
  return [result];
}

function createReportFile(results: TestResult[]) {
  console.log(results);
}
