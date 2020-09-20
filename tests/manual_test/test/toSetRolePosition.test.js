import { beforeStart, afterAll, expect as cordeExpect } from "../../../lib";
import { bot, loginBot } from "../bot";
beforeStart(() => {
  loginBot();
});

const position = 3;
cordeExpect(`set-role-position test-role1 ${position}`).toSetRolePosition(position, {
  name: "test-role1",
});

afterAll(() => {
  bot.destroy();
});
