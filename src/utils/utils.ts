import { ParameterNotFoundError } from '../errors';

export function clone(object: object | object[]): object | object[] {
  if (!object) {
    throw new ParameterNotFoundError('Object can not be undefined');
  }
  return JSON.parse(JSON.stringify(object));
}
