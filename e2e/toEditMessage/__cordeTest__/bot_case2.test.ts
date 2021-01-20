import corde from "../../../lib";
import * as conf from "../../bot";

corde.group("test", async () => {
  const instance = await corde.withClient(conf.bot).login();
  const msg = await instance.sendMessage("oldValue");
  corde.test("", async () => {
    const newValue = "newMessageEdited";
    corde.expect(`editMessage ${msg.id} ${newValue}`).toEditMessage({ id: msg.id }, "wrongValue");
  });
});
