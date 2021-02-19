import { Message } from "discord.js";
import { TestReport } from "../../../types";
import { ExpectOperation } from "../operation";

export class ToAddReaction extends ExpectOperation<string[]> {
  public async action(reactions: string[]): Promise<TestReport> {
    this.expectation = reactions.join();

    try {
      const message = await this.cordeBot.sendTextMessage(this.command);
      await this.cordeBot.waitForAddedReactions(message, reactions);
      this.hasPassed = isOutputEqualToExpect(message, reactions);
      this.output = message.reactions.cache.map((v) => v.emoji.name).join();

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

function isOutputEqualToExpect(message: Message, expectation: string | string[]) {
  if (typeof expectation === "string" && message.reactions.cache.has(expectation)) {
    return true;
  } else {
    for (const i in expectation as string[]) {
      if (message.reactions.cache.has(expectation[i])) {
        return true;
      } else {
        return false;
      }
    }
  }
  return false;
}
