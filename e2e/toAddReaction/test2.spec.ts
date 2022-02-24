/// <reference types="../../lib/src/global" />

it("should fail in add reaction to a message", async () => {
  // Intentionally wrong command
  await command("emoj").should.addReaction(["😎"]);
});
