import { MessageEmbed } from "discord.js";
import { MessageData } from "../../../types";
import Utils from "../../../utils/utils";
import { TestReport } from "../../interfaces";
import { ExpectOperation } from "../operation";
import MessageUtils from "./messageUtils";

export class ToEditMessage extends ExpectOperation<MessageData, string | MessageEmbed> {
  public async action(
    messageData: MessageData,
    newValue: string | MessageEmbed,
  ): Promise<TestReport> {
    await this.cordeBot.sendTextMessage(this.command);
    await Utils.wait(Utils.delayValue);
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
