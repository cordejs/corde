import { MessageReaction } from "discord.js";
import { MessageData, TestReport } from "../../../types";
import { ExpectTest } from "../expectTest";

export class ToRemoveReaction extends ExpectTest {
  public async action(removedReactions: string[], messageData?: MessageData): Promise<TestReport> {
    this.expectation = removedReactions.join();

    await this.cordeBot.sendTextMessage(this.command);
    const message = await this.cordeBot.findMessage(messageData);
    if (message) {
      const reactions = await this.cordeBot.waitForRemovedReactions(
        message,
        removedReactions.length,
      );
      this.hasPassed = reactionsExistsIn(reactions, removedReactions);
      return this.createReport(reactions.map((v) => v.emoji.name).join());
    }

    this.invertHasPassedIfIsNot();
    return this.createReport("");
  }
}

function reactionsExistsIn(reactions: MessageReaction[], expectation: string[]) {
  for (const expect of expectation) {
    if (!reactions.find((r) => r.emoji.name === expect)) {
      return false;
    }
  }
  return true;
}
