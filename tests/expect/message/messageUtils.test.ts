import MessageUtils from "../../../src/expect/matches/message/messageUtils";

describe("testing messageUtils", () => {
  describe("testing createNotFoundMessageForMessageData", () => {
    it("should return a message for a messageData with only id", () => {
      const message = MessageUtils.createNotFoundMessageForMessageData({ id: "123" });
      expect(message).toEqual("Message with id 123 not found.");
    });

    it("should return message for a messageData with only text (content)", () => {
      const message = MessageUtils.createNotFoundMessageForMessageData({ text: "hello" });
      expect(message).toEqual("Message with content 'hello' not found.");
    });

    it("should return a message for a message data with text and id", () => {
      const message = MessageUtils.createNotFoundMessageForMessageData({
        text: "hello",
        id: "123",
      });
      expect(message).toEqual("Message with id 123 or content 'hello' not found.");
    });

    it("should return null due to no messageData", () => {
      const message = MessageUtils.createNotFoundMessageForMessageData(null);
      expect(message).toBeFalsy();
    });
  });
});
