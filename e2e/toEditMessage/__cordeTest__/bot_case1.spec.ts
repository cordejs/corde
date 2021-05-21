import corde from "../../../lib";
import { sendMessage } from "../../bot";
import { login, bot } from "../../bot";

corde.beforeStart(async () => {
  await login();
}, 3000);

corde.it("should edit a message", async () => {
  const msg = await sendMessage("oldValue");
  const newValue = "newMessageEdited";
  corde.expect(`editMessage ${msg.id} ${newValue}`).toEditMessage(newValue, { id: msg.id });
});

corde.afterAll(() => {
  bot.destroy();
});
