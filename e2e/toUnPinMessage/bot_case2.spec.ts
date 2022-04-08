/// <reference types="../../src/global" />

describe("test", async () => {
  const msg = await corde.bot.send("oldValue");
  await corde.bot.send("pin " + msg.id);

  it("should fail when unpin a message", async () => {
    await command("unPin " + msg.id).should.unPinMessage("12312");
  });
});
