import {
  EmbedFieldData,
  EmbedFooterData,
  MessageEmbed,
  MessageEmbedAuthor,
  MessageEmbedImage,
  MessageEmbedThumbnail,
} from "discord.js";

import MockDiscord from "../../mocks/mockDiscord";
import { messageUtils } from "../../../src/command/matches/message/messageUtils";
import { Colors, ColorsHex } from "../../../src";

describe("testing messageUtils", () => {
  describe("testing createNotFoundMessageForMessageData", () => {
    it("should convert messageEmbedSimple simples data to messageEmbed", () => {
      const timeNow = Date.now();
      const messageLike: corde.IMessageEmbed = {
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
      const embed = messageUtils.embedMessageInterfaceToMessageEmbed(undefined);
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
      const messageLike: corde.IMessageEmbed = {
        author: "foo",
      };
      const embed = messageUtils.embedMessageInterfaceToMessageEmbed(messageLike);
      expect(embed.author).toMatchObject<corde.IMessageEmbedAuthor>({
        name: "foo",
      });
    });

    it("should convert messageEmbedSimple author object", () => {
      const messageLike: corde.IMessageEmbed = {
        author: {
          name: "foo",
        },
      };
      const embed = messageUtils.embedMessageInterfaceToMessageEmbed(messageLike);
      expect(embed.author).toMatchObject<corde.IMessageEmbedAuthor>({
        name: "foo",
      });
    });

    it("should convert messageEmbedSimple files string", () => {
      const fields: EmbedFieldData[] = [
        {
          name: "field 1",
          value: "field 1 value",
        },
      ];
      const messageLike: corde.IMessageEmbed = {
        fields,
      };
      const embed = messageUtils.embedMessageInterfaceToMessageEmbed(messageLike);
      expect(embed.fields).toMatchObject<EmbedFieldData[]>(fields);
    });

    it("should convert messageEmbedSimple footer object", () => {
      const footer: corde.IMessageEmbedFooter = {
        iconURL: "www.google",
        text: "footer text",
      };
      const messageLike: corde.IMessageEmbed = {
        footer,
      };
      const embed = messageUtils.embedMessageInterfaceToMessageEmbed(messageLike);
      expect(embed.footer).toMatchObject(footer);
    });

    it("should convert messageEmbedSimple footer string", () => {
      const footer: EmbedFooterData = {
        text: "footer text",
      };
      const messageLike: corde.IMessageEmbed = {
        footer: {
          text: "footer text",
        },
      };
      const embed = messageUtils.embedMessageInterfaceToMessageEmbed(messageLike);
      expect(embed.footer).toMatchObject(footer);
    });

    it("should convert messageEmbedSimple thumbnail string", () => {
      const thumbnail: MessageEmbedThumbnail = {
        url: "wwww.google",
      };
      const messageLike: corde.IMessageEmbed = {
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
        (messageUtils.getMessageByType(messageEmbed, "embed") as corde.IMinifiedEmbedMessage).image,
      ).toBeTruthy();
    });
  });

  describe("testing humanizeMessageIdentifierObject", () => {
    it("should return '' for no identifier", () => {
      expect(messageUtils.humanizeMessageIdentifierObject(undefined)).toEqual("");
    });

    it("should return message referring to the content", () => {
      expect(messageUtils.humanizeMessageIdentifierObject({ content: "test" })).toEqual(
        'message of content "test"',
      );
    });

    it("should return message referring to the oldContent", () => {
      expect(messageUtils.humanizeMessageIdentifierObject({ oldContent: "test" })).toEqual(
        'message of content "test"',
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
      const msg = messageUtils.messageEmbedToMessageEmbedInterface(undefined);
      expect(msg).toEqual({});
    });

    it("should set color", () => {
      embed.setColor(Colors.DARK_AQUA);
      const msg = messageUtils.messageEmbedToMessageEmbedInterface(embed);
      expect(msg).toEqual<corde.IMessageEmbed>({ color: ColorsHex.DARK_AQUA });
    });

    it("should set author object", () => {
      const author: MessageEmbedAuthor = {
        name: "cordebot",
        iconURL: "www.google.com?icon",
        url: "www.google.com?url",
      };
      embed.author = {
        name: author.name,
        iconURL: author.iconURL,
        url: author.url,
      };
      const msg = messageUtils.messageEmbedToMessageEmbedInterface(embed);
      expect(msg).toEqual<corde.IMessageEmbed>({
        author,
      });
    });

    it("should set author name string", () => {
      embed.author = {
        name: "bot",
      };
      const msg = messageUtils.messageEmbedToMessageEmbedInterface(embed);
      expect(msg).toEqual<corde.IMessageEmbed>({
        author: "bot",
      });
    });

    it("should set description", () => {
      embed.setDescription("description");
      const msg = messageUtils.messageEmbedToMessageEmbedInterface(embed);
      expect(msg).toEqual<corde.IMessageEmbed>({
        description: "description",
      });
    });

    const footer: corde.IMessageEmbedFooter = {
      iconURL: "www.google.com",
      text: "test footer",
    };

    it("should set footer object", () => {
      embed.footer = {
        text: footer.text,
        iconURL: footer.iconURL,
      };
      const msg = messageUtils.messageEmbedToMessageEmbedInterface(embed);
      expect(msg).toEqual<corde.IMessageEmbed>({
        footer,
      });
    });

    it("should set footer string", () => {
      embed.footer = {
        text: "test footer",
      };
      const msg = messageUtils.messageEmbedToMessageEmbedInterface(embed);
      expect(msg).toEqual<corde.IMessageEmbed>({
        footer: {
          text: "test footer",
        },
      });
    });

    it("should set image", () => {
      embed.setImage("wwww");
      const msg = messageUtils.messageEmbedToMessageEmbedInterface(embed);
      expect(msg).toEqual<corde.IMessageEmbed>({
        image: "wwww",
      });
    });

    it("should set thumbnail", () => {
      embed.setThumbnail("wwww");
      const msg = messageUtils.messageEmbedToMessageEmbedInterface(embed);
      expect(msg).toEqual<corde.IMessageEmbed>({
        thumbnailUrl: "wwww",
      });
    });

    it("should set timestamp", () => {
      const date = new Date();
      embed.setTimestamp(date);
      const msg = messageUtils.messageEmbedToMessageEmbedInterface(embed);
      expect(msg).toEqual<corde.IMessageEmbed>({
        timestamp: date.getTime(),
      });
    });

    it("should set title", () => {
      embed.setTitle("title");
      const msg = messageUtils.messageEmbedToMessageEmbedInterface(embed);
      expect(msg).toEqual<corde.IMessageEmbed>({
        title: "title",
      });
    });

    it("should set url", () => {
      embed.setURL("www");
      const msg = messageUtils.messageEmbedToMessageEmbedInterface(embed);
      expect(msg).toEqual<corde.IMessageEmbed>({
        url: "www",
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
      expect(msg).toEqual<corde.IMessageEmbed>({
        image: {
          url: "www",
          height: 800,
          width: 600,
        },
      });
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
