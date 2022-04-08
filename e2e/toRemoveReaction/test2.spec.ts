/// <reference types="../../src/global" />

it("should fail when trying to remove a reaction from a role", async () => {
  await command("removeReaction 321 😄").should.removeReaction(["😄"], { id: "12321" });
});
