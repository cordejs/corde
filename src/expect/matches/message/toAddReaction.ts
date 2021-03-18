import { Message } from "discord.js";
import { TestReport } from "../../../types";
import { ExpectTest } from "../operation";

export class ToAddReaction extends ExpectTest {
  public async action(reactions: string[]): Promise<TestReport> {
    this.expectation = reactions.join();

    const message = await this.cordeBot.sendTextMessage(this.command);
    await this.cordeBot.waitForAddedReactions(message, reactions);
    this.hasPassed = isOutputEqualToExpect(message, reactions);

    this.invertHasPassedIfIsNot();
    return this.createReport(message.reactions.cache.map((v) => v.emoji.name).join());
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
