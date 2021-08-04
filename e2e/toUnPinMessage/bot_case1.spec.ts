import corde from "../../lib";

corde.describe("test", async () => {
  corde.it("should unpin a message", async () => {
    const msg = await corde.bot.send("oldValue");
    await corde.bot.send("!pin " + msg.id);
    corde.expect("unPin " + msg.id).toUnPin(msg.id);
  });
});
