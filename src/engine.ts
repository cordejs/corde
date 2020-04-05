import { getTestList } from './reader';
import fs from 'fs';
import { FilesNotFoundError } from './errors';
import { Group } from './testing/models';
import { outPutResult } from './reporter';

export async function runTests(files: string[]) {
  const relativePaths = getFilesFullPath(files);
  const tests = await getTestList(relativePaths);
  console.log(tests);
  outPutResult(tests);
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
    files.forEach((file) => {
      const possiblePath = `${process.cwd()}/${file}`;
      if (fs.existsSync(possiblePath)) {
        paths.push(possiblePath);
      }
    });
    return paths;
  }
  throw new FilesNotFoundError();
}

async function createBotConnection() {}

// async function runTestList(tests: Group[]) {
//   const result = new Group();
//   result.expectation = tests[0].expectation;
//   result.input = tests[0].input;
//   result.output = '';
//   return [result];
// }

// function createReportFile(results: Test[]) {
//   console.log(results);
// }
