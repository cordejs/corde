/// <reference types="../../src/global" />

describe("should pin a message", async () => {
  // Creates a message to pin
  const msg = await corde.bot.send("oldValue");
  // test if it is being pinned
  it("", async () => {
    await command("pin " + msg.id).should.pinMessage(msg.id);
  });

  // Unpin to not persist trash in channel
  afterAll(async () => {
    await corde.bot.send("unPin " + msg.id);
  });
});
