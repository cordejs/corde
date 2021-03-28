import corde from "../../../lib";

corde.group("should pin a message", async () => {
  // Creates a message to pin
  const msg = await corde.sendMessage("oldValue");

  // test if it is being pinned
  corde.test("", async () => {
    corde.expect("pin " + msg.id).toPin(msg.id);
  });

  // Unpin to not persist trash in channel
  corde.afterAll(async () => {
    await corde.sendMessage("unPin " + msg.id);
  });
});
