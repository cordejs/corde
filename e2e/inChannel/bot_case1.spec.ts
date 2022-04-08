/// <reference types="../../src/global" />

it("", async () => {
  await command("sendMultiple 829873348309155851")
    .should.inChannel("829873348309155851")
    .respond("hello2");
});
