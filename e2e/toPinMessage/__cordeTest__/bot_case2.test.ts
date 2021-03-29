import corde from "../../../lib";

corde.describe("should fail when trying to pin a message", async () => {
  corde.it("", async () => {
    corde.expect("pin 1").toPin("batata");
  });
});
