import { Utils } from '../src/utils/utils';
import { ParameterNotFoundError } from '../src/errors';

describe('utils Clone', () => {
  it('Object should not be equal to its clone', () => {
    expect(Utils.clone({ obj: 1 })).not.toBe({ obj: 1 });
  });

  it('Object should have same value to its clone', () => {
    expect(Utils.clone({ obj: 1 })).toEqual({ obj: 1 });
  });

  it('Object array should not be equal to its clone', () => {
    expect(Utils.clone([{ obj: 1 }, { obj: 2 }])).not.toBe([{ obj: 1 }, { obj: 2 }]);
  });

  it('Should throw exception if parameter object is undefined', () => {
    try {
      Utils.clone(undefined);
    } catch (error) {
      expect(error instanceof ParameterNotFoundError).toEqual(true);
    }
  });
});

describe('utils stringfyIfObject', () => {
  it('string should return string normal', () => {
    expect(Utils.stringfyIfObject('teste')).toEqual('teste');
  });

  it('Object should return stringfied', () => {
    const obj = { test: 12 };
    expect(Utils.stringfyIfObject(obj)).toEqual(JSON.stringify(obj));
  });
});
