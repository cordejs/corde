import { MessageData, TestReport } from "../../../types";
import { wait } from "../../../utils";
import { ExpectTest } from "../operation";

export class ToUnpinMessage extends ExpectTest {
  public async action(messageData: MessageData): Promise<TestReport> {
    await this.cordeBot.sendTextMessage(this.command);
    await wait(600);
    const msg = await this.cordeBot.findMessage(messageData);

    if (!msg) {
      return this.createReport();
    }

    if (msg && !msg.pinned) {
      this.hasPassed = true;
    }

    this.invertHasPassedIfIsNot();
    return this.createReport();
  }
}
