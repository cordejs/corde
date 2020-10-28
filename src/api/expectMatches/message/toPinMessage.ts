import { MessageData } from "../../../types";
import { TestReport } from "../../interfaces";
import { ExpectOperation } from "../operation";

let TO_PIN_FETCH_DELAY = 800;

/**
 * There are a delay to fetch function in this tests because if
 * a message is sent and immediately
 * fetch this message pinned, Discord.js return that the message
 * is not pinned. :(
 *
 * This is in a variable and not directly inject in the class due to
 * tests purposes.
 */
export function setToPinFetchDelay(value: number) {
  TO_PIN_FETCH_DELAY = value;
}

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
          return resolve(this.generateReport());
        }

        if (msg.pinned) {
          this.isEqual = true;
        }

        resolve(this.generateReport());
      }, TO_PIN_FETCH_DELAY);
    });
  }
}
