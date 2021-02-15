import corde from "../../../lib";

corde.group("test", async () => {
  corde.test("", async () => {
    corde.expect("pin 1").toPin("batata");
  });
});
