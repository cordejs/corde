import { ParameterNotFoundError } from '../errors';

export class Utils {
  static clone(object: object | object[]): object | object[] {
    if (!object) {
      throw new ParameterNotFoundError('Object can not be undefined');
    }
    return JSON.parse(JSON.stringify(object));
  }
  static stringfyIfObject(data: unknown) {
    if ((data as string) !== undefined) {
      return data;
    } else {
      JSON.stringify(data);
    }
  }
}
