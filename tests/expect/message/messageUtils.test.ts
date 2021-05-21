import { EmbedFieldData, MessageEmbedImage, MessageEmbedThumbnail } from "discord.js";
import { Stream } from "stream";
import {
  IFile,
  IMessageEmbedAuthor,
  IMessageEmbedFooter,
  IMessageEmbed,
  IMinifiedEmbedMessage,
  ITestReport,
} from "../../../src/types";

import { MessageExpectTest } from "../../../src/expect/matches/message/messageExpectTest";

class ExpectMessage extends MessageExpectTest {
  action(..._: any[]): Promise<ITestReport> {
    throw new Error("Method not implemented.");
  }
}

const extension = new ExpectMessage({
  command: "",
  cordeBot: null,
  channelId: null,
  channelIdToSendCommand: null,
  guildId: null,
  isNot: false,
  testName: "",
  timeout: 1000,
  isCascade: false,
});

describe("testing extension", () => {
  describe("testing createNotFoundMessageForMessageData", () => {
    it("should convert messageEmbedLike simples data to messageEmbed", () => {
      const timeNow = Date.now();
      const messageLike: IMessageEmbed = {
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

      const embed = extension.embedMessageLikeToMessageEmbed(messageLike);
      expect(embed).toMatchObject(messageLike);
    });

    it("should return empty message when pass null", () => {
      const embed = extension.embedMessageLikeToMessageEmbed(null);
      expect(embed).toBeTruthy();
    });

    it("should convert image(string)", () => {
      const embed = extension.embedMessageLikeToMessageEmbed({ image: "./png.png" });
      expect(embed.image).toMatchObject<MessageEmbedImage>({ url: "./png.png" });
    });

    it("should convert image(string)", () => {
      const embed = extension.embedMessageLikeToMessageEmbed({
        image: {
          url: "./png.png",
        },
      });
      expect(embed.image).toMatchObject<MessageEmbedImage>({ url: "./png.png" });
    });

    it("should convert messageEmbedLike author string", () => {
      const messageLike: IMessageEmbed = {
        author: "lucas",
      };
      const embed = extension.embedMessageLikeToMessageEmbed(messageLike);
      expect(embed.author).toMatchObject<IMessageEmbedAuthor>({
        name: "lucas",
      });
    });

    it("should convert messageEmbedLike author object", () => {
      const messageLike: IMessageEmbed = {
        author: {
          name: "lucas",
        },
      };
      const embed = extension.embedMessageLikeToMessageEmbed(messageLike);
      expect(embed.author).toMatchObject(messageLike.author);
    });

    it("should convert messageEmbedLike files string", () => {
      const messageLike: IMessageEmbed = {
        files: ["test 1"],
      };
      const embed = extension.embedMessageLikeToMessageEmbed(messageLike);
      expect(embed.files).toMatchObject<string[]>(["test 1"]);
    });

    it("should convert messageEmbedLike files object", () => {
      const stream = new Stream();
      const messageLike: IMessageEmbed = {
        files: [
          {
            name: "file 1",
            attachment: stream,
          },
        ],
      };
      const embed = extension.embedMessageLikeToMessageEmbed(messageLike);
      expect(embed.files).toMatchObject<IFile[]>([
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
      const messageLike: IMessageEmbed = {
        fields,
      };
      const embed = extension.embedMessageLikeToMessageEmbed(messageLike);
      expect(embed.fields).toMatchObject<EmbedFieldData[]>(fields);
    });

    it("should convert messageEmbedLike footer object", () => {
      const footer: IMessageEmbedFooter = {
        iconURL: "www.google",
        text: "footer text",
      };
      const messageLike: IMessageEmbed = {
        footer,
      };
      const embed = extension.embedMessageLikeToMessageEmbed(messageLike);
      expect(embed.footer).toMatchObject(footer);
    });

    it("should convert messageEmbedLike footer string", () => {
      const footer: IMessageEmbedFooter = {
        text: "footer text",
      };
      const messageLike: IMessageEmbed = {
        footer: "footer text",
      };
      const embed = extension.embedMessageLikeToMessageEmbed(messageLike);
      expect(embed.footer).toMatchObject(footer);
    });

    it("should convert messageEmbedLike thumbnail string", () => {
      const thumbnail: MessageEmbedThumbnail = {
        url: "wwww.google",
      };
      const messageLike: IMessageEmbed = {
        thumbnailUrl: "wwww.google",
      };
      const embed = extension.embedMessageLikeToMessageEmbed(messageLike);
      expect(embed.thumbnail).toMatchObject(thumbnail);
    });
  });

  describe("testing getMessageByType", () => {
    it("should get message with image", () => {
      const messageEmbed = extension.embedMessageLikeToMessageEmbed({
        image: {
          url: "www.google.com",
        },
      });

      expect(
        (extension.getMessageByType(messageEmbed, "embed") as IMinifiedEmbedMessage).image,
      ).toBeTruthy();
    });
  });

  describe("testing humanizeMessageIdentifierObject", () => {
    it("should return '' for no identifier", () => {
      expect(extension.humanizeMessageIdentifierObject(null)).toEqual("");
    });

    it("should return message refering to the content", () => {
      expect(extension.humanizeMessageIdentifierObject({ content: "test" })).toEqual(
        `message of content "test"`,
      );
    });

    it("should return message refering to the oldContent", () => {
      expect(extension.humanizeMessageIdentifierObject({ oldContent: "test" })).toEqual(
        `message of content "test"`,
      );
    });

    it("should return '' for no object with no id or content", () => {
      expect(extension.humanizeMessageIdentifierObject({})).toEqual("");
    });
  });
});
