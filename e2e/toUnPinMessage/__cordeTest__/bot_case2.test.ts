import corde from "../../../lib";

corde.group("test", async () => {
  const msg = await corde.sendMessage("oldValue");
  await corde.sendMessage("pin " + msg.id);

  corde.test("", () => {
    corde.expect("unPin " + msg.id).toUnPin("12312");
  });
});
