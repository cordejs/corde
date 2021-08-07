import corde from "../../lib";
import { sendMessage } from "../bot";

corde.it("should edit a message", async () => {
  const msg = await sendMessage("oldValue");
  const newValue = "newMessageEdited";
  corde.expect(`editMessage ${msg.id} ${newValue}`).toEditMessage(newValue, { id: msg.id });
});
