import assert from "assert";
import { Message, MessageEmbed } from "discord.js";
import { messageType, MinifiedEmbedMessage } from "../../../types";
import { TestReport } from "../../interfaces";
import { CordeBot } from "../../../core";

export async function toReturn(
  commandName: string,
  isNot: boolean,
  cordeBot: CordeBot,
  expect: string | MessageEmbed,
): Promise<TestReport> {
  let msg = "";
  let isEqual = false;
  let showExpectAndOutputValue = true;
  await cordeBot.sendTextMessage(commandName);
  const returnedMessage = await cordeBot.awaitMessagesFromTestingBot();
  if (typeof expect === "string") {
    const formatedMsg = getMessageByType(returnedMessage, "text") as Message;
    msg = formatedMsg.content;
    isEqual = msg === expect;
  } else {
    const jsonMessage = getMessageByType(returnedMessage, "embed") as MinifiedEmbedMessage;
    msg = JSON.stringify(jsonMessage);
    showExpectAndOutputValue = false;
    try {
      // tslint:disable-next-line: deprecation
      assert.deepEqual(expect.toJSON(), jsonMessage);
      isEqual = true;
    } catch (error) {
      isEqual = false;
    }
  }

  return new TestReport({
    commandName,
    expectation: expect,
    testSucessfully: isEqual,
    output: msg,
    isNot,
    showExpectAndOutputValue,
  });
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
function getMessageByType(answer: Message, type: messageType) {
  if (type === "embed") {
    const tempObject = answer.embeds[0].toJSON() as MinifiedEmbedMessage;
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

function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  const copy = {} as Pick<T, K>;
  keys.forEach((key) => (copy[key] = obj[key]));
  return copy;
}
