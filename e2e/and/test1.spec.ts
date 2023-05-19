/// <reference types="../../src/global" />

describe("testing todoInCascade", () => {
  it("test should pass", async () => {
    // await command("sendMultiple 829873348309155851")
    //   .should.respond("hello")
    //   .and.inChannel("829873348309155851")
    //   .respond("hello2");

    await command("hello").should.respond("Hello!!").and.respond("Hello!!");
  });
});
