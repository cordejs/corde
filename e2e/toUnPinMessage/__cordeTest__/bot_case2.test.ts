import corde from "../../../lib";

corde.describe("test", async () => {
  const msg = await corde.sendMessage("oldValue");
  await corde.sendMessage("pin " + msg.id);

  corde.it("should fail when unpin a message", () => {
    corde.expect("unPin " + msg.id).toUnPin("12312");
  });
});
