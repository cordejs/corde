import chalk from 'chalk';
import { ParameterNotFoundError } from '../errors';

/**
 * Clone a object using JSON.parse
 *
 * @param object Object to be cloned
 */
export function clone<T>(object: T | T[]): T | T[] {
  if (!object) {
    throw new ParameterNotFoundError('Object can not be undefined');
  }
  return JSON.parse(JSON.stringify(object));
}

/**
 * Pick some properties of a object
 *
 * @see https://www.typescriptlang.org/docs/handbook/utility-types.html#picktk
 * @param obj Object to get its properties
 * @param keys Properties that must be got
 */
export function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  const copy = {} as Pick<T, K>;
  keys.forEach((key) => (copy[key] = obj[key]));
  return copy;
}

/**
 * Finish the process with code 1
 * displaying a default message in case of no data in parameter.
 *
 * @param msg Message to be displayed before exit the process
 */
export function exitProcessWithError(msg?: string) {
  if (msg) {
    console.log(`\n${chalk.red('error')} ${msg}`);
  } else {
    console.log(`\n${chalk.red('error')} Command failed with exit code 1`);
  }
  process.exit(1);
}
