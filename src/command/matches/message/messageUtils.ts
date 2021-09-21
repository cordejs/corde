import { EmbedFieldData, Message, MessageAttachment, MessageEmbed } from "discord.js";
import {
  IMessageEditedIdentifier,
  IMessageEmbed,
  IMessageIdentifier,
  MessageType,
  Primitive,
} from "../../../types";
import { deepEqual, diff, formatObject, isPrimitiveValue, typeOf } from "../../../utils";
import { ICommandMatcherProps } from "../../types";

export namespace messageUtils {
  export function validateExpect(matcher: ICommandMatcherProps, expect: Primitive | IMessageEmbed) {
    if (!isPrimitiveValue(expect) && typeOf(expect) !== "object") {
      return matcher.createReport(
        "expected: expect value to be a primitive value (string, boolean, number) or an IMessageEmbed\n",
        `received: ${typeOf(expect)}`,
      );
    }
    return null;
  }

  export function createReportForExpectAndResponse(
    matcher: ICommandMatcherProps,
    expect: Primitive | IMessageEmbed,
    returnedMessage: Message,
  ) {
    matcher.hasPassed = isMessagesEquals(returnedMessage, expect);
    matcher.invertHasPassedIfIsNot();

    if (matcher.hasPassed) {
      return matcher.createPassTest();
    }

    let embedReturned: IMessageEmbed | undefined;
    if (returnedMessage?.embeds[0]) {
      embedReturned = getMessageByType(returnedMessage, "embed") as IMessageEmbed;
    }

    if (typeOf(expect) === "object" && embedReturned) {
      return matcher.createReport(diff(embedReturned, expect));
    }

    if (typeOf(expect) === "object" && !embedReturned) {
      return matcher.createReport(
        `expected: ${formatObject(expect)}\n`,
        `received: '${returnedMessage?.content}'`,
      );
    }

    if (typeOf(expect) === "string" && embedReturned) {
      return matcher.createReport(
        `expected: '${expect}'\n`,
        `received: ${formatObject(embedReturned)}`,
      );
    }

    return matcher.createReport(
      `expected: '${expect}'\n`,
      `received: '${returnedMessage?.content}'`,
    );
  }

  export function isMessagesEquals(
    returnedMessage: Message,
    expectation: Primitive | IMessageEmbed,
  ) {
    if (!returnedMessage || !expectation) {
      return false;
    }

    const embed = returnedMessage.embeds[0];
    if (isPrimitiveValue(expectation) && !embed) {
      return expectation == returnedMessage.content;
    }

    if (embed && typeOf(expectation) === "object") {
      const embedInternal = messageEmbedToMessageEmbedInterface(embed);
      return deepEqual(expectation, embedInternal);
    }

    return false;
  }

  /**
   * Format Discord responses
   *
   * @param answer Discord response for a message sent
   *
   * @param type Type expected of that message
   *
   * @description Discord adds some attributes that are not present in embed message before it is sent
   *
   *  This is data **before** send to Discord
   *
   *  ```javascript
   *   "image": {
   *       "url": "https://i.imgur.com/wSTFkRM.png"
   *   },
   *   "thumbnail": {
   *       "url": "https://i.imgur.com/wSTFkRM.png"
   *   }
   *  ```
   *
   *  And this is part of embed message **after** get from Discord
   *
   *  ```javascript
   *   "image": {
   *     "height": 0,
   *     "proxyURL": "https://images-ext-2.discordapp.net/external/DoAGN014Q46B7iDBr2VJyHUL59QLSWdEAZ5wOoWe8CY/https/i.imgur.com/wSTFkRM.png",
   *     "url": "https://i.imgur.com/wSTFkRM.png",
   *     "width": 0
   *   },
   *   "thumbnail": {
   *       "height": 0,
   *       "proxyURL": "https://images-ext-2.discordapp.net/external/DoAGN014Q46B7iDBr2VJyHUL59QLSWdEAZ5wOoWe8CY/https/i.imgur.com/wSTFkRM.png",
   *       "url": "https://i.imgur.com/wSTFkRM.png",
   *      "width": 0
   *  }
   *  ```
   */
  export function getMessageByType(answer: Message | MessageEmbed, type: MessageType) {
    if (type === "embed") {
      const embed = answer instanceof Message ? answer.embeds[0] : answer;
      if (!embed) {
        return null;
      }

      return messageEmbedToMessageEmbedInterface(embed as MessageEmbed);
    }

    if (answer instanceof Message) {
      return answer.content;
    }
    return answer;
  }

