import { beforeStart, afterAll, expect as cordeExpect } from "../../../lib";
import { bot, loginBot } from "../bot";

beforeStart(() => {
  loginBot();
});

cordeExpect("emoji").toAddReaction("😄");

afterAll(() => {
  bot.destroy();
});
