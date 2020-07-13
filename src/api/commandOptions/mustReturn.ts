import assert from "assert";
import { Message, MessageEmbed } from "discord.js";
import { CordeBot, messageType, MinifiedEmbedMessage } from "../../interfaces";
import { TestReport } from "../interfaces";
import { BaseCommand } from "./baseCommand";

export class MustReturn extends BaseCommand<string | MessageEmbed> {
  public async run(cordeBot: CordeBot, expect: string | MessageEmbed): Promise<TestReport> {
    let msg = "";
    let isEqual = false;
    let showExpectAndOutputValue = true;
    await cordeBot.sendTextMessage(super.commandName);
    const returnedMessage = await cordeBot.awaitMessagesFromTestingBot();
    if (typeof expect === "string") {
      const formatedMsg = this.getMessageByType(returnedMessage, "text") as Message;
      msg = formatedMsg.content;
      isEqual = msg === expect;
    } else {
      const jsonMessage = this.getMessageByType(returnedMessage, "embed") as MinifiedEmbedMessage;
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

    return {
      commandName: super.commandName,
      expectation: expect,
      output: msg,
      testSucessfully: isEqual,
      isNot: super.isNot,
      showExpectAndOutputValue,
    } as TestReport;
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
  private getMessageByType(answer: Message, type: messageType) {
    if (type === "embed") {
      const tempObject = answer.embeds[0].toJSON() as MinifiedEmbedMessage;
      if (tempObject.image) {
        tempObject.image = this.pick(tempObject.image, "url");
      }
      if (tempObject.thumbnail) {
        tempObject.thumbnail = this.pick(tempObject.thumbnail, "url");
      }
      return tempObject;
    } else {
      return answer;
    }
  }

  private pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
    const copy = {} as Pick<T, K>;
    keys.forEach((key) => (copy[key] = obj[key]));
    return copy;
  }
}
