import { EmbedFieldData, MessageEmbedImage, MessageEmbedThumbnail } from "discord.js";
import { Stream } from "stream";
import messageUtils from "../../../src/expect/messageUtils";
import {
  FileLike,
  MessageEmbedAuthor,
  MessageEmbedFooter,
  MessageEmbedLike,
  MinifiedEmbedMessage,
} from "../../../src/types";

describe("testing messageUtils", () => {
  describe("testing createNotFoundMessageForMessageData", () => {
    it("should return a message for a messageIdentifier with only id", () => {
      const message = messageUtils.createNotFoundMessageForMessageData({ id: "123" });
      expect(message).toEqual("Message with id 123 not found.");
    });

    it("should return message for a messageIdentifier with only text (content)", () => {
      const message = messageUtils.createNotFoundMessageForMessageData({ content: "hello" });
      expect(message).toEqual("Message with content 'hello' not found.");
    });

    it("should return a message for a message data with text and id", () => {
      const message = messageUtils.createNotFoundMessageForMessageData({
        content: "hello",
        id: "123",
      });
      expect(message).toEqual("Message with id 123 or content 'hello' not found.");
    });

    it("should return null due to no messageIdentifier", () => {
      const message = messageUtils.createNotFoundMessageForMessageData(null);
      expect(message).toBeFalsy();
    });

    it("should convert messageEmbedLike simples data to messageEmbed", () => {
      const timeNow = Date.now();
      const messageLike: MessageEmbedLike = {
        color: 3447003,
        description: "test description",
        fields: [
          {
            name: "field 1",
            value: "1",
          },
        ],
        url: "wwww.google.com.br",
        title: "title message",
        timestamp: timeNow,
      };

      const embed = messageUtils.embedMessageLikeToMessageEmbed(messageLike);
      expect(embed).toMatchObject(messageLike);
    });

    it("should return empty message when pass null", () => {
      const embed = messageUtils.embedMessageLikeToMessageEmbed(null);
      expect(embed).toBeTruthy();
    });

    it("should convert image(string)", () => {
      const embed = messageUtils.embedMessageLikeToMessageEmbed({ image: "./png.png" });
      expect(embed.image).toMatchObject<MessageEmbedImage>({ url: "./png.png" });
    });

    it("should convert image(string)", () => {
      const embed = messageUtils.embedMessageLikeToMessageEmbed({
        image: {
          url: "./png.png",
        },
      });
      expect(embed.image).toMatchObject<MessageEmbedImage>({ url: "./png.png" });
    });

    it("should convert messageEmbedLike author string", () => {
      const messageLike: MessageEmbedLike = {
        author: "lucas",
      };
      const embed = messageUtils.embedMessageLikeToMessageEmbed(messageLike);
      expect(embed.author).toMatchObject<MessageEmbedAuthor>({
        name: "lucas",
      });
    });

    it("should convert messageEmbedLike author object", () => {
      const messageLike: MessageEmbedLike = {
        author: {
          name: "lucas",
        },
      };
      const embed = messageUtils.embedMessageLikeToMessageEmbed(messageLike);
      expect(embed.author).toMatchObject(messageLike.author);
    });

    it("should convert messageEmbedLike files string", () => {
      const messageLike: MessageEmbedLike = {
        files: ["test 1"],
      };
      const embed = messageUtils.embedMessageLikeToMessageEmbed(messageLike);
      expect(embed.files).toMatchObject<string[]>(["test 1"]);
    });

    it("should convert messageEmbedLike files object", () => {
      const stream = new Stream();
      const messageLike: MessageEmbedLike = {
        files: [
          {
            name: "file 1",
            attachment: stream,
          },
        ],
      };
      const embed = messageUtils.embedMessageLikeToMessageEmbed(messageLike);
      expect(embed.files).toMatchObject<FileLike[]>([
        {
          name: "file 1",
          attachment: stream,
        },
      ]);
    });

    it("should convert messageEmbedLike files string", () => {
      const fields: EmbedFieldData[] = [
        {
          name: "field 1",
          value: "field 1 value",
        },
      ];
      const messageLike: MessageEmbedLike = {
        fields,
      };
      const embed = messageUtils.embedMessageLikeToMessageEmbed(messageLike);
      expect(embed.fields).toMatchObject<EmbedFieldData[]>(fields);
    });

    it("should convert messageEmbedLike footer object", () => {
      const footer: MessageEmbedFooter = {
        iconURL: "www.google",
        text: "footer text",
      };
      const messageLike: MessageEmbedLike = {
        footer,
      };
      const embed = messageUtils.embedMessageLikeToMessageEmbed(messageLike);
      expect(embed.footer).toMatchObject(footer);
    });

    it("should convert messageEmbedLike footer string", () => {
      const footer: MessageEmbedFooter = {
        text: "footer text",
      };
      const messageLike: MessageEmbedLike = {
        footer: "footer text",
      };
      const embed = messageUtils.embedMessageLikeToMessageEmbed(messageLike);
      expect(embed.footer).toMatchObject(footer);
    });

    it("should convert messageEmbedLike thumbnail string", () => {
      const thumbnail: MessageEmbedThumbnail = {
        url: "wwww.google",
      };
      const messageLike: MessageEmbedLike = {
        thumbnailUrl: "wwww.google",
      };
      const embed = messageUtils.embedMessageLikeToMessageEmbed(messageLike);
      expect(embed.thumbnail).toMatchObject(thumbnail);
    });
  });

  describe("testing getMessageByType", () => {
    it("should get message with image", () => {
      const messageEmbed = messageUtils.embedMessageLikeToMessageEmbed({
        image: {
          url: "www.google.com",
        },
      });

      expect(
        (messageUtils.getMessageByType(messageEmbed, "embed") as MinifiedEmbedMessage).image,
      ).toBeTruthy();
    });
  });

  describe("testing humanizeMessageIdentifierObject", () => {
    it("should return '' for no identifier", () => {
      expect(messageUtils.humanizeMessageIdentifierObject(null)).toEqual("");
    });

    it("should return message refering to the content", () => {
      expect(messageUtils.humanizeMessageIdentifierObject({ content: "test" })).toEqual(
        `message of content "test"`,
      );
    });

    it("should return message refering to the oldContent", () => {
      expect(messageUtils.humanizeMessageIdentifierObject({ oldContent: "test" })).toEqual(
        `message of content "test"`,
      );
    });

    it("should return '' for no object with no id or content", () => {
      expect(messageUtils.humanizeMessageIdentifierObject({})).toEqual("");
    });
  });

  describe("testing createNotFoundMessageForMessageData", () => {
    it("should return '' for empty object", () => {
      expect(messageUtils.createNotFoundMessageForMessageData({})).toEqual(null);
    });
  });
});
