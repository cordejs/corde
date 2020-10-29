import { group } from "console";
import { beforeStart, afterAll, expect as cordeExpect, test } from "../../../lib";
import { bot, loginBot } from "../bot";
beforeStart(() => {
  loginBot();
});

test("testing pin", () => {
  const msgId = "770413139254181889";
  cordeExpect(`pin ${msgId}`).toPin({ id: msgId });
});
afterAll(() => {
  bot.destroy();
});
