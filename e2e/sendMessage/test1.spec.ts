/// <reference types="../../src/global" />

it("should send a message", async () => {
  await corde.bot.send("TEST MESSAGE");
});
