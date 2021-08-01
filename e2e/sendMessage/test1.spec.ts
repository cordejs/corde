/* eslint-disable no-console */
import corde from "../../lib";

corde.it("should send a message", async () => {
  const msg = await corde.bot.send("TEST MESSAGE");
  console.log(msg.content);
});
