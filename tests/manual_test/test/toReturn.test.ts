import { beforeStart, afterAll, expect as cordeExpect } from "../../../lib";
import { bot, loginBot } from "../bot";
beforeStart(async () => {
  await loginBot();
});

cordeExpect("hello").toReturn("hello!!");

afterAll(() => {
  bot.destroy();
});
