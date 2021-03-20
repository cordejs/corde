import assert from "assert";
import { Message, MessageEmbed } from "discord.js";
import {
  MessageData,
  MessageEmbedLike,
  messageType,
  MinifiedEmbedMessage,
  Primitive,
} from "../types";
import { pick } from "../utils/pick";
import { isPrimitiveValue } from "../utils/isPrimitiveValue";
import { typeOf } from "../utils";

class MessageUtils {
  public messagesMatches(returnedMessage: Message, expectation: Primitive | MessageEmbed) {
    let msg = "";
    if (isPrimitiveValue(expectation)) {
      const formattedMsg = this.getMessageByType(returnedMessage, "text") as Message;
      msg = formattedMsg.content;
      return msg === expectation;
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
  public getMessageByType(answer: Message, type: messageType) {
    if (type === "embed") {
      const embed = answer.embeds[0];
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

  public createNotFoundMessageForMessageData(msgData: MessageData): string | null {
    if (!msgData) {
      return null;
    }

    if (msgData.id && msgData.text) {
      return `Message with id ${msgData.id} or content '${msgData.text}' not found.`;
    }

    if (msgData.id) {
      return `Message with id ${msgData.id} not found.`;
    }

    if (msgData.text) {
      return `Message with content '${msgData.text}' not found.`;
    }

    return null;
  }

  public embedMessageLikeToMessageEmbed(embedLike: MessageEmbedLike) {
    const embed = new MessageEmbed();
    if (typeOf(embedLike) !== "object") {
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

/**
 * @internal
 */
const messageUtils = new MessageUtils();
export default messageUtils;
