import { MessageReaction } from "discord.js";
import { MessageData, TestReport } from "../../../types";
import { ExpectOperation } from "../operation";

export class ToRemoveReaction extends ExpectOperation<string[], MessageData> {
  public async action(removedReactions: string[], messageData?: MessageData): Promise<TestReport> {
    this.expectation = removedReactions.join();

    try {
      await this.cordeBot.sendTextMessage(this.command);
      const message = await this.cordeBot.findMessage(messageData);
      if (message) {
        const reactions = await this.cordeBot.waitForRemovedReactions(
          message,
          removedReactions.length,
        );
        this.hasPassed = reactionsExistsIn(reactions, removedReactions);
        this.output = reactions.map((v) => v.emoji.name).join();
      }

      this.invertHasPassedIfIsNot();
    } catch (error) {
      this.hasPassed = false;
      if (error instanceof Error) {
        this.output = error.message;
      } else {
        this.output = error;
      }
    }
    return this.generateReport();
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
