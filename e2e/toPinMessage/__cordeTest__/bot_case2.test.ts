import corde from "../../../lib";

corde.group("should fail when trying to pin a message", async () => {
  corde.test("", async () => {
    corde.expect("pin 1").toPin("batata");
  });
});
