const { group, test, command, beforeStart, afterAll } = require('../../lib');
const { bot, loginBot, embedMsg } = require('../bot');

beforeStart(() => {
  loginBot();
});

// Testing group function
// group('main commands', () => {
//   test('Hello command should return... hello!!', () => {
//     command('hello').shouldReturn('hello!!');
//   });

//   test('Embed command should return a embed message!!', () => {
//     command('embed').shouldReturn(embedMsg);
//   });
// });

// Testing test function
test('Hello command should return... hello!!', () => {
  command('hello').shouldReturn('hello!!');
});

// testing Alone command
command('hello').shouldReturn('hello!!');

afterAll(() => {
  bot.destroy();
});
