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
