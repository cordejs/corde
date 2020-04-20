import { group, test, command } from '../src/building';

group('main commands', () => {
  test('Hello command should return... hello!!', () => {
    command('hello').shouldReturn('hello!!');
  });
});
