const { group, test, command, beforeStart, afterAll } = require('../../lib');
const { bot, loginBot } = require('../bot');

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
