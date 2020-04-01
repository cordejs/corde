import { getTestsList } from './reader';
import { Test, TestResult } from './test';
import fs from 'fs';

export async function runTests(files: string[]) {
  const relativePaths = getFilesFullPath(files);
  const tests = await getTestsList(relativePaths);
  console.log(tests);
  // await createBotConnection();
  // runTestList(tests);
}

/**
 * Get the full path to acess a list of files
 * @param files file names
 */
function getFilesFullPath(files: string[]) {
  if (files) {
    const paths: string[] = [];
    files.forEach(file => {
      const possiblePath = `${process.cwd()}/${file}`;
      if (fs.existsSync(possiblePath)) {
        paths.push(possiblePath);
      }
    });
    return paths;
  }
  throw new Error('No files informed');
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
