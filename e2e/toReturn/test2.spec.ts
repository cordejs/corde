/// <reference types="../../lib/src/global" />

it("Hello command should return... hello!!", async () => {
  await command("hello").should.respond("...");
});
