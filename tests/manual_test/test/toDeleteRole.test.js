import { beforeStart, afterAll, expect as cordeExpect } from "../../../lib";
import { bot, loginBot } from "../bot";
beforeStart(() => {
  loginBot();
});

cordeExpect("deleteRole test-role").toDeleteRoleByName("test-role");

afterAll(() => {
  bot.destroy();
});
