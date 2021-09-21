import {
  Client,
  EmbedFieldData,
  Message,
  MessageAttachment,
  MessageEmbed,
  MessageEmbedImage,
  MessageEmbedThumbnail,
  TextChannel,
} from "discord.js";
import { Stream } from "stream";
import {
  IFile,
  IMessageEmbedAuthor,
  IMessageEmbedFooter,
  IMessageEmbed,
  IMinifiedEmbedMessage,
  ITestReport,
  ColorsHex,
  Colors,
} from "../../../src/types";

import MockDiscord from "../../mocks/mockDiscord";
import { messageUtils } from "../../../src/command/matches/message/messageUtils";
import { createMatcherObject } from "../../../src/command";

describe("testing messageUtils", () => {
  describe("testing createNotFoundMessageForMessageData", () => {
    it("should convert messageEmbedSimple simples data to messageEmbed", () => {
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

      const embed = messageUtils.embedMessageInterfaceToMessageEmbed(messageLike);
      expect(embed).toMatchObject(messageLike);
    });

    it("should return empty message when pass null", () => {
      const embed = messageUtils.embedMessageInterfaceToMessageEmbed(null);
      expect(embed).toBeTruthy();
    });

    it("should convert image(string)", () => {
      const embed = messageUtils.embedMessageInterfaceToMessageEmbed({ image: "./png.png" });
      expect(embed.image).toMatchObject<MessageEmbedImage>({ url: "./png.png" });
    });

    it("should convert image(string)", () => {
      const embed = messageUtils.embedMessageInterfaceToMessageEmbed({
        image: {
          url: "./png.png",
        },
      });
      expect(embed.image).toMatchObject<MessageEmbedImage>({ url: "./png.png" });
    });

    it("should convert messageEmbedSimple author string", () => {
      const messageLike: IMessageEmbed = {
        author: "lucas",
      };
      const embed = messageUtils.embedMessageInterfaceToMessageEmbed(messageLike);
      expect(embed.author).toMatchObject<IMessageEmbedAuthor>({
        name: "lucas",
      });
    });

    it("should convert messageEmbedSimple author object", () => {
      const messageLike: IMessageEmbed = {
        author: {
          name: "lucas",
        },
      };
      const embed = messageUtils.embedMessageInterfaceToMessageEmbed(messageLike);
      expect(embed.author).toMatchObject(messageLike.author);
    });

    it("should convert messageEmbedSimple files string", () => {
      const messageLike: IMessageEmbed = {
        files: ["test 1"],
      };
      const embed = messageUtils.embedMessageInterfaceToMessageEmbed(messageLike);
      expect(embed.files).toMatchObject<string[]>(["test 1"]);
    });

    it("should convert messageEmbedSimple files object", () => {
      const stream = new Stream();
      const messageLike: IMessageEmbed = {
        files: [
          {
            name: "file 1",
            attachment: stream,
          },
        ],
      };
      const embed = messageUtils.embedMessageInterfaceToMessageEmbed(messageLike);
      expect(embed.files).toMatchObject<IFile[]>([
        {
          name: "file 1",
          attachment: stream,
        },
      ]);
    });

    it("should convert messageEmbedSimple files string", () => {
      const fields: EmbedFieldData[] = [
        {
          name: "field 1",
          value: "field 1 value",
        },
      ];
      const messageLike: IMessageEmbed = {
        fields,
      };
      const embed = messageUtils.embedMessageInterfaceToMessageEmbed(messageLike);
      expect(embed.fields).toMatchObject<EmbedFieldData[]>(fields);
    });

    it("should convert messageEmbedSimple footer object", () => {
      const footer: IMessageEmbedFooter = {
        iconURL: "www.google",
        text: "footer text",
      };
      const messageLike: IMessageEmbed = {
        footer,
      };
      const embed = messageUtils.embedMessageInterfaceToMessageEmbed(messageLike);
      expect(embed.footer).toMatchObject(footer);
    });

    it("should convert messageEmbedSimple footer string", () => {
      const footer: IMessageEmbedFooter = {
        text: "footer text",
      };
      const messageLike: IMessageEmbed = {
        footer: "footer text",
      };
      const embed = messageUtils.embedMessageInterfaceToMessageEmbed(messageLike);
      expect(embed.footer).toMatchObject(footer);
    });

    it("should convert messageEmbedSimple thumbnail string", () => {
      const thumbnail: MessageEmbedThumbnail = {
        url: "wwww.google",
      };
      const messageLike: IMessageEmbed = {
        thumbnailUrl: "wwww.google",
      };
      const embed = messageUtils.embedMessageInterfaceToMessageEmbed(messageLike);
      expect(embed.thumbnail).toMatchObject(thumbnail);
    });
  });

  describe("testing getMessageByType", () => {
    it("should get message with image", () => {
      const messageEmbed = messageUtils.embedMessageInterfaceToMessageEmbed({
        image: {
          url: "www.google.com",
        },
      });

      expect(
        (messageUtils.getMessageByType(messageEmbed, "embed") as IMinifiedEmbedMessage).image,
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

  describe("testing messageEmbedToMessageEmbedInterface", () => {
    let embed: MessageEmbed;
    beforeEach(() => {
      embed = new MessageEmbed();
    });

    it("should return empty object", () => {
      const msg = messageUtils.messageEmbedToMessageEmbedInterface(null);
      expect(msg).toEqual({});
    });

    it("should set color", () => {
      embed.setColor(Colors.DARK_AQUA);
      const msg = messageUtils.messageEmbedToMessageEmbedInterface(embed);
      expect(msg).toEqual<IMessageEmbed>({ color: ColorsHex.DARK_AQUA });
    });

    it("should set author object", () => {
      const author: IMessageEmbedAuthor = {
        name: "cordebot",
        iconURL: "www.google.com?icon",
        url: "www.google.com?url",
      };
      embed.setAuthor(author.name, author.iconURL, author.url);
      const msg = messageUtils.messageEmbedToMessageEmbedInterface(embed);
      expect(msg).toEqual<IMessageEmbed>({
        author,
      });
    });

    it("should set author name string", () => {
      embed.setAuthor("bot");
      const msg = messageUtils.messageEmbedToMessageEmbedInterface(embed);
      expect(msg).toEqual<IMessageEmbed>({
        author: "bot",
      });
    });

    it("should set description", () => {
      embed.setDescription("description");
      const msg = messageUtils.messageEmbedToMessageEmbedInterface(embed);
      expect(msg).toEqual<IMessageEmbed>({
        description: "description",
      });
    });

    const footer: IMessageEmbedFooter = {
      iconURL: "www.google.com",
      text: "test footer",
    };

    it("should set footer object", () => {
      embed.setFooter(footer.text, footer.iconURL);
      const msg = messageUtils.messageEmbedToMessageEmbedInterface(embed);
      expect(msg).toEqual<IMessageEmbed>({
        footer,
      });
    });

    it("should set footer string", () => {
      embed.setFooter(footer.text);
      const msg = messageUtils.messageEmbedToMessageEmbedInterface(embed);
      expect(msg).toEqual<IMessageEmbed>({
        footer: footer.text,
      });
    });

    it("should set image", () => {
      embed.setImage("wwww");
      const msg = messageUtils.messageEmbedToMessageEmbedInterface(embed);
      expect(msg).toEqual<IMessageEmbed>({
        image: "wwww",
      });
    });

    it("should set thumbnail", () => {
      embed.setThumbnail("wwww");
      const msg = messageUtils.messageEmbedToMessageEmbedInterface(embed);
      expect(msg).toEqual<IMessageEmbed>({
        thumbnailUrl: "wwww",
      });
    });

    it("should set timestamp", () => {
      const date = new Date();
      embed.setTimestamp(date);
      const msg = messageUtils.messageEmbedToMessageEmbedInterface(embed);
      expect(msg).toEqual<IMessageEmbed>({
        timestamp: date.getTime(),
      });
    });

    it("should set title", () => {
      embed.setTitle("title");
      const msg = messageUtils.messageEmbedToMessageEmbedInterface(embed);
      expect(msg).toEqual<IMessageEmbed>({
        title: "title",
      });
    });

    it("should set url", () => {
      embed.setURL("www");
      const msg = messageUtils.messageEmbedToMessageEmbedInterface(embed);
      expect(msg).toEqual<IMessageEmbed>({
        url: "www",
      });
    });

    it("should set files", () => {
      embed.files.push(new MessageAttachment("www", "test"));
      const msg = messageUtils.messageEmbedToMessageEmbedInterface(embed);
      expect(msg).toEqual<IMessageEmbed>({
        files: [
          {
            attachment: "www",
            name: "test",
          },
        ],
      });
    });

    it("should set image", () => {
      embed.image = {
        url: "www",
        height: 800,
        width: 600,
        proxyURL: "ww",
      };
      const msg = messageUtils.messageEmbedToMessageEmbedInterface(embed);
      expect(msg).toEqual<IMessageEmbed>({
        image: {
          url: "www",
          height: 800,
          width: 600,
        },
      });
    });
  });

  describe("testing createReportForExpectAndResponse", () => {
    it("should return a passed test for hasPassed true", () => {
      const mock = new MockDiscord();

      const report = messageUtils.createReportForExpectAndResponse(
        createMatcherObject({
          isDebug: false,
          isNot: false,
          matcher: "",
        }) as any,
        mock.message.content,
        mock.message,
      );
      expect(report.pass).toBeTruthy();
    });
  });

  it("should return null due to no embed in message", () => {
    const mockDiscord = new MockDiscord();
    const msg = messageUtils.getMessageByType(mockDiscord.message, "embed");
    expect(msg).toBeFalsy();
  });

  it("should return message content", () => {
    const mockDiscord = new MockDiscord();
    const msg = messageUtils.getMessageByType(mockDiscord.message, "text");
    expect(msg).toEqual(mockDiscord.message.content);
  });

  it("should return own message", () => {
    const mockDiscord = new MockDiscord();
    const msg = messageUtils.getMessageByType(mockDiscord.messageEmbed, "text");
    expect(msg).toEqual(mockDiscord.messageEmbed);
  });
});
