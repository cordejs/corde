import corde from "../../../lib";

corde.test("should remove a reaction from a message", async () => {
  const msg = await corde.sendMessage("toReactMessage");
  await corde.sendMessage(`!addReaction ${msg.id} 😄`);
  corde.expect(`removeReaction ${msg.id} 😄`).toRemoveReaction(["😄"], { id: msg.id });
});