  export function humanizeMessageIdentifierObject(
    msgIdentifier: IMessageIdentifier | IMessageEditedIdentifier,
  ) {
    if (!msgIdentifier) {
      return "";
    }
    if (msgIdentifier?.id) {
      return `message of id ${msgIdentifier.id}`;
    }
    if ((msgIdentifier as IMessageIdentifier).content) {
      return `message of content "${(msgIdentifier as IMessageIdentifier).content}"`;
    }
    if ((msgIdentifier as IMessageEditedIdentifier).oldContent) {
      return `message of content "${(msgIdentifier as IMessageEditedIdentifier).oldContent}"`;
    }
    return "";
  }

  export function messageEmbedToMessageEmbedInterface(message: MessageEmbed) {
    if (!message) {
      return {};
    }

    const embedLike: IMessageEmbed = {};

    if (message.url) {
      embedLike.url = message.url;
    }

    if (message.timestamp) {
      embedLike.timestamp = message.timestamp;
    }

    if (message.author) {
      if (message.author.iconURL || message.author.url) {
        embedLike.author = {
          iconURL: message.author.iconURL,
          name: message.author.name,
          url: message.author.url,
        };
      } else if (message.author.name) {
        embedLike.author = message.author.name;
      }
    }

    if (message.color) {
      embedLike.color = message.color;
    }

    if (message.description) {
      embedLike.description = message.description;
    }

    if (message.fields && message.fields.length) {
      embedLike.fields = [];
      message.fields.forEach((field) => {
        embedLike.fields?.push({
          name: field.name,
          value: field.value,
          inline: !!field.inline,
        });
      });
    }

    if (message.files && message.files.length) {
      embedLike.files = [];
      message.files.forEach((file) => {
        if (file instanceof MessageAttachment) {
          embedLike.files?.push({
            attachment: file.attachment,
            name: file.name,
          });
        } else {
          embedLike.files?.push(file);
        }
      });
    }

    if (message.footer) {
      if (message.footer.iconURL) {
        embedLike.footer = {
          iconURL: message.footer.iconURL,
          text: message.footer.text,
        };
      } else if (message.footer.text) {
        embedLike.footer = message.footer.text;
      }
    }

    if (message.image) {
      if (message.image.height || message.image.width) {
        embedLike.image = {
          url: message.image.url,
          height: message.image.height,
          width: message.image.width,
        };
      } else if (message.image.url) {
        embedLike.image = message.image.url;
      }
    }

    if (message.title) {
      embedLike.title = message.title;
    }

    if (message.thumbnail) {
      embedLike.thumbnailUrl = message.thumbnail.url;
    }
    return embedLike;
  }

  export function embedMessageInterfaceToMessageEmbed(embedLike: IMessageEmbed) {
    const embed = new MessageEmbed();
    if (!embedLike || typeOf(embedLike) !== "object") {
      return embed;
    }

    if (embedLike.author) {
      if (typeof embedLike.author === "string") {
        embed.setAuthor(embedLike.author);
      } else {
        embed.setAuthor(embedLike.author.name, embedLike.author.iconURL, embedLike.author.url);
      }
    }

    if (embedLike.color) {
      embed.setColor(embedLike.color);
    }

    if (embedLike.description) {
      embed.setDescription(embedLike.description);
    }

    if (embedLike.fields) {
      embed.addFields(
        ...embedLike.fields.map<EmbedFieldData>((field) => {
          return {
            name: field.name,
            value: field.value,
            inline: !!field.inline,
          };
        }),
      );
    }

    if (embedLike.files) {
      embed.attachFiles(
        embedLike.files.map((file) => {
          if (typeof file === "string") {
            return file;
          }

          const attachment = new MessageAttachment(file.attachment);

          if (file.name) {
            attachment.setName(file.name);
          }

          return attachment;
        }),
      );
    }

    if (embedLike.footer) {
      if (typeof embedLike.footer === "string") {
        embed.setFooter(embedLike.footer);
      } else {
        embed.setFooter(embedLike.footer.text, embedLike.footer.iconURL);
      }
    }

    if (embedLike.image) {
      if (typeof embedLike.image === "string") {
        embed.setImage(embedLike.image);
      } else {
        embed.setImage(embedLike.image.url);
      }
    }

    if (embedLike.thumbnailUrl) {
      embed.setThumbnail(embedLike.thumbnailUrl);
    }

    if (embedLike.timestamp) {
      embed.setTimestamp(embedLike.timestamp);
    }

    if (embedLike.title) {
      embed.setTitle(embedLike.title);
    }

    if (embedLike.url) {
      embed.setURL(embedLike.url);
    }

    return embed;
  }
}
