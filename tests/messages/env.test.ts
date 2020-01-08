import { command, afterLogin, handler, test } from '../../src/index';
import { commandHandler } from '../bot';

afterLogin(async () => {
  handler(commandHandler);
  await test('Should return hello', async () => {
    await command('hello').shouldRespond('hello!!');
    await command('hey').shouldRespond('hey!!');
  });

  // await it("Should faill because command is ''", async () => {
  //   await command('').shouldRespond('hey!!');
  // });
});
