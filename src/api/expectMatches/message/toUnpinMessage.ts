import { MessageData } from "../../../types";
import Utils from "../../../utils/utils";
import { TestReport } from "../../interfaces";
import { ExpectOperation } from "../operation";

export class ToUnpinMessage extends ExpectOperation<MessageData> {
  public async action(messageData: MessageData): Promise<TestReport> {
    await this.cordeBot.sendTextMessage(this.command);
    await Utils.wait(Utils.delayValue);
    const msg = await this.cordeBot.findPinnedMessage(messageData);
    if (!msg || (msg && !msg.pinned)) {
      this.isEqual = true;
    }

    return this.generateReport();
  }
}
