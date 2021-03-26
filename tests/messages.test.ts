describe("testing import of messages", () => {
  it("should import messages", () => {
    const messages = require("../src/messages");
    expect(messages).toBeTruthy();
  });
});
