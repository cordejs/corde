import { EmbedFieldData, Message, MessageEmbed } from "discord.js";
import { diff } from "jest-diff";
import { MessageType, Primitive } from "../../../types";
import { deepEqual } from "../../../utils/deepEqual";
import { formatObject } from "../../../utils/formatObject";
import { isPrimitiveValue } from "../../../utils/isPrimitiveValue";
import { typeOf } from "../../../utils/typeOf";
import { CommandState } from "../CommandState";

export namespace messageUtils {
  export function validateExpect(matcher: CommandState, expect: Primitive | corde.IMessageEmbed) {
    if (!isPrimitiveValue(expect) && typeOf(expect) !== "object") {
      return matcher.createReport(
        "expected: expect value to be a primitive value (string, boolean, number) or an IMessageEmbed\n",
        `received: ${typeOf(expect)}`,
      );
    }
    return null;
  }

  export function createReportForExpectAndResponse(
    matcher: CommandState,
    expect: Primitive | corde.IMessageEmbed,
    returnedMessage: Message,
  ) {
    matcher.hasPassed = isMessagesEquals(returnedMessage, expect);
    matcher.invertHasPassedIfIsNot();

    if (matcher.hasPassed) {
      return matcher.createPassTest();
    }

    let embedReturned: corde.IMessageEmbed | undefined;
    if (returnedMessage?.embeds[0]) {
      embedReturned = getMessageByType(returnedMessage, "embed") as corde.IMessageEmbed;
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
    expectation: Primitive | corde.IMessageEmbed,
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
    msgIdentifier?: corde.IMessageIdentifier | corde.IMessageEditedIdentifier,
  ) {
    if (!msgIdentifier) {
      return "";
    }
    if (msgIdentifier?.id) {
      return `message of id ${msgIdentifier.id}`;
    }
    if ((msgIdentifier as corde.IMessageIdentifier).content) {
      return `message of content "${(msgIdentifier as corde.IMessageIdentifier).content}"`;
    }
    if ((msgIdentifier as corde.IMessageEditedIdentifier).oldContent) {
      return `message of content "${(msgIdentifier as corde.IMessageEditedIdentifier).oldContent}"`;
    }
    return "";
  }

  export function messageEmbedToMessageEmbedInterface(message?: MessageEmbed) {
    if (!message) {
      return {};
    }

    const embedLike: corde.IMessageEmbed = {};

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

    if (message.footer) {
      embedLike.footer = message.footer;
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
      embedLike.thumbnailUrl = message.thumbnail;
    }
    return embedLike;
  }

  export function embedMessageInterfaceToMessageEmbed(embedLike?: corde.IMessageEmbed) {
    const embed = new MessageEmbed();
    if (!embedLike || typeOf(embedLike) !== "object") {
      return embed;
    }

    if (embedLike.author) {
      if (typeof embedLike.author === "string") {
        embed.setAuthor({
          name: embedLike.author,
        });
      } else {
        embed.setAuthor({
          name: embedLike.author.name,
          iconURL: embedLike.author.iconURL,
          url: embedLike.author.url,
        });
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

    if (embedLike.footer) {
      embed.setFooter(embedLike.footer);
    }

    if (embedLike.image) {
      if (typeof embedLike.image === "string") {
        embed.setImage(embedLike.image);
      } else {
        embed.setImage(embedLike.image.url);
      }
    }

    if (embedLike.thumbnailUrl) {
      embed.thumbnail = embedLike.thumbnailUrl;
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
