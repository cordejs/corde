import corde from "../../../lib";

corde.describe("test", async () => {
  corde.it("should unpin a message", async () => {
    const msg = await corde.sendMessage("oldValue");
    await corde.sendMessage("!pin " + msg.id);
    corde.expect("unPin " + msg.id).toUnPin(msg.id);
  });
});
