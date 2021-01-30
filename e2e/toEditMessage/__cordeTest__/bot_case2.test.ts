import corde from "../../../lib";
import { login, sendMessage } from "../../bot";

corde.group("test", async () => {
  await login();
  const msg = await sendMessage("oldValue");
  corde.test("", async () => {
    const newValue = "newMessageEdited";
    corde.expect(`editMessage ${msg.id} ${newValue}`).toEditMessage({ id: msg.id }, "wrongValue");
  });
});
