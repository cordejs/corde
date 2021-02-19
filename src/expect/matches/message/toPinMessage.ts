import { MessageData, TestReport } from "../../../types";
import { wait } from "../../../utils";
import { ExpectOperation } from "../operation";

export class ToPinMessage extends ExpectOperation<MessageData> {
  public async action(messageData: MessageData): Promise<TestReport> {
    await this.cordeBot.sendTextMessage(this.command);
    await wait(600);
    const msg = await this.cordeBot.findPinnedMessage(messageData);
    if (!msg) {
      this.hasPassed = false;
      return this.generateReport();
    }

    if (msg.pinned) {
      this.hasPassed = true;
    }

    this.invertHasPassedIfIsNot();
    return this.generateReport();
  }
}
