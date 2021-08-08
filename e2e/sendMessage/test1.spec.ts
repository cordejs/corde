import corde from "../../lib";

corde.it("should send a message", async () => {
  await corde.bot.send("TEST MESSAGE");
});
