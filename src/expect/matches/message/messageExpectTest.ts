import assert from "assert";
import { Message, MessageEmbed, PartialMessage } from "discord.js";
import {
  MessageEditedIdentifier,
  MessageEmbedLike,
  MessageIdentifier,
  messageType,
  MinifiedEmbedMessage,
  Primitive,
} from "../../../types";
import { diff, formatObject, isPrimitiveValue, pick, typeOf } from "../../../utils";
import { ExpectTest } from "../expectTest";

export abstract class MessageExpectTest extends ExpectTest {
  validateExpect(expect: Primitive | MessageEmbedLike) {
    if (!isPrimitiveValue(expect) && typeOf(expect) !== "object") {
      return this.createReport(
        "expected: expect value to be a primitive value (string, boolean, number) or an MessageEmbedLike\n",
        `received: ${typeOf(expect)}`,
      );
    }
    return null;
  }

  createReportForExpectAndResponse(
    expect: Primitive | MessageEmbed,
    returnedMessage: Message | PartialMessage,
  ) {
    this.hasPassed = this.messagesMatches(returnedMessage, expect);
    this.invertHasPassedIfIsNot();

    if (this.hasPassed) {
      return this.createPassTest();
    }

    if (this.isNot) {
      return this.createReport(
        "expected: message from bot be different from expectation\n",
        "received: both returned and expectation are equal",
      );
    }

    let embedExpect: MinifiedEmbedMessage | undefined;
    if (typeOf(expect) === "object") {
      embedExpect = this.getMessageByType(expect as MessageEmbed, "embed") as MinifiedEmbedMessage;
    }

    let embedReturned: MinifiedEmbedMessage | undefined;
    if (returnedMessage.embeds[0]) {
      embedReturned = this.getMessageByType(returnedMessage, "embed") as MinifiedEmbedMessage;
    }

    if (embedExpect && embedReturned) {
      return this.createReport(diff(embedReturned, embedExpect));
    }

    if (embedExpect && !embedReturned) {
      return this.createReport(
        `expected: ${formatObject(embedExpect)}\n`,
        `received: '${returnedMessage.content}'`,
      );
    }

    if (!embedExpect && embedReturned) {
      return this.createReport(
        `expected: '${expect}'\n`,
        `received: ${formatObject(embedReturned)}`,
      );
    }

    return this.createReport(`expected: '${expect}'\n`, `received: '${returnedMessage.content}'`);
  }

  messagesMatches(
    returnedMessage: Message | PartialMessage,
    expectation: Primitive | MessageEmbed,
  ) {
    let msg = "";
    if (isPrimitiveValue(expectation)) {
      const formattedMsg = this.getMessageByType(returnedMessage, "text") as Message;
      msg = formattedMsg.content;
      return msg == expectation;
    }

    const jsonMessage = this.getMessageByType(returnedMessage, "embed") as MinifiedEmbedMessage;
    msg = JSON.stringify(jsonMessage);
    let result = true;
    try {
      assert.deepStrictEqual(expectation.toJSON(), jsonMessage);
    } catch (error) {
      result = false;
    }
    return result;
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
  getMessageByType(answer: Message | MessageEmbed | PartialMessage, type: messageType) {
    if (type === "embed") {
      const embed = answer instanceof Message ? answer.embeds[0] : answer;
      if (!embed) {
        return null;
      }

      const tempObject = embed.toJSON() as MinifiedEmbedMessage;
      if (tempObject.image) {
        tempObject.image = pick(tempObject.image, "url");
      }
      if (tempObject.thumbnail) {
        tempObject.thumbnail = pick(tempObject.thumbnail, "url");
      }
      return tempObject;
    } else {
      return answer;
    }
  }

  humanizeMessageIdentifierObject(msgIdentifier: MessageIdentifier | MessageEditedIdentifier) {
    if (!msgIdentifier) {
      return "";
    }
    if (msgIdentifier?.id) {
      return `message of id ${msgIdentifier.id}`;
    }
    if ((msgIdentifier as MessageIdentifier).content) {
      return `message of content "${(msgIdentifier as MessageIdentifier).content}"`;
    }
    if ((msgIdentifier as MessageEditedIdentifier).oldContent) {
      return `message of content "${(msgIdentifier as MessageEditedIdentifier).oldContent}"`;
    }
    return "";
  }

  embedMessageLikeToMessageEmbed(embedLike: MessageEmbedLike) {
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
      embed.addFields(...embedLike.fields);
    }

    if (embedLike.files) {
      embed.attachFiles(embedLike.files);
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
