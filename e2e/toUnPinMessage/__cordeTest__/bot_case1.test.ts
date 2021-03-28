import corde from "../../../lib";

corde.group("test", async () => {
  const msg = await corde.sendMessage("oldValue");
  await corde.sendMessage("pin " + msg.id);

  corde.test("should unpin a message", () => {
    corde.expect("unPin " + msg.id).toUnPin(msg.id);
  });
});
