import corde from "../../../lib";
import { sendMessage } from "../../bot";
import { login, bot } from "../../bot";

corde.beforeStart(async () => {
  await login();
}, 2000);

corde.test("should edit a message", async () => {
  const msg = await sendMessage("oldValue");
  const newValue = "newMessageEdited";
  corde.expect(`editMessage ${msg.id} ${newValue}`).toEditMessage(newValue, { id: msg.id });
});

corde.afterAll(() => {
  bot.destroy();
});
