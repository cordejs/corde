import assert from "assert";
import { Message, MessageEmbed } from "discord.js";
import { messageType, MinifiedEmbedMessage } from "../../../types";
import { isPrimitiveValue, pick } from "../../../utils";

class MessageUtilsManager {
  public messagesMatches(
    returnedMessage: Message,
    expectation: string | number | boolean | MessageEmbed,
  ) {
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
}

const MessageUtils = new MessageUtilsManager();
export default MessageUtils;
