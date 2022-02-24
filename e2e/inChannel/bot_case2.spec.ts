/// <reference types="../../lib/src/global" />

it("", async () => {
  await command("sendMultiple 829873348309155851").should.inChannel("123").respond("hello2");
});
