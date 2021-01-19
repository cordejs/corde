import corde from "../../../lib";
import { sendMessage, login, bot } from "../../bot";

corde.group("test", async () => {
  const instance = await corde.withClient(bot).login();
  const msg = await instance.sendMessage("oldValue");
  corde.test("", async () => {
    const newValue = "newMessageEdited";
    corde.expect(`editMessage ${msg.id} ${newValue}`).toEditMessage({ id: msg.id }, newValue);
  });
});
