// import { group, command, test } from '../src/index';
import { clone } from '../src/utils';
import { ParameterNotFoundError } from '../src/errors';
// group('group test', () => {
//   test('testing ping commmand', () => {
//     command('ping').shouldReturn('pong');
//   });

//   test('teste 1212', () => {
//     command('ttt').shouldNotReturn('p222121ong');
//   });
// });

// Output
// Group Test
//    Testing ping command
//      OK: ping should return pong

describe('utils', () => {
  it('Object should not be equal to its clone', () => {
    expect(clone({ obj: 1 })).not.toEqual({ obj: 1 });
  });

  it('Object array should not be equal to its clone', () => {
    expect(clone([{ obj: 1 }, { obj: 2 }])).not.toEqual([{ obj: 1 }, { obj: 2 }]);
  });

  it('Object array should not be equal to its clone', () => {
    try {
      clone(undefined);
    } catch (error) {
      expect(typeof error).toEqual(typeof ParameterNotFoundError);
    }
  });
});
