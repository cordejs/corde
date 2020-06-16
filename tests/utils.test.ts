import { clone } from '../src/utils/utils';
import { ParameterNotFoundError } from '../src/errors';

describe('utils', () => {
  it('Object should not be equal to its clone', () => {
    expect(clone({ obj: 1 })).not.toBe({ obj: 1 });
  });

  it('Object should have same value to its clone', () => {
    expect(clone({ obj: 1 })).not.toEqual({ obj: 1 });
  });

  it('Object array should not be equal to its clone', () => {
    expect(clone([{ obj: 1 }, { obj: 2 }])).not.toBe([{ obj: 1 }, { obj: 2 }]);
  });

  it('stringify clone must be equal to its stringified object', () => {
    expect(JSON.stringify(clone([{ obj: 1 }, { obj: 2 }]))).toEqual(
      JSON.stringify([{ obj: 1 }, { obj: 2 }]),
    );
  });

  it('Should throw exception if parameter object is undefined', () => {
    try {
      clone(undefined);
    } catch (error) {
      expect(error instanceof ParameterNotFoundError).toEqual(true);
    }
  });
});
