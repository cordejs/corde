/// <reference types="../../src/global" />
import { sendMessage } from "../@bot";

it("should edit a message", async () => {
  const msg = await sendMessage("oldValue");
  const newValue = "newMessageEdited";
  await command(`editMessage ${msg.id} ${newValue}`).should.editMessage(newValue, { id: msg.id });
});
