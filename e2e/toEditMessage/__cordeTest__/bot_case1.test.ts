import corde from "../../../lib";
import { login, sendMessage } from "../../bot";

corde.beforeStart(async () => {
  await login();
});

corde.group("test", async () => {
  const msg = await sendMessage("oldValue");
  corde.test("", async () => {
    const newValue = "newMessageEdited";
    corde.expect(`editMessage ${msg.id} ${newValue}`).toEditMessage(newValue, { id: msg.id });
  });
});
