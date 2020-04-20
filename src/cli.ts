import arg from 'arg';
import { runTests, runTestsFromConfigs } from './engine';
import fs from 'fs';

export function cli(args: string[]) {
  const files = parseArgumentsIntoOptions(args);

  if (files && files.length > 0 && checkIfFilesExist(files)) {
    runTests(files);
  } else {
    runTestsFromConfigs();
  }
}

function parseArgumentsIntoOptions(rawArgs: string[]) {
  const args = arg(
    {},
    {
      argv: rawArgs.slice(2),
    },
  );
  return args._;
}

function checkIfFilesExist(files: string[]) {
  let exists = true;
  for (const i in files) {
    if (!fs.existsSync(files[i])) {
      exists = false;
      console.error(`Check files listed. '${files[i]}' was not found`);
    }
  }
  return exists;
}
