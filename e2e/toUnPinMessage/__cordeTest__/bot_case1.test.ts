import corde from "../../../lib";

corde.describe("test", async () => {
  const msg = await corde.sendMessage("oldValue");
  await corde.sendMessage("pin " + msg.id);

  corde.it("should unpin a message", () => {
    corde.expect("unPin " + msg.id).toUnPin(msg.id);
  });
});
