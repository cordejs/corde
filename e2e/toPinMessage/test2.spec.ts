/// <reference types="../../lib/src/global" />

describe("should fail when trying to pin a message", async () => {
  it("", async () => {
    await command("pin 1").should.pinMessage("batata");
  });
});
