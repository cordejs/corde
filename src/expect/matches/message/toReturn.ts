import { Message, MessageEmbed } from "discord.js";
import { MinifiedEmbedMessage, TestReport } from "../../../types";

/**
 * For some reason, importing "isPrimitiveValue" from
 * "../../../utils" results in error in jest tests.
 */
import { isPrimitiveValue } from "../../../utils/isPrimitiveValue";
import { ExpectOperation } from "../operation";
import MessageUtils from "./messageUtils";

export class ToReturn extends ExpectOperation<string | number | boolean | MessageEmbed> {
  public async action(expect: string | number | boolean | MessageEmbed): Promise<TestReport> {
    try {
      this.expectation = expect;
      await this.cordeBot.sendTextMessage(this.command);
      const returnedMessage = await this.cordeBot.awaitMessagesFromTestingBot();

      this.hasPassed = MessageUtils.messagesMatches(returnedMessage, expect);
      this.output = this.getMessageValue(returnedMessage, expect);
      this.invertHasPassedIfIsNot();
    } catch (error) {
      this.hasPassed = false;
      if (error instanceof Error) {
        this.output = error.message;
      } else {
        this.output = error;
      }
    }

    return this.generateReport();
  }

  private getMessageValue(
    returnedMessage: Message,
    expect: string | number | boolean | MessageEmbed,
  ) {
    if (isPrimitiveValue(expect)) {
      const formattedMsg = MessageUtils.getMessageByType(returnedMessage, "text") as Message;
      return formattedMsg.content;
    } else {
      const jsonMessage = MessageUtils.getMessageByType(
        returnedMessage,
        "embed",
      ) as MinifiedEmbedMessage;
      return JSON.stringify(jsonMessage);
    }
  }
}
