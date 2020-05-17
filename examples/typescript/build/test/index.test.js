'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const corde_1 = require('corde');
const __1 = require('../');
corde_1.beforeStart(() => {
  __1.loginBot();
});
corde_1.group('main commands', () => {
  corde_1.test('Hello command should return... hello!!', () => {
    corde_1.command('ping').shouldReturn('Ping?');
  });
});
corde_1.afterAll(() => {
  __1.client.destroy();
});
