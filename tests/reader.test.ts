import { group, command, test } from '../src/index';

group('group test', () => {
  test('testing ping commmand', () => {
    command('ping').shouldReturn('pong');
  });

  test('teste 1212', () => {
    command('ttt').shouldReturn('p222121ong');
  });
});

// Output
// Group Test
//    Testing ping command
//      OK: ping should return pong
