/// <reference types="../../lib/src/global" />

it("should add reaction to a message", async () => {
  await command("emoji").should.addReaction(["😄"]);
});
