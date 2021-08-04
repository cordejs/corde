import corde from "../../lib";

corde.it("should remove a reaction from a message", async () => {
  const msg = await corde.bot.send("toReactMessage");
  await corde.bot.send(`!addReaction ${msg.id} 😄`);
  corde.expect(`removeReaction ${msg.id} 😄`).toRemoveReaction(["😄"], { id: msg.id });
});
