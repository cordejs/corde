import { MessageData, TestReport } from "../../../types";
import { wait } from "../../../utils";
import { ExpectOperation } from "../operation";

export class ToUnpinMessage extends ExpectOperation<MessageData> {
  public async action(messageData: MessageData): Promise<TestReport> {
    await this.cordeBot.sendTextMessage(this.command);
    await wait(600);
    const msg = await this.cordeBot.findMessage(messageData);

    if (!msg) {
      // TODO: make use of hasPassed
      this.forceIsEqualValue = true;
      return this.generateReport();
    }

    if (msg && !msg.pinned) {
      this.isEqual = true;
    }

    return this.generateReport();
  }
}
