import { beforeStart, afterAll, expect as cordeExpect } from "../../../lib";
import { bot, loginBot } from "../bot";

beforeStart(() => {
  loginBot();
});

const roleName = "test-role";
cordeExpect(`rename-role ${roleName} ${roleName}1`).toRenameRole(roleName, { name: roleName });

afterAll(() => {
  bot.destroy();
});
