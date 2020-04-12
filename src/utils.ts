import { ParameterNotFoundError } from './errors';

export function clone(object: object | object[]): object | object[] {
  if (!object) {
    throw new ParameterNotFoundError('Object can not be undefined');
  }

  if (object as object[]) {
    const copyArray = [];
    for (const i in object as []) {
      copyArray.push(copyObject((object as [])[i]));
    }
    return copyArray;
  } else {
    return copyObject(object);
  }
}

function copyObject(object: object) {
  return JSON.parse(JSON.stringify(object));
}
