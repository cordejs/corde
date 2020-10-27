import { MessageData } from "../../../types";
import { TestReport } from "../../interfaces";
import { ExpectOperation } from "../operation";

export class ToPinMessage extends ExpectOperation<MessageData> {
  public async action(messageData: MessageData): Promise<TestReport> {
    await this.cordeBot.sendTextMessage(this.command);
    return new Promise((resolve) => {
      setTimeout(async () => {
        const msg = await this.cordeBot.findPinnedMessage(messageData);
        if (!msg) {
          // TODO: make use of hasPassed
          this.isEqual = false;
          this.forceIsEqualValue = true;
          resolve(this.generateReport());
        }

        if (msg.pinned) {
          this.isEqual = true;
        }

        resolve(this.generateReport());
        // I had to put this because if I send a message and immediately
        // fetch this message pinned, Discord.js return that the message
        // is not pinned. :(
      }, 800);
    });
  }
}
