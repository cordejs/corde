import { group, test, command } from '../src/building';
import { exampleEmbed } from './bot';

group('main commands', () => {
  test('Hello command should return... hello!!', () => {
    command('embed').shouldReturn('hello');
  });
});
