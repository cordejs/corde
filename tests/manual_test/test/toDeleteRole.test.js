import { beforeStart, afterAll, expect as cordeExpect } from "../../../lib";
import { bot, loginBot } from "../bot";
beforeStart(() => {
  loginBot();
});

cordeExpect("deleteRole test-role").toDeleteRole({ name: "test-role" });

afterAll(() => {
  bot.destroy();
});
