import { command, afterLogin, handler, group } from '../../src/index';
import { commandHandler } from '../bot';

afterLogin(async () => {
  handler(commandHandler);
  await group('Should check all commands', async () => {
    await command('').shouldRespond('test');
  });
});
