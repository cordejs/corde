/// <reference types="../../lib/src/global" />

describe("test", async () => {
  it("should unpin a message", async () => {
    const msg = await corde.bot.send("oldValue");
    await corde.bot.send("!pin " + msg.id);
    await command("unPin " + msg.id).should.unPinMessage(msg.id);
  });
});
