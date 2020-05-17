import { group, test, command, beforeStart, afterAll } from 'corde';
import { client, loginBot } from '../';

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
