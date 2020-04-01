import arg from 'arg';
import { runTests } from './engine';

export function cli(args: string[]) {
  let files = parseArgumentsIntoOptions(args);
  if (!files) {
  } else {
    runTests(files);
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
