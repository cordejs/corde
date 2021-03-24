import { MessageIdentifier, TestReport } from "../../../types";
import { wait } from "../../../utils";
import { ExpectTest } from "../expectTest";

export class ToPinMessage extends ExpectTest {
  public async action(messageIdentifier: MessageIdentifier): Promise<TestReport> {
    await this.cordeBot.sendTextMessage(this.command);
    await wait(600);
    const msg = await this.cordeBot.findPinnedMessage(messageIdentifier);
    if (!msg) {
      this.hasPassed = false;
      return this.createReport();
    }

    if (msg.pinned) {
      this.hasPassed = true;
    }

    this.invertHasPassedIfIsNot();
    return this.createReport();
  }
}
