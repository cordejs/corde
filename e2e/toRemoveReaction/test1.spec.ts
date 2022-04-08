/// <reference types="../../src/global" />

it("should remove a reaction from a message", async () => {
  const msg = await corde.bot.send("toReactMessage");
  await corde.bot.send(`!addReaction ${msg.id} 😄`);
  await command(`removeReaction ${msg.id} 😄`).should.removeReaction(["😄"], { id: msg.id });
});
