import corde from "../../../lib";
import { sendMessage } from "../../bot";

corde.group("should edit a message", async () => {
  const msg = await sendMessage("oldValue");
  corde.test("", async () => {
    const newValue = "newMessageEdited";
    corde.expect(`editMessage ${msg.id} ${newValue}`).toEditMessage(newValue, { id: msg.id });
  });
});
