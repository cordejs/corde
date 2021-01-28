import corde from "../../../lib";

corde.group("test", async () => {
  // Creates a message to pin
  const msg = await corde.sendMessage("toReactMessage");
  await corde.sendMessage(`!addReaction ${msg.id} 😄`);

  // test if it is being pinned
  corde.test("", async () => {
    corde.expect(`removeReaction ${msg.id} 😄`).toRemoveReaction("😄", { id: msg.id });
  });
});
