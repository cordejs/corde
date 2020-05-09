import { group, test, command, beforeStart, afterAll } from '../src/building';
import { bot, loginBot } from './bot';

beforeStart(() => {
  loginBot();
});

group('main commands', () => {
  test('Hello command should return... hello!!', () => {
    command('hello').shouldReturn('hello!!');
  });
});

afterAll(() => {
  bot.destroy();
});
