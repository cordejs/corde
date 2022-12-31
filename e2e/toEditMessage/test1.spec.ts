/// <reference types="../../src/global" />
import { login, sendMessage } from "../@bot";

beforeAll(async () => {
  await login(false);
});

it("should edit a message", async () => {
  const msg = await sendMessage("oldValue");
  if (msg) {
    const newValue = "newMessageEdited";
    await command(`editMessage ${msg.id} ${newValue}`).should.editMessage(newValue, { id: msg.id });
  }
});
