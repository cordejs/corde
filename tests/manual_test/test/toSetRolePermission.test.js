import { beforeStart, afterAll, expect as cordeExpect } from "../../../lib";
import { Permission } from "../../../lib/src/utils/permission";
import { bot, loginBot } from "../bot";
beforeStart(() => {
  loginBot();
});

cordeExpect(`change-role-permission 756939347936411739`).toSetRolePermission(
  {
    id: "756939347936411739",
  },
  Permission.ADMINISTRATOR,
);

afterAll(() => {
  bot.destroy();
});
