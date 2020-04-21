import { ParameterNotFoundError } from '../errors';

export class Utils {
  static clone(object: object | object[]): object | object[] {
    if (!object) {
      throw new ParameterNotFoundError('Object can not be undefined');
    }
    return JSON.parse(JSON.stringify(object));
  }
  static stringfyIfObject(data: unknown) {
    if (typeof data === 'string') {
      return data;
    } else {
      return JSON.stringify(data);
    }
  }
}
