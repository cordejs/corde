import { beforeStart, afterAll, expect as cordeExpect } from "../../../lib";
import { bot, loginBot } from "../bot";
import { Colors } from "../../../lib/src/utils/colors";
beforeStart(() => {
  loginBot();
});

cordeExpect("setRoleColor test-role").toSetRoleColor(Colors.BLUE, { name: "test-role" });

afterAll(() => {
  bot.destroy();
});
