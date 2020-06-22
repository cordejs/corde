import chalk from 'chalk';
import { ParameterNotFoundError } from '../errors';

export function clone<T>(object: T | T[]): T | T[] {
  if (!object) {
    throw new ParameterNotFoundError('Object can not be undefined');
  }
  return JSON.parse(JSON.stringify(object));
}

export function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  const copy = {} as Pick<T, K>;
  keys.forEach((key) => (copy[key] = obj[key]));
  return copy;
}

export function exitProcessWithError(msg?: string) {
  if (msg) {
    console.log(`\n${chalk.red('error')} ${msg}`);
  } else {
    console.log(`\n${chalk.red('error')} Command failed with exit code 1`);
  }
  process.exit(1);
}
