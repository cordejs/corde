const { group, test, command, beforeStart, afterAll } = require('corde');
const { client, loginBot } = require('..');

beforeStart(() => {
  loginBot();
});

group('main commands', () => {
  test('Hello command should return... hello!!', () => {
    command('ping').shouldReturn('Ping?');
  });
});

afterAll(() => {
  client.destroy();
});
