import { MessageEmbed } from "discord.js";
import { MessageData, TestReport } from "../../../types";
import { wait } from "../../../utils";
import { ExpectOperation } from "../operation";
import MessageUtils from "./messageUtils";

export class ToEditMessage extends ExpectOperation<MessageData, string | MessageEmbed> {
  public async action(
    messageData: MessageData,
    newValue: string | MessageEmbed,
  ): Promise<TestReport> {
    await this.cordeBot.sendTextMessage(this.command);
    await wait(600);
    const msg = await this.cordeBot.findMessage(messageData);
    if (!msg) {
      this.isEqual = false;
      this.forceIsEqualValue = true;
      return this.generateReport();
    }

    if (MessageUtils.messagesMatches(msg, newValue)) {
      this.isEqual = true;
    }

    return this.generateReport();
  }
}
