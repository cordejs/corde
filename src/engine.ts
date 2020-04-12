import { getTestList } from './reader';
import fs from 'fs';
import { FilesNotFoundError } from './errors';
import ora, { Ora, Color } from 'ora';
import { outPutResult } from './reporter';

let spinner: Ora;

export async function runTests(files: string[]) {
  const relativePaths = getFilesFullPath(files);
  displayLoading('Reading files');
  const tests = await getTestList(relativePaths);
  stopLoading();
  console.log(tests);
  outPutResult(tests);
  // await createBotConnection();
  // runTestList(tests);
}

function displayLoading(message: string) {
  // dots spinner do not works on windows 😰
  // https://github.com/fossas/fossa-cli/issues/193
  spinner = ora(message).start();
  spinner.color = getRandomSpinnerColor() as Color;
  spinner.spinner = 'dots';
}

function getRandomSpinnerColor() {
  const colors = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan'];
  let random = Math.random() * (colors.length - 1);
  random = Math.round(random);
  return colors[random];
}

function stopLoading() {
  spinner.stop();
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
