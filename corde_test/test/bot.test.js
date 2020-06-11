const { group, test, command, beforeStart, afterAll } = require('../../lib');
const { bot, loginBot, embedMsg } = require('../bot');

beforeStart(() => {
  loginBot();
});

group('main commands', () => {
  test('Hello command should return... hello!!', () => {
    command('hello').shouldReturn('hello!!');
  });

  // test('Embed command should return a embed message!!', () => {
  //   command('embed').shouldReturn(embedMsg);
  // });
});

// test('Hello command should return... hello!!', () => {
//   command('hello').shouldReturn('hello!!');
// });

// command('hello').shouldReturn('hello!!');

afterAll(() => {
  bot.destroy();
});
