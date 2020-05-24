import arg from 'arg';
import { runTestsFromFiles, runTestsFromConfigs } from './process/engine';
import fs from 'fs';
import path from 'path';
import { ConfigFileNotFoundError } from './errors';

export function cli(args: string[]) {
  const files = parseArgumentsIntoOptions(args);

  thowErrorIfConfigFileNotExists();

  if (files && files.length > 0 && checkIfFilesExist(files)) {
    runTestsFromFiles(files);
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

function thowErrorIfConfigFileNotExists() {
  const configFilePath = path.resolve(process.cwd(), 'corde.json');
  if (!fs.existsSync(configFilePath)) {
    throw new ConfigFileNotFoundError();
  }
}
