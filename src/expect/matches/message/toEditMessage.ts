import { MessageEmbed } from "discord.js";
import { MessageData, TestReport } from "../../../types";
import { wait } from "../../../utils";
import { ExpectTest } from "../expectTest";
import MessageUtils from "../../messageUtils";
import messageUtils from "../../messageUtils";

export class ToEditMessage extends ExpectTest {
  public async action(
    messageData: MessageData,
    newValue: string | MessageEmbed,
  ): Promise<TestReport> {
    this.expectation = newValue;
    await this.cordeBot.sendTextMessage(this.command);
    await wait(600);
    const msg = await this.cordeBot.findMessage(messageData);
    if (!msg) {
      return this.createReport(MessageUtils.createNotFoundMessageForMessageData(messageData));
    }

    if (messageUtils.messagesMatches(msg, newValue)) {
      this.hasPassed = true;
      this.invertHasPassedIfIsNot();
    }

    return this.createReport();
  }
}
