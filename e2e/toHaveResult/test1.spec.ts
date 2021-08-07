import corde from "../../lib";

corde.describe("testing todoInCascade", () => {
  corde.it("test should pass", () => {
    corde.bot.channels.find((c) => c.isText());
    corde
      .expect("sendMultiple 829873348309155851")
      .toHaveResult(
        corde.expect.toReturn("hello"),
        corde.expect.inChannel("829873348309155851").toReturn("hello2"),
      );
  });
});
